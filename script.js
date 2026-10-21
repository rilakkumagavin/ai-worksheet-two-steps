'use strict';
const $ = id => document.getElementById(id);
const STORAGE_KEY = 'worksheet-two-steps-v1';
const gradeInfo = {
  low: {name:'低年級（1–2年級）', description:'大字、短句、具體圖像；少量填空與詞語提示。指定注音芫荽，逐字核對注音。', design:'低年級：大字、短句、一句一個概念，使用具體生活情境和清楚圖像。建議4–6格，依教材調整，內容過多就拆頁。指定注音芫荽（Bpmf Iansui），文字右側加正確注音。不得只聲稱已套用字型；若圖片生成功能無法精確使用此字型，請如實告知，另附逐字文字底稿供以實際字型檔排版，並列出多音字待教師確認。'},
  middle: {name:'中年級（3–4年級）', description:'圖像協助分類、順序與簡單因果；保留關鍵詞填空，可選擇是否提供詞語庫。', design:'中年級：用圖像協助分類、先後順序、簡單因果，題面短句，關鍵詞填空。一般建議6–8格，依教材調整，不能為湊題數新增知識。至少三分之一考概念關係或應用。'},
  high: {name:'高年級（5–6年級）', description:'減少提示，練習比較、因果與概念關聯；提高思考要求，內容仍以原教材為準。', design:'高年級：減少直接提示，著重比較、因果、概念關聯與應用。一般建議8–10格，依教材調整，必要時拆頁。至少三分之一考關係；提高思考要求不等於增加教材外知識。'}
};
const exampleMaterial = `【已核對教材拆解：四上社會1-2 家鄉的地形】
年級：中年級（四年級）。課本印刷20–23頁／PDF1–4。
核心問題：五種地形有何差異？地形如何影響生活？居民活動又如何改變景觀？
架構：觀察地形特徵 → 連結居民生活 ↔ 理解人與環境互相影響。
地形是地表高低起伏的型態，可透過實地觀察、空拍照片、閱讀地圖來認識。
平原平坦廣闊；盆地四周高、中間低平；台地頂部平坦，邊緣以陡坡與低地相接；丘陵高度不超過1000公尺、坡度較平緩；山地高聳，高度在1000公尺以上。高度界線依課本原文，不用剛好1000公尺出判斷題。
較平坦的平原、盆地、台地有利於種植作物、建築房屋、交通建設，可能形成農村、都市；靠海平原可能有魚塭漁村。丘陵、山地起伏較大，居民多選較平緩山坡地開闢茶園、果園。地形影響生活，居民活動也改變地表景觀。
【本次正式題目：8格，保持編號與題面】
B01 平坦廣闊的地形是【　　　　】。答案：平原。課本20／PDF1。
B02 四周高、中間低平的地形是【　　　　】。答案：盆地。課本20／PDF1。
B03 頂部平坦、邊緣以陡坡和低地相接的地形是【　　　　】。答案：台地。課本21／PDF2。
B04 高度不超過1000公尺、坡度較平緩的地形是【　　　　】。答案：丘陵。課本21／PDF2。
B05 地勢高聳、高度在1000公尺以上的地形是【　　　　】。答案：山地。課本21／PDF2。
B06 靠海平原有一池池魚塭，可能形成【　　　　】。答案：漁村。課本22／PDF3。
B07 丘陵或山地起伏較大，居民多選坡度較【　　　　】的山坡地開闢茶園、果園。答案：平緩。課本23／PDF4。
B08 地形影響居民生活，居民的活動也會改變地表的【　　　　】與樣貌。答案：景觀。課本23／PDF4。
【視覺限制：不是要印在學習單上的正文】
三區：觀察地形／地形與生活／人與環境互相影響。五種地形用彼此分離的示意圖，不畫成固定由低到高的連續剖面；盆地中間低平、四周較高，不畫成湖泊；台地平頂陡邊，不畫成尖山。魚塭對應靠海平原，茶果園對應較平緩山坡地。第三區保留雙向影響，禁止在對應圖旁直接標出填空答案。
來源檔：02_國小社會4上課本_1-2_(學).pdf；教冊確認02_國小社會4上教冊(教學篇)_1-2_(教).pdf。教學導航實體40／PDF1，教學活動41／PDF2，內嵌課本20–23在教冊實體42–45／PDF3–6。`;
let state = {grade:'middle',subject:'社會',lesson:'',pages:'',material:'',support:'grade',layout:'橫式',issues:'',checks:{},step:1};
let storageAvailable = true;
try {const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(saved && typeof saved==='object' && !Array.isArray(saved)){for(const key of ['subject','lesson','pages','material','issues'])if(typeof saved[key]==='string')state[key]=saved[key];if(gradeInfo[saved.grade])state.grade=saved.grade;if(['grade','none','bank'].includes(saved.support))state.support=saved.support;if(['橫式','直式'].includes(saved.layout))state.layout=saved.layout;if(saved.checks&&typeof saved.checks==='object'&&!Array.isArray(saved.checks))state.checks=saved.checks;if(saved.step===2)state.step=2;}}catch{storageAvailable=false;}
let toastTimer;
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3000);}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('save-status').textContent='已儲存在目前瀏覽器';storageAvailable=true;}catch{storageAvailable=false;$('save-status').textContent='儲存不可用，請匯出製作包';}}
function clearChecks(){state.checks={};document.querySelectorAll('[data-check]').forEach(el=>el.checked=false);}
function switchStep(step,focus=false){state.step=step;for(const i of [1,2]){$('step-'+i).hidden=i!==step;$('tab-'+i).setAttribute('aria-selected',String(i===step));$('tab-'+i).tabIndex=i===step?0:-1;}save();if(focus)$('tab-'+step).focus();}
function notebookPrompt(){return `請只根據目前已選取的本課教材，拆解教材架構，作為圖片式填空學習單的依據。
對象：${gradeInfo[state.grade].name}
科目：${state.subject.trim()||'請依教材辨識'}
範圍：${state.lesson.trim()||'請先列出教材中的課次，等老師選定，不直接處理整冊'}
頁碼：${state.pages.trim()||'依來源確認，無法確認就明說'}

課本優先，教師手冊確認；學生習作只核對題意，不能當作標準答案本。不使用網路或常識補充。沒有依據就寫「教材未明確提供」。只處理指定課次。
請輸出：
1. 本課核心問題與主要概念。
2. 教材架構：依知識關係分成適合的部分，說明分類、順序、比較、因果或互相影響；不要硬湊固定三部分。
3. 各部分關鍵詞、教材中的具體例子及圖像可表達的關係。
4. 適合上述年級的填空候選題、答案、可接受替代答案與教材依據。避免挖零碎字、重複答案或多解題；保留「可能」「較」等限定語。題數依內容及可讀性決定，內容太多提出拆頁建議。
5. 能直接交給ChatGPT的完整內容底稿：學生短句、編號、填空、獨立教師答案表與來源表，將製圖限制和教材正文分開。
6. 易畫錯的概念與待教師確認事項。
${gradeInfo[state.grade].design}
每項重點、每個答案列來源檔名、印刷頁碼與PDF頁序，分清教冊實體頁碼和內嵌課本頁碼。無法讀到頁碼寫「無法確認」，不可推測。不聲稱已操作本機或已驗證圖片。
最後提醒老師開啟引用原頁核對後，再將內容交給ChatGPT。`;}
function bankRule(){if(state.support==='none'||(state.support==='grade'&&state.grade==='high'))return '不提供詞語庫；不在對應圖旁、標題、圖說或空格直接透露答案。';return '提供打亂順序的詞語庫作為提示，各詞不編對應題號；空格保持空白，不在對應圖旁直接寫答案。詞語庫是有意提供的提示，不是填好的答案。';}
function imagePrompt(){if(!state.material.trim())return '';return `請直接使用圖片生成功能，製作「${state.lesson.trim()||'依教材辨識課名'}」圖片式填空學習單的學生版。這次要圖片，不是只有提示詞或程式碼。
對象：${gradeInfo[state.grade].name}；科目：${state.subject.trim()||'依教材'}。A4${state.layout}比例，白底、清楚繁體中文、有足夠手寫空間；內容太多請拆頁，不能縮小到不可讀。
${gradeInfo[state.grade].design}
${bankRule()}
內容規則：只用下方已核對教材，不新增外部知識。若已指定正式題碼與題面，逐字保留；若仍是候選，先依年級挑選並編B01起的正式題碼，另列正式題面及答案表供核對。圖片與箭頭應顯示教材的分類、比較、順序或因果，不只是裝飾。條件不明或來源互相矛盾時，列出疑點請老師確認，不能猜答案。
學生圖只印學生標題、班級姓名日期、必要的教學圖文及空白題目。下方底稿中的教師答案、來源表、製作規則、檢查清單不當作學生正文印在圖上。答案表另以文字提供，不放進學生圖片。
請先產生學生圖片，等待老師檢查後，再從同一張圖編輯教師答案版。不要宣稱圖片已經驗證正確。

【已核對教材底稿開始】
${state.material.trim()}
【已核對教材底稿結束】`;}
function teacherPrompt(){if(!state.material.trim())return '';return `請根據剛才已由老師核對的學生圖，使用圖片編輯製作同版教師答案圖。保持原圖版面、插圖、所有題面、題碼和空格位置，只在原空格以紅色填入答案，並加小字「教師答案版」。不得新增、刪除、更換題目；不要重新排版。若題面或答案不確定，先列疑點，不猜。
請對照下面教材底稿的獨立答案與來源，逐格確認題碼一致，再出圖。出圖後仍需人工比較兩版。
${state.material.trim()}`;}
function render(){document.querySelectorAll('[data-grade]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.grade===state.grade)));$('grade-description').textContent=gradeInfo[state.grade].description;$('font-note').hidden=state.grade!=='low';$('notebook-prompt').value=notebookPrompt();$('image-prompt').value=imagePrompt();$('teacher-prompt').value=teacherPrompt();$('copy-image').disabled=!state.material.trim();$('material-status').textContent=!state.material.trim()?'先貼上已核對教材，才能複製圖片提示詞。':state.material.trim().length<100?'目前內容較短，請確認已包含架構、候選題、答案與來源。':'提示詞已帶入你的教材與年級設定，複製前可向上檢查。';}
async function copyText(text,field){if(!text.trim()){toast('請先填入教材內容。');return;}try{await navigator.clipboard.writeText(text);toast('已複製，可以貼到對應平台。');}catch{if(field){field.focus();field.select();}toast('自動複製不可用，請選取文字後手動複製。');}}
for(const key of ['subject','lesson','pages','material','support','layout','issues']){$(key).value=state[key];$(key).addEventListener('input',()=>{state[key]=$(key).value;if(key!=='issues')clearChecks();render();save();});}
document.querySelectorAll('[data-grade]').forEach(el=>el.addEventListener('click',()=>{state.grade=el.dataset.grade;clearChecks();render();save();}));
document.querySelectorAll('[data-check]').forEach(el=>{el.checked=state.checks[el.dataset.check]===true;el.addEventListener('change',()=>{state.checks[el.dataset.check]=el.checked;save();});});
for(const i of [1,2]){$('tab-'+i).addEventListener('click',()=>switchStep(i));$('tab-'+i).addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();switchStep(event.key==='Home'?1:event.key==='End'?2:i===1?2:1,true);}});}
$('next-step').addEventListener('click',()=>{switchStep(2,true);$('tab-2').scrollIntoView({block:'start',behavior:'smooth'});});
document.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',()=>copyText($(el.dataset.copy).value,$(el.dataset.copy))));
$('load-example').addEventListener('click',()=>{if(state.material.trim()&&state.material!==exampleMaterial&&!window.confirm('載入範例會取代目前工作區的教材內容。先取消並匯出，可保留原內容。要載入範例嗎？'))return;Object.assign(state,{grade:'middle',subject:'社會',lesson:'四上1-2 家鄉的地形',pages:'課本印刷20–23頁／PDF1–4',material:exampleMaterial,support:'none'});for(const key of ['subject','lesson','pages','material','support'])$(key).value=state[key];clearChecks();render();save();toast('已載入四年級實測底稿（無詞語庫版）。');});
$('copy-fix').addEventListener('click',()=>{if(!state.issues.trim()){toast('先寫下要修正的地方。');$('issues').focus();return;}copyText(`請編輯剛才的學習單圖片，只修正以下問題，其餘題面、題碼、空格與版面保持一致。不要新增教材外知識，不確定的內容先問老師。\n${state.issues.trim()}\n對象：${gradeInfo[state.grade].name}。修正後提供圖片與修改清單，仍須老師對照教材核對。`,$('issues'));});
$('download').addEventListener('click',()=>{const checks=[...document.querySelectorAll('[data-check]')].map(el=>`- [${el.checked?'x':' '}] ${el.parentElement.textContent.trim()}`).join('\n');const text=`# ${state.lesson.trim()||'我的圖像學習單'}｜兩步驟製作包\n\n年級：${gradeInfo[state.grade].name}\n範圍：${state.pages||'未填'}\n\n## 1. NotebookLM提示詞\n\n${notebookPrompt()}\n\n## 已核對教材拆解\n\n${state.material||'尚未貼入'}\n\n## 2. ChatGPT學生圖片提示詞\n\n${imagePrompt()||'先貼入教材拆解'}\n\n## 同版教師圖片提示詞\n\n${teacherPrompt()||'先貼入教材拆解'}\n\n## 人工檢查紀錄\n\n${checks}\n\n## 待修正\n\n${state.issues||'未填'}\n\n勾選僅是人工紀錄，不代表系統驗證或教師已定稿。`;const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='兩步驟學習單製作包.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('製作包已匯出。');});
$('clear').addEventListener('click',()=>{if(!window.confirm('清除目前瀏覽器內這個工具的教材與檢查紀錄？建議先匯出製作包。'))return;try{localStorage.removeItem(STORAGE_KEY);}catch{}location.reload();});
render();switchStep(state.step);if(!storageAvailable)$('save-status').textContent='儲存不可用，請匯出製作包';
