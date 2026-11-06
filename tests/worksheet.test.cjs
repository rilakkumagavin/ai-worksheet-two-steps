const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const code = fs.readFileSync('script.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const plan = fs.readFileSync('範例/家鄉在哪裡-逐格答案與來源.json', 'utf8');

function setup(saved = {}) {
  let clipboard = "";
  const listeners = new Map();
  const ids = new Map();
  function element(id) {
    return {
      id, value: '', textContent: '', hidden: false, checked: false,
      classList: { add() {}, remove() {} },
      setAttribute() {}, focus() {},
      addEventListener(event, handler) { listeners.set(id + ':' + event, handler); }
    };
  }
  for (const [, id] of html.matchAll(/\bid="([^"]+)"/g)) ids.set(id, element(id));
  ids.get('example-subject').value = 'social';
  ids.get('example-page').value = '1';
  const checks = [...html.matchAll(/data-check="([^"]+)"/g)].map(([, check]) =>
    Object.assign(element(check), { dataset: { check } }));
  const ctx = vm.createContext({
    document: { getElementById: id => ids.get(id), querySelectorAll: selector => selector === '[data-check]' ? checks : [] },
    localStorage: { getItem: () => JSON.stringify(saved), setItem() {} },
    window: { confirm: () => true },
    navigator: { clipboard: { writeText: async text => { clipboard = text; } } },
    setTimeout() {}, clearTimeout() {}
  });
  vm.runInContext(code, ctx);
  return { ctx, ids, checks, clipboard: () => clipboard, run: source => vm.runInContext(source, ctx), click: id => listeners.get(id + ':click')() };
}

test('Chinese sample uses ten actual question rows, clears previous QA and retains source caveat', () => {
  const app = setup({qaVersion:3, phonetic:"grade", checks:{blanks:true}, plan});
  assert.equal(app.ids.get('qa-count').textContent, '已確認 1／8 項');
  app.click('load-chinese-example');
  assert.equal(app.ids.get('blankAmount').value, '10');
  assert.equal(app.ids.get('blankMode').value, 'exact');
  assert.equal(app.ids.get('difficulty').value, '進階');
  assert.equal(app.ids.get('phonetic').value, 'off');
  assert.equal(app.ids.get('qa-count').textContent, '已確認 0／8 項');
  assert.equal(app.ids.get('plan').value, '');
  assert.match(app.ids.get('image-prompt').value, /網站指定整份10格/);
  assert.doesNotMatch(app.ids.get('image-prompt').value, /網站指定整份16格/);
  assert.match(app.ids.get('image-prompt').value, /原PDF頁碼待查/);
  app.run("state.blankAmount = '16'; render()");
  assert.equal(app.ids.get('copy-image').disabled, true);
  assert.match(app.ids.get('material-status').textContent, /格數衝突/);
});

test('hometown structured 16 blanks generate consistent prompts and keep QA unchecked', () => {
  const app = setup({subject:'社會', lesson:'家鄉在哪裡', pages:'印刷10–17／PDF3–10', material:'課本分析，整份共16格', blankMode:'exact', blankAmount:'16', plan});
  assert.equal(app.ids.get('copy-image').disabled, false);
  assert.match(app.ids.get('image-prompt').value, /網站指定整份16格/);
  assert.match(app.ids.get('chatgpt-pdf-prompt').value, /結構化 JSON/);
  assert.match(app.ids.get('teacher-prompt').value, /Python（PIL）/);
  assert.equal(app.ids.get('qa-count').textContent, '已確認 0／8 項');
  app.run("const testPlan = JSON.parse(state.plan); const q = testPlan.sections[0].questions; q[1] = {...q[0], sourceEvidence:'', answerLeakRisk:'已外露'}; state.plan = JSON.stringify(testPlan); render()");
  assert.match(app.ids.get('material-status').textContent, /重複.*缺來源.*外露/);
  assert.equal(app.ids.get('copy-image').disabled, true);
});

test('legacy middle-grade defaults do not use bopomofo or carry old QA statuses', () => {
  const app = setup({grade:'middle', phonetic:'grade', checks:{blanks:true}});
  assert.equal(app.run('usesPhonetic()'), false);
  assert.equal(app.ids.get('qa-count').textContent, '已確認 0／8 項');
  assert.equal(app.run("state.phonetic='on'; usesPhonetic()"), true);
});


test('copy routes the generated student prompt to the clipboard', async () => {
  const app = setup();
  await app.run("copyText(chatgptPdfPrompt())");
  assert.equal(app.clipboard(), app.ids.get('chatgpt-pdf-prompt').value);
  assert.match(app.ids.get('toast').textContent, /已複製/);
});

test('homepage quantity is optional and independent of the ten-blank sample', () => {
  const app = setup({quickBlankAmount:'24'});
  app.click('load-chinese-example');
  assert.match(app.ids.get('chatgpt-pdf-prompt').value, /網站指定整份24格/);
  assert.match(app.ids.get('image-prompt').value, /網站指定整份10格/);
  app.run("state.quickBlankAmount = '2.5'; render()");
  assert.equal(app.ids.get('copy-pdf-prompt').disabled, true);
  app.run("state.quickBlankAmount = ''; render()");
  assert.equal(app.ids.get('copy-pdf-prompt').disabled, false);
  assert.match(app.ids.get('chatgpt-pdf-prompt').value, /彈性安排格數/);
});

test('direct production includes selected values and skips the confirmation flow', () => {
  const app = setup({quickBlankAmount:'20', directGrade:'4', directSubject:'社會', reviewMode:'teacher'});
  const direct = app.ids.get('direct-prompt').value;
  assert.match(direct, /國小4年級、社會/);
  assert.match(direct, /整份20格/);
  assert.match(direct, /略過所有中間確認/);
  assert.doesNotMatch(direct, /請先詢問使用者|教師逐關確認|詢問是否納入/);
  assert.match(app.ids.get('chatgpt-pdf-prompt').value, /教師逐關確認/);
  app.run("state.directSubject = ''; render()");
  assert.equal(app.ids.get('copy-direct-prompt').disabled, true);
});
