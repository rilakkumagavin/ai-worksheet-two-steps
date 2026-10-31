'use strict';
const $ = id => document.getElementById(id);
const STORAGE_KEY = 'worksheet-two-steps-v1';
const gradeInfo = {
  low: {name:'低年級（1–2年級）', description:'大字、短句、具體圖像；依指定格數提供圖像線索。預設加注音，可調整標示方式。', design:'低年級：大字、短句、一句一個概念，使用具體生活情境和清楚圖像。填空格數依老師選擇，依教材調整，內容過多就拆頁。'},
  middle: {name:'中年級（3–4年級）', description:'以黑白情境圖承載填空，加入比較、順序與因果；保留少量理由題，不以大量申論增加難度。', design:'中年級：以圖文情境填空為主，結合特徵比較、步驟順序、原因結果與概念連結，避免全是名詞記憶；只安排1–2題短句理由題，不把每格改成申論。填空以有意義詞組為單位，保留「可能」「較」等限定語，圖中線索可協助思考，但不直接寫出待填答案。每一區有清楚小問題，底部整理各區如何串聯；不為湊題數或提高難度加入教材外知識。'},
  high: {name:'高年級（5–6年級）', description:'以三部分圖像填空練習比較、因果與推論；難度與格數獨立選擇。', design:'高年級仍維持單一活動／課次的三部分圖像填空，以教材證據與推論調整難度。'}
};
const exampleMaterial = `【已核對教材拆解：四上社會1-2 家鄉的地形】
年級：中年級（四年級）。課本印刷20–23頁／PDF1–4。
核心問題：五種地形有何差異？地形如何影響生活？居民活動又如何改變景觀？
架構：觀察地形特徵 → 連結居民生活 ↔ 理解人與環境互相影響。
地形是地表高低起伏的型態，可透過實地觀察、空拍照片、閱讀地圖來認識。
平原平坦廣闊；盆地四周高、中間低平；台地頂部平坦，邊緣以陡坡與低地相接；丘陵高度不超過1000公尺、坡度較平緩；山地高聳，高度在1000公尺以上。高度界線依課本原文，不用剛好1000公尺出判斷題。
較平坦的平原、盆地、台地有利於種植作物、建築房屋、交通建設，可能形成農村、都市；靠海平原可能有魚塭漁村。丘陵、山地起伏較大，居民多選較平緩山坡地開闢茶園、果園。地形影響生活，居民活動也改變地表景觀。
【圖文情境填空學生底稿，可使用一般題號，不使用代碼】
核心問題：家鄉的地形有何不同？地形與居民生活如何互相影響？
一、觀察地形，找出特徵：五張獨立地形小圖搭配短句。平坦廣闊的是【　】；四周高、中間低平的是【　】；台地的頂部【　】，邊緣以陡坡與低地相接；丘陵高度不超過1000公尺，坡度較【　】；山地高聳，高度在【　】公尺以上。不能讓圖上名稱直接填好相鄰空格。
二、地形與生活：平原、盆地、台地較平坦，利於種植作物、建房與交通，可能形成【　】或都市；靠海平原可能有魚塭與【　】。丘陵、山地起伏較大，居民多選坡度較【　】的山坡開闢茶園、果園。三組圖景連結相應活動，不全部改成長問答。
三、人與環境互相影響：地形影響居民的【　】，居民活動也會改變地表的【　】。短句思考：為什麼不能說「地形平坦就一定形成都市」？請用課本一個例子說明，留兩行。
底部觀念串聯：觀察地形特徵 → 連結居民生活 ↔ 理解人與環境互相影響。這段不列待填的地形名稱或景觀答案。
【教師答案，不能印在學生圖】
觀察地形：平原、盆地、平坦、平緩、1000（20–21頁）。地形與生活：農村、漁村、平緩（22–23頁）。互相影響：生活／活動、景觀（23頁）。短句題：較平坦地區可能有農村、都市，靠海平原也可能有魚塭漁村，並非必然都市（22頁）。接受有教材依據的同義表述。
【視覺限制：不是要印在學習單上的正文】
三區：觀察地形／地形與生活／人與環境互相影響。五種地形用彼此分離的示意圖，不畫成固定由低到高的連續剖面；盆地中間低平、四周較高，不畫成湖泊；台地平頂陡邊，不畫成尖山。魚塭對應靠海平原，茶果園對應較平緩山坡地。第三區保留雙向影響，禁止在對應圖旁直接標出填空答案。
來源檔：02_國小社會4上課本_1-2_(學).pdf；教冊確認02_國小社會4上教冊(教學篇)_1-2_(教).pdf。教學導航實體40／PDF1，教學活動41／PDF2，內嵌課本20–23在教冊實體42–45／PDF3–6。`;
const chineseLesson2Material = "# 〈放學後〉進階10格｜教師參考與驗收\n\n範圍沿用本目錄教材核對紀錄：主課文五段，來源為第02課課本PDF的Notebook來源文字。未取得原PDF，印刷頁碼與PDF頁序仍待核對。\n\n本版由老師要求再提高難度，保留適中10格，分配3＋3＋4。增加因果、前後比較、隱含心情與全文主旨。另1題反證與理由長答，不計入概念填空。無注音，不宣稱注音合格。\n\n| 題號 | 參考方向 | 來源與評量界線 |\n|---|---|---|\n| 1 | 期待／急切／迫不及待 | 第1段「飛也似的」及後續回家活動，屬有據推論；可接受不同合理表述 |\n| 2 | 吸引力／誘惑力／美味吸引 | 第2段美食當前、不敵美食；不推論朋友一向不認真 |\n| 3 | 閱讀樂趣／有趣故事／精神滋養 | 第3段「精神食糧」及讀故事；原文未明說所有知識類別，不要求固定「增廣見聞」 |\n| 4 | 先看報紙／先閱讀 | 第3段爭誰先看 |\n| 5 | 閱讀位置／分看左右、正反面／共讀安排 | 第3段解決方法，句法通順即可 |\n| 6 | 合作／溝通協調／一起想辦法 | 第3段前後行動比較，接受有據多解，不要求唯一價值標籤 |\n| 7 | 完成功課／寫完作業 | 第4段明示時間先後 |\n| 8 | 依依不捨／捨不得離開 | 第4段結束遊戲的心情 |\n| 9 | 留住幸福時光的願望／對美好時光的留戀 | 第5段；不可解為時間真的停止 |\n| 10 | 幸福快樂／放學時光美好 | 第2–5段及結尾主旨，不只列單一活動 |\n\n反證題：兩人後來分看左右或正反面，可以同時閱讀，因此「一直無法」忽略後續變化。不必逐字抄整段；寫一個具體方法並解釋即可。\n\n評量：課文定位正確、因果合理、前後比較有線索、主旨與多個事件一致。只抄名詞不必然完成推論，合理同義說法均接受。此份為教師審閱草稿，實際列印及學生試作待確認。\n\n\n## 學生題面與版型\n製作四年級繁體中文黑白圖文脈絡學習單 A4橫式白底清晰大字，標題「四上國語第2課｜放學後」副標「進階10格：因果・比較・推論」，右上「學生版・待教師確認」，班級＿＿姓名＿＿日期＿＿。恰好10個【　　　　】概念填空，所有答案留白，沒有詞語庫，沒有B01或Q代碼。一般1–10題號。主體三區，左上第一區右上第二區下方第三區，中央小核心問題圓框「作者如何從日常小事，寫出放學後的幸福？」；中性黑白小插圖餐桌、兩個孩子共讀無字報紙、公園同伴，合計不超過25%，不能給答案圖說、不畫爭執變笑臉箭頭提示。底部關係串聯。完整排下列題文，不能自動填空，也不增加題目，文字不裁切，空格寬到可寫短語，第三區寬。\n第一區標題「一、連結情節，找出原因」\n「1. 『飛也似的趕回家』不只寫速度，也可看出作者回家的心情是【　　　　　　　　】。」\n「2. 朋友說來寫功課，卻把美食一掃而空；前後行動的差異，突顯點心對他們的【　　　　　　　　】。」\n「3. 同樣稱為『食糧』，點心滿足口腹，報紙則帶來【　　　　　　　　】。」\n插圖不要有任何食物或報紙名稱文字。此區3格。\n第二區標題「二、比較前後，理解人物」\n「4. 作者與姐姐起初爭吵，是因為兩人都想【　　　　　　　　】。」\n「5. 後來不再爭先後，而是改變【　　　　　　　　】的方法，讓兩人能同時看報。」\n「6. 從爭吵到一起想辦法，可以看出兩人開始用【　　　　　　　　】解決問題。」\n此區3格。第6合理多解，不提供選項或同義詞列表。\n第三區標題「三、從局部線索，讀懂全文」\n「7. 『寫完功課以後』表示公園遊戲的時間安排在【　　　　　　　　】之後。」\n「8. 遊戲很刺激、大家奮勇爭先，因此結束時會【　　　　　　　　】。」\n「9. 作者希望時間暫停，不是說時鐘真的停了，而是在表達【　　　　　　　　】。」\n「10. 全文從吃點心、看報到玩遊戲，這些不同事件共同支持的感受是【　　　　　　　　】。」\n此區4格，每格要能寫8字左右的短語。第三區右側留一個足夠大的證據框（不額外加【】）：\n標題「辨別過度推論」\n「有人說：『作者和姐姐曾爭吵，所以他們一直無法共享閱讀。』請找出課文反證，說明『一直』為什麼不合理。」\n留「課文反證：」一行長橫線，「我的說明：」一行長橫線。不要預印課文反證。\n底部「觀念串聯」三實心文字框非填空：「連結事件的因果」→「比較人物前後行動」→「用課文證據理解主旨」。\n頁腳「依第2課〈放學後〉五段課文整理｜無注音校稿版｜原教材頁碼待核對」。\n來源背景只供理解，禁止印出這段與答案：第一段作者每天飛也似趕回家。第二段點心美味，朋友來寫功課卻先吃美食。第三段國語日報為精神食糧，作者與姐姐爭誰先看，後來姐姐左我右、姐姐正我反，同時共讀，一邊吃一邊讀故事快樂。第四段完成功課在公園與姐姐同學玩追逐跳繩，傍晚呼喊才依依不捨結束。第五段吃點心看報玩遊戲，時間過很快，希望暫停永留幸福時光。合理答案方向：期待或急切、吸引力、閱讀樂趣或精神滋養、先看報紙、閱讀位置或報紙兩面分工、合作或溝通協調、完成功課、依依不捨、留住幸福時光的願望、幸福快樂。不要印答案，也不要宣稱作者必然有未明示心理。1、3、6、9、10允許有據不同表述。\n";
let state = {grade:'middle',subject:'',lesson:'',pages:'',material:'',support:'none',phonetic:'grade',blankAmount:'16',countBasis:'whole_sheet',difficulty:'一般',reviewMode:'teacher',goal:'尋找關聯性',version:'',numbering:'一般題號',layout:'橫式',issues:'',checks:{},step:1};
let storageAvailable = true;
try {const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(saved && typeof saved==='object' && !Array.isArray(saved)){for(const key of ['subject','lesson','pages','material','issues','goal','version'])if(typeof saved[key]==='string')state[key]=saved[key];if(gradeInfo[saved.grade])state.grade=saved.grade;if(['grade','none','bank'].includes(saved.support))state.support=saved.support;if(['grade','on','off'].includes(saved.phonetic))state.phonetic=saved.phonetic;if(Number.isInteger(Number(saved.blankAmount)) && Number(saved.blankAmount)>0)state.blankAmount=String(saved.blankAmount);if(['whole_sheet','per_part'].includes(saved.countBasis))state.countBasis=saved.countBasis;if(['基礎','一般','進階'].includes(saved.difficulty))state.difficulty=saved.difficulty;if(['一般題號','不顯示題號'].includes(saved.numbering))state.numbering=saved.numbering;if(['橫式','直式'].includes(saved.layout))state.layout=saved.layout;if(saved.checks&&typeof saved.checks==='object'&&!Array.isArray(saved.checks))state.checks=saved.checks;if(!['grade','on','off'].includes(saved.phonetic))state.checks={};if(!saved.countBasis)state.checks={};if(['teacher','ai'].includes(saved.reviewMode))state.reviewMode=saved.reviewMode;state.support='none';if(saved.step===2)state.step=2;}}catch{storageAvailable=false;}
let toastTimer;
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3000);}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('save-status').textContent='已儲存在目前瀏覽器';storageAvailable=true;}catch{storageAvailable=false;$('save-status').textContent='儲存不可用，請匯出製作包';}}
function clearChecks(){state.checks={};document.querySelectorAll('[data-check]').forEach(el=>el.checked=false);}
function switchStep(step,focus=false){state.step=step;for(const i of [1,2]){$('step-'+i).hidden=i!==step;$('tab-'+i).setAttribute('aria-selected',String(i===step));$('tab-'+i).tabIndex=i===step?0:-1;}save();if(focus)$('tab-'+step).focus();}
function blankRule(){const n=Number(state.blankAmount);if(!Number.isInteger(n)||n<1)return '格數尚未選定：先建議整份16格（可調），等待教師選定，不得當成已指定。';return `本次暫定格數（待教師確認）：${state.countBasis==='per_part'?`每部分${n}格，三部分共${n*3}格`:`整份恰${n}格，先列三部分分配，相加須為${n}`}。一個指定填空框算一格；姓名日期、非填空理由題及裝飾框不算。不得因排版或教材不足自行減題；必要時拆頁，來源不足則列待查並請教師調整。難度：${state.difficulty}，與格數獨立。學習目標：${state.goal||'待教師指定'}。目標為尋找關聯性時，至少50%的填空須有教材支持的比較、因果、先後、分類、條件結果或影響，不以名詞記憶充數。出圖前列逐字完整題幹、答案、來源及三部分格數，${state.reviewMode==='ai'?'依AI檢核模式持續出圖，列待查並保留待教師審核標記。':'待教師確認後才出圖。'}`;}
const notebookOriginals = [
'請只根據目前來源，列出：1. 能辨識的教材名稱與課名；2. 本課涵蓋的頁面或章節；3. 無法讀取、文字不清楚或來源不足之處。不要分析課程，也不要補充來源外資訊。',
'請只根據本課教材整理：1. 課名與核心問題；2. 學生學完最需要理解或做到的事；3. 3～5 個主要重點；4. 核心概念、關鍵詞與教材例子；5. 各重點的來源位置或核對線索。不要依頁面順序摘要；沒有明確提供的內容標示「教材未明確提供」。',
'請根據前述教材分析重組為三個教學部分。每部分包含暫定標題、核心問題、核心概念、3～5 個次要重點、教材例子與關鍵詞。三部分須呈現遞進、因果、比較或整體關係；最後用「部分一 → 部分二 → 部分三」說明順序。不得加入教材外資訊。'
];
function reviewRule(){return state.reviewMode==='ai'?'教師已透過本次選項指定略過中間確認：請AI自行檢核並持續推進，不逐關等待。工作稿標「AI工作定稿，待教師審核」，成品列已機器核查／尚待人工核查／未通過，不冒稱教師已確認。此選項不授權自動操作外部服務；來源不足、登入／權限或工具受阻時仍停在受影響步驟。':'教師逐關確認：教材與範圍、目標與三部分脈絡、格數及難度、題幹與風格、成品最終核對。在教師需要的節點等待，未確認如實標記。';}
function scopeRule(){return `對象：${gradeInfo[state.grade].name}；科目：${state.subject||'待指定'}；版本：${state.version||'版本待查'}。單一活動／課次：${state.lesson||'尚未指定，先列清單等待教師選定'}。來源頁碼：${state.pages||'待查'}。自然科按單元→活動，社會科按單元→課，其他科由教師指定最小粒度；三部分是同一活動／課內重組，不合併不同活動／課，除非教師明示總複習。只讀指定來源，保留原始教材；印刷頁與PDF頁序分開記錄，來源矛盾須列差異與採納依據。`;}
function notebookPrompt(){return `【老師跟做｜三段指令請分別貼上，不一次送出】\n${scopeRule()}\n先在NotebookLM限定本次來源／頁碼。每段保存未改動的原始回答、來源名稱與原有引用；回原頁核對，無法確認列待查，不虛構頁碼。\n\n`+notebookOriginals.map((v,i)=>`第${i+1}段：${['來源確認','教材分析','三部分重組'][i]}\n${v}`).join('\n\n')+`\n\n三段完成後，核對目標、三部分關係、學生短句、題幹與答案，再進入第二步。${reviewRule()}未實際執行寫「待執行」，未確認不得寫已確認。`;}
function bankRule(){return '學生版不得洩漏答案；不提供答案詞語庫，不在標題、圖說、注音或對應插圖旁透露待填答案。';}
function usesPhonetic(){return state.phonetic==='on'||(state.phonetic==='grade'&&state.grade!=='high');}
function phoneticRule(){return usesPhonetic()?'注音標示：指定注音芫荽（Bpmf Iansui），每個中文字右側加清楚的臺灣國語直式注音與聲調；注音不可重疊，不佔用手寫空格，必要時增行距或拆頁。多音字依詞義核對，未填的答案也不得用注音洩漏。圖片生成無法證明精確套用字型檔，不得宣稱已精確套用；若無法保證，請如實說明，並另附文字底稿供實際字型排版。':'本次不加注音，使用清楚繁體中文字，保留足夠手寫空間。';}
function materialForImage(){return state.material.trim();}
function imagePrompt(){if(!state.material.trim())return '';return `【學生圖製作指令，待教師審核】
${reviewRule()}
${scopeRule()}
${blankRule()}
請先整理核心問題、目標、3～5個重點、三部分關係、教材例子與學生易懂短句；依來源編製逐字完整題幹、空格、答案、可接受說法、來源及圖片情境。原底稿的格數與版型僅供參考，須依本次設定另列完整修訂稿，不得直接沿用未定位的答案串。
依本次教師確認方式執行；不將未確認寫為已確認。
使用可用的ChatGPT圖像功能製作學生原圖；若不可用，交完整可複製提示包並標「未出圖」，不得把文字或草圖當成品。
版面：A4${state.layout}，黑白線稿、繁體中文、符合年級的短句和足夠書寫空間，必要時拆頁。三個教學部分須呈現教材支持的遞進、因果、比較或整體關係，插圖協助概念辨識與關聯，不製造教材外事實或精確地圖。參考圖只參考視覺，不能沿用未核對題目。高年級仍為三部分圖像填空，以比較與推論調整難度，不自動改成自主心智圖挑戰版。
${phoneticRule()}
${bankRule()}
題號：${state.numbering}；禁止B01、Q1等內部碼。學生圖不得印答案表或製作規則，標「待教師審核」。
取得可開啟原圖後，逐格抄錄實際題幹與位置，核對格數、三部分分配、錯字、圖文關係、答案外露、裁切與書寫空間；列出預定題目和實圖差異。錯誤先修再驗，不能確認列待查，不聲稱自動通過。
依實圖製作逐格答案表：教學部分、題號或出現順序、完整實圖題幹、圖上位置、答案、可接受說法、教材頁碼／核對線索、QA狀態。教師圖另以學生原圖同圖編輯。
學生圖、教師圖分別等比例嵌入PDF，多頁依順序合併，不拉伸、不裁切，學生PDF不混入答案。QA分「已機器核查／尚待人工核查／未通過」，未試印、試作或教師確認均列未完成。
【教師提供底稿，來源及確認狀態須逐項核對】
${materialForImage()}
【本次設定優先，先列完整題幹再出圖】
${blankRule()}`;}
function teacherPrompt(){if(!state.material.trim())return '';return `${reviewRule()}
請附上本次學生原圖，依實際圖片逐格定位後，製作答案表及同圖教師答案版；未確認的學生圖先核對，不假稱老師已核對。
答案表至少含：教學部分、題號或出現順序、完整實圖題幹、圖上位置、答案、可接受說法、教材頁碼／核對線索、QA狀態。依實圖而非原規劃答案串；來源不足列待查。
以同一張學生原圖為底，只在原空格填答案並加小字「教師答案版」。不重排題幹、題號、位置或插畫；無法精準同圖編輯須標限制，不宣稱完全相同。保留「待教師審核」。
學生圖和教師圖分別等比例嵌入PDF，不拉伸、不裁切；多頁依序合併，學生版不混入答案。核對頁數、尺寸、檔案可開啟、指定格數、三部分配置、逐格答案、來源及完整性。QA分為已機器核查／尚待人工核查／未通過；未試印、試作或教師確認均列未完成。
【底稿僅供核對，不得跳過實圖定位】
${state.material.trim()}`;}
function render(){document.querySelectorAll('[data-grade]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.grade===state.grade)));$('grade-description').textContent=gradeInfo[state.grade].description;$('font-note').hidden=!usesPhonetic();$('high-note').hidden=true;$('support').disabled=true;$('support').title='學生版不提供答案詞語庫，避免洩答';$('notebook-prompt').value=notebookPrompt();$('image-prompt').value=imagePrompt();$('teacher-prompt').value=teacherPrompt();$('copy-image').disabled=!state.material.trim();$('load-example').textContent='載入地形實測範例';$('material-status').textContent=!state.material.trim()?'先貼上 NotebookLM 的三次回答，再按上方按鈕複製。':state.material.trim().length<100?'目前內容較短，請確認已包含架構、候選題、答案與來源。':'已準備好。複製後，貼到 ChatGPT 的對話框送出。';}
async function copyText(text,field){if(!text.trim()){toast('請先填入教材內容。');return;}try{await navigator.clipboard.writeText(text);toast('已複製，可以貼到對應平台。');}catch{if(field){field.focus();field.select();}toast('自動複製不可用，請選取文字後手動複製。');}}
for(const key of ['subject','lesson','pages','material','support','phonetic','blankAmount','countBasis','difficulty','reviewMode','goal','version','numbering','layout','issues']){$(key).value=state[key];$(key).addEventListener('input',()=>{state[key]=$(key).value;if(key!=='issues')clearChecks();render();save();});}
document.querySelectorAll('[data-grade]').forEach(el=>el.addEventListener('click',()=>{state.grade=el.dataset.grade;clearChecks();render();save();}));
document.querySelectorAll('[data-check]').forEach(el=>{el.checked=state.checks[el.dataset.check]===true;el.addEventListener('change',()=>{state.checks[el.dataset.check]=el.checked;save();});});
for(const i of [1,2]){$('tab-'+i).addEventListener('click',()=>switchStep(i));$('tab-'+i).addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();switchStep(event.key==='Home'?1:event.key==='End'?2:i===1?2:1,true);}});}
$('next-step').addEventListener('click',()=>{switchStep(2,true);$('tab-2').scrollIntoView({block:'start',behavior:'smooth'});});
document.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',()=>copyText($(el.dataset.copy).value,$(el.dataset.copy))));
$('load-example').addEventListener('click',()=>{const isSenior=false;const chosen=exampleMaterial;if(state.material.trim()&&state.material!==chosen&&!window.confirm('載入範例會取代目前工作區的教材內容。先取消並匯出，可保留原內容。要載入範例嗎？'))return;Object.assign(state,{grade:isSenior?'high':'middle',subject:'社會',lesson:isSenior?'六上1-3 民主國家政府與人民的關係為何？':'四上1-2 家鄉的地形',pages:isSenior?'課本印刷34–39頁／PDF1–6':'課本印刷20–23頁／PDF1–4',material:chosen,support:'none',phonetic:isSenior?'off':state.phonetic});for(const key of ['subject','lesson','pages','material','support','phonetic'])$(key).value=state[key];clearChecks();render();save();toast(isSenior?'已載入六上1-3 C挑戰版底稿（無注音）。':'已載入四年級實測底稿（無詞語庫版）。');});
$('load-chinese-example').addEventListener('click',()=>{if(state.material.trim()&&state.material!==chineseLesson2Material&&!window.confirm('載入國語範例會取代目前工作區教材。要繼續嗎？'))return;Object.assign(state,{grade:'middle',subject:'國語',lesson:'四上第2課 放學後',pages:'主課文第1–5段；原PDF頁碼待核對',material:chineseLesson2Material,support:'none',phonetic:'off',blankAmount:'16',countBasis:'whole_sheet'});for(const key of ['subject','lesson','pages','material','support','phonetic','blankAmount','countBasis'])$(key).value=state[key];clearChecks();render();switchStep(2);save();toast('已載入國語底稿，填空量為暫定整份16格，待教師確認。');});
$('copy-fix').addEventListener('click',()=>{if(!state.issues.trim()){toast('先寫下要修正的地方。');$('issues').focus();return;}copyText(`請編輯剛才的學習單圖片，只修正以下問題，其餘題面、空格與版面保持一致。不要新增教材外知識，不確定的內容先問老師。\n${state.issues.trim()}\n對象：${gradeInfo[state.grade].name}。修正後提供圖片與修改清單，仍須老師對照教材核對。`,$('issues'));});
$('download').addEventListener('click',()=>{const checks=[...document.querySelectorAll('[data-check]')].map(el=>`- [${el.checked?'x':' '}] ${el.parentElement.textContent.trim()}`).join('\n');const text=`# ${state.lesson.trim()||'我的圖像學習單'}｜兩步驟製作包\n\n年級：${gradeInfo[state.grade].name}\n填空量：${state.blankAmount}（${state.countBasis==='per_part'?'每部分各計':'整份總計'}）；難度：${state.difficulty}\n注音：${usesPhonetic()?'加注音':'不加注音'}\n範圍：${state.pages||'未填'}\n\n## 1. NotebookLM提示詞\n\n${notebookPrompt()}\n\n## 教師提供底稿（確認狀態須另記）\n\n${state.material||'尚未貼入'}\n\n## 2. ChatGPT學生圖片提示詞\n\n${imagePrompt()||'先貼入教材拆解'}\n\n## 同版教師圖片提示詞\n\n${teacherPrompt()||'先貼入教材拆解'}\n\n## 教師確認方式\n\n${reviewRule()}\n\n## 人工檢查紀錄\n\n${checks}\n\n## 待修正\n\n${state.issues||'未填'}\n\n勾選僅是人工紀錄，不代表系統驗證或教師已定稿。`;const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='兩步驟學習單製作包.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('製作包已匯出。');});
$('clear').addEventListener('click',()=>{if(!window.confirm('清除目前瀏覽器內這個工具的教材與檢查紀錄？建議先匯出製作包。'))return;try{localStorage.removeItem(STORAGE_KEY);}catch{}location.reload();});
render();switchStep(state.step);if(!storageAvailable)$('save-status').textContent='儲存不可用，請匯出製作包';


let previewVersion='16';
function showPreview(version){previewVersion=version;const isMore=version==='22';const path='./assets/四上國語第2課-'+version+'格驗證.png';$('preview-image').src=path;$('preview-image').alt='放學後'+version+'格學生學習單';$('preview-open').href=path;$('preview-download').href=path;$('preview-download').textContent='下載'+version+'格學生版 ↓';$('preview-title').textContent=isMore?'22格・涵蓋更多語句線索':'16格・連結情節與感受';$('preview-description').textContent=isMore?'8＋7＋7格，加入句子寫法、時間關係與過度推論辨別。版面較密，短語作答為主，需長句時建議拆頁。':'6＋5＋5格，從感官語句、人物前後行動，讀到全文主旨。適合以短語整理理解。';$('use-preview').textContent=isMore?'以整份22格開始製作 →':'以整份16格開始製作 →';document.querySelectorAll('[data-preview]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.preview===version)));}
document.querySelectorAll('[data-preview]').forEach(el=>el.addEventListener('click',()=>showPreview(el.dataset.preview)));
$('use-preview').addEventListener('click',()=>{$('load-chinese-example').click();if(state.material!==chineseLesson2Material)return;state.countBasis='whole_sheet';$('countBasis').value=state.countBasis;state.blankAmount=previewVersion==='22'?'22':'16';$('blankAmount').value=state.blankAmount;clearChecks();render();save();$('workspace').scrollIntoView({block:'start',behavior:'smooth'});toast('已載入國語底稿；暫定整份'+state.blankAmount+'格，待教師確認。');});

document.querySelectorAll('[data-notebook-stage]').forEach(el=>el.addEventListener('click',()=>copyText(notebookOriginals[Number(el.dataset.notebookStage)])));
