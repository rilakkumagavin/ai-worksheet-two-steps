'use strict';
const $ = id => document.getElementById(id);
const STORAGE_KEY = 'worksheet-two-steps-v1';
const gradeInfo = {
  low: {name:'低年級（1–2年級）', description:'大字、短句、具體圖像；少量填空與詞語提示。預設加注音，可調整標示方式。', design:'低年級：大字、短句、一句一個概念，使用具體生活情境和清楚圖像。建議4–6格，依教材調整，內容過多就拆頁。'},
  middle: {name:'中年級（3–4年級）', description:'以黑白情境圖承載填空，加入比較、順序與因果；保留少量理由題，不以大量申論增加難度。', design:'中年級：以圖文情境填空為主，結合特徵比較、步驟順序、原因結果與概念連結，避免全是名詞記憶；只安排1–2題短句理由題，不把每格改成申論。填空以有意義詞組為單位，保留「可能」「較」等限定語，圖中線索可協助思考，但不直接寫出待填答案。每一區有清楚小問題，底部整理各區如何串聯；不為湊題數或提高難度加入教材外知識。'},
  high: {name:'高年級（5–6年級）', description:'參考六年級C挑戰版：自主建構架構、引用課文證據、情境判斷並自行出題；不預填分支與關鍵詞。', design:'高年級C挑戰版：學生自行閱讀教材、分類與建構架構，說明關係並引用課文依據，不是只挖8–10個關鍵詞。學生版只給核心大問題、開放心智圖空白區、3題有討論空間的情境判斷、1題學生自編題與1題延伸思考。心智圖至少占半頁；空間不足就拆成建構頁與應用頁，不縮小文字。一般檢核只問概念有無依據、層級清楚、關係可解釋、例子適切，不列本課主幹或答案名稱。情境明確標示為教學假設，推理限於教材支持的原則，不新增外部知識或要求教材未提供的專業定論。完整架構、作答方向、替代合理說法與三級評分規準放教師版。'}
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
const seniorExampleMaterial = "# 六上社會1-3｜C挑戰版教師參考\n\n範圍：〈民主國家政府與人民的關係為何？〉課本印刷34–39頁／本機PDF1–6。已讀文字並逐頁檢視6張渲染圖。不混入1-2或40–41頁國民教育探究。以下依教材作教學整理，不作現行法律諮詢。\n\n## 教師端完整參考架構\n\n| 面向 | 概念與關係 | 課本印刷頁／PDF頁序 |\n|---|---|---|\n| 人民與政府 | 人民是民主國家的主人，以選票選出執政者，由其組織政府為民服務；政府維護安全、秩序，保障權利 | 34／1 |\n| 中央分工 | 中央負責全國性公共事務，包含總統與五院，彼此分工合作、互相監督 | 35／2 |\n| 地方分工 | 地方行政機關推動政策、辦地方事務；地方立法機關審議地方法規、監督行政施政 | 36／3 |\n| 跨層級合作 | 酒駕案例：行政院規畫政策、立法院修法、縣市政府依法執行、縣市議會監督；不能把修法當作全部工作 | 37／4 |\n| 傾聽與監督 | 公聽會、反映意見平臺；人民支持與監督政府，可向民意代表反映、透過集會遊行要求改善 | 38／5 |\n| 影響與保障 | 政策可能影響部分人的權益，應提供救助與申訴管道；受影響者依法申請，課本以疫情影響餐旅業為例 | 39／6 |\n\n核心關係可整理為「人民授權 → 政府分工服務 → 人民參與及監督 → 政府回應、調整並保障權益」。這只是教師參考組織，學生可提出不同但正確有據的架構。不得把此串列印在學生空白心智圖旁。\n\n## 學生版第1頁：自主建構\n\n任務01：閱讀本課後，回答大問題「民主國家政府與人民的關係為何？」用自己的方式畫一張心智圖，說明重要概念、關係與例子。\n\n不提供詞語庫、主幹名稱、預填分支、關係箭頭、示例答案或小結。保留至少半頁空白可畫寫。\n\n通用自我檢查：概念有教材依據；層級清楚；能解釋概念關係；例子與概念相符。這些檢核不直接列出本課答案類別。\n\n完成後選一條重要連結，用自己的話解釋，附「課本第＿頁／我的解釋＿」。\n\n## 學生版第2頁：應用與出題\n\n以下三個事件均為教學假設，非課本記載的真實事件。請依本課原則推理，不猜精確法律裁決。\n\n任務02：市府規畫改善道路，尚未聽取附近居民的意見。居民想提出交通與生活上的顧慮，可以怎麼做？你建議政府如何回應？\n\n教師參考：居民可透過反映意見平臺或民意代表提出顧慮；政府可透過公聽會等方式聽取意見並回應、調整。依據36、38頁。學生至少連結「意見表達」與「政府回應」。不要求說出特定工程必須的法定程序；教材未提供每項工程均須全體居民同意的規定。\n\n任務03：小安說：「防制酒駕只要中央修法就夠了，地方不必執行，也不必監督。」你同意嗎？請解釋理由。\n\n教師參考：不認同只靠修法。課本酒駕案例同時包含行政院政策規畫、立法院修法、縣市政府執行與議會監督；法律與政策仍須執行並接受檢視。依據37頁。接受不同順序或圖示表達；不把四項工作當作所有政策固定的單一路徑，不要求精確酒測值、罰則或成效數字。\n\n任務04：居民支持防疫措施，附近店家卻因政策減少收入。如何兼顧公共福祉與店家的權益？\n\n教師參考：說明政策的公共目的與受影響者需要皆應看見；政府提供救助、申訴等管道，店家可依法提出申請或反映意見。依據38–39頁。不推論只要提出申請就一定獲准，不杜撰金額、資格、期限，也不因有人受影響就認定政策必然不合理。\n\n每題留四項作答空白：「相關概念／我的判斷或建議／理由／課本第＿頁或教材依據」。不能在圖旁附機關名稱清單或把參考理由印出。\n\n任務05：我是出題老師。依本課自編一個生活情境及問題，再寫參考答案、理由與教材依據，和同學交換作答。無固定答案；觀察是否有課文支持、事件條件清楚且問題可討論。\n\n任務06：延伸思考。如果人民只能在選舉時表達意見，選後無法反映或監督，可能有什麼影響？請依本課說明。參考方向：政府較難掌握意見及發現施政問題、調整與改善服務的機會降低。依據38頁，接受合理有據的不同表述。\n\n## 三級評分規準\n\n| 面向 | 3 精熟 | 2 達標 | 1 待加強 |\n|---|---|---|---|\n| 概念與架構 | 主要概念正確，層級清楚 | 概念大致正確，少量遺漏 | 分類混淆或概念明顯錯誤 |\n| 關係解釋 | 能解釋多個概念之間的關係並舉例 | 能說明基本關係 | 主要抄名詞，關係不清 |\n| 教材證據 | 頁碼或內容依據明確，能支持論點 | 有依據但連結較弱 | 無依據或引用不相關內容 |\n| 情境推理 | 看見多方需求、能指出條件與限制 | 有合理理由但較單一 | 只有對錯，或加入無據結論 |\n| 自主出題與表達 | 情境清楚、答案有據，以自己的話表達 | 可作答，理由尚可補強 | 事件不清或問題答案無關 |\n\n不以學生的心智圖是否與教師範例一樣評分；頁碼記錯與概念理解分開回饋，不能只對頁碼評斷思考能力。\n";
let state = {grade:'middle',subject:'',lesson:'',pages:'',material:'',support:'grade',phonetic:'grade',layout:'橫式',issues:'',checks:{},step:1};
let storageAvailable = true;
try {const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(saved && typeof saved==='object' && !Array.isArray(saved)){for(const key of ['subject','lesson','pages','material','issues'])if(typeof saved[key]==='string')state[key]=saved[key];if(gradeInfo[saved.grade])state.grade=saved.grade;if(['grade','none','bank'].includes(saved.support))state.support=saved.support;if(['grade','on','off'].includes(saved.phonetic))state.phonetic=saved.phonetic;if(['橫式','直式'].includes(saved.layout))state.layout=saved.layout;if(saved.checks&&typeof saved.checks==='object'&&!Array.isArray(saved.checks))state.checks=saved.checks;if(!['grade','on','off'].includes(saved.phonetic))state.checks={};if(saved.step===2)state.step=2;}}catch{storageAvailable=false;}
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
依科目與教材選擇結構：國語可用角色、段落與情節比較；自然可用觀察、實驗證據與因果；社會可用時序、空間及人與環境關係。這些是結構選項，不是本課事實；其他科目也依教材調整。保留「核心問題→各部分重點→部分之間的關係」脈絡；例子、關鍵詞與統整句若直接洩漏待填答案，改放教師版。
請輸出：
1. 本課核心問題與主要概念。
2. 教材架構：依知識關係分成適合的部分，說明分類、順序、比較、因果或互相影響；不要硬湊固定三部分。
3. 各部分關鍵詞、教材中的具體例子及圖像可表達的關係。
${state.grade==='high'?'4. 另列教師專用概念架構、關係與來源表；設計3個需引用教材原則的假設情境，附可接受的推理與條件差異。學生版保留自主建構空間，不預先填好主幹或分類。不把開放題當單一標準答案題。':'4. 適合上述年級的填空候選題、答案、可接受替代答案與教材依據。避免挖零碎字、重複答案或多解題；保留「可能」「較」等限定語。題數依內容及可讀性決定，內容太多提出拆頁建議。'}
${state.grade==='high'?'5. 輸出可交給ChatGPT的挑戰版底稿：教師端完整教材分析／學生端任務短句、情境及作答空間／獨立教師參考與評分規準。每題保留「課本第＿頁／依據＿／我的理由＿」，不用現成小提醒或總結句代學生思考。':'5. 能直接交給ChatGPT的完整內容底稿：學生短句、自然區塊標題、填空、獨立教師答案表與來源表，將製圖限制和教材正文分開。'}
6. 建議圖文版面：各區小問題、對應情境圖、嵌入的填空短句，以及底部「觀念串聯」的關係；以圖文填空為主，中年級只保留1–2題短句理由題，不把整份改成申論。
7. 易畫錯的概念與待教師確認事項。
${gradeInfo[state.grade].design}
每項重點、每個答案列來源檔名、印刷頁碼與PDF頁序，分清教冊實體頁碼和內嵌課本頁碼。無法讀到頁碼寫「無法確認」，不可推測。不聲稱已操作本機或已驗證圖片。
最後提醒老師開啟引用原頁核對後，再將內容交給ChatGPT。`;}
function bankRule(){if(state.grade==='high')return 'C挑戰版不提供詞語庫，不預填本課分類、主幹、分支、關係箭頭答案或總結句。';if(state.support==='none'||(state.support==='grade'&&state.grade!=='low'))return '不提供詞語庫；不在對應圖旁、標題、圖說或空格直接透露答案。';return '提供打亂順序的詞語庫作為提示，各詞不編對應題號；空格保持空白，不在對應圖旁直接寫答案。詞語庫是有意提供的提示，不是填好的答案。';}
function usesPhonetic(){return state.phonetic==='on'||(state.phonetic==='grade'&&state.grade!=='high');}
function phoneticRule(){return usesPhonetic()?'注音標示：指定注音芫荽（Bpmf Iansui），每個中文字右側加清楚的臺灣國語直式注音與聲調；注音不可重疊，不佔用手寫空格，必要時增行距或拆頁。多音字依詞義核對，未填的答案也不得用注音洩漏。圖片生成無法證明精確套用字型檔，不得宣稱已精確套用；若無法保證，請如實說明，並另附文字底稿供實際字型排版。':'本次不加注音，使用清楚繁體中文字，保留足夠手寫空間。';}
function highImagePrompt(){return `請直接使用圖片生成功能，製作「${state.lesson.trim()||'依底稿確認課名'}｜C挑戰版」學生學習單。標題與情境必須對應本課，不能沿用上一課的標題、名詞或檢核內容。
對象：${gradeInfo.high.name}；科目：${state.subject.trim()||'依教材'}。A4${state.layout}，繁體中文，留足手寫空間，不提供詞語庫。
${gradeInfo.high.design}
${phoneticRule()}
學生版用自然區塊標題，不印B01、Q1或任務01等題碼。
請按5個任務區安排：1.只給本課核心大問題及不含答案的通用檢核；2.至少半頁完全空白的心智圖區，不預畫主幹、分支或關係箭頭；3.三個假設生活情境，每題留「相關概念＿／我的判斷＿／理由＿／課本第＿頁或教材依據＿」，允許依條件討論，不只勾對錯；4.我是出題老師，留情境、問題、參考答案與依據空白；5.開放延伸題並留作答空間。若一頁無法保留半頁心智圖，請拆兩張。
插圖只能中性裝飾或描述情境，不可用機關標籤、分支圖或答案示例替學生完成架構。底稿中的完整概念表、原填空答案與總結只供教師查核，不能原樣印進學生圖。若底稿仍是關鍵詞填空，將其作為教師端概念依據，轉成上述挑戰任務，不將填空答案印出。
情境不可要求教材未提供的專業定論或精確資料，資料不足時讓學生指出缺少哪些條件。先產生學生圖及另列教師參考文字；教師版圖片等老師檢查後另作。不要自稱已完成內容驗證。
【已核對教材底稿開始】
${state.material.trim()}
【已核對教材底稿結束】`; }
function imagePrompt(){if(!state.material.trim())return '';if(state.grade==='high')return highImagePrompt();return `請直接使用圖片生成功能，製作「${state.lesson.trim()||'依教材辨識課名'}」圖片式填空學習單的學生版。這次要圖片，不是只有提示詞或程式碼。
對象：${gradeInfo[state.grade].name}；科目：${state.subject.trim()||'依教材'}。A4${state.layout}比例，白底、清楚繁體中文、有足夠手寫空間；內容太多請拆頁，不能縮小到不可讀。
${gradeInfo[state.grade].design}
${bankRule()}
${phoneticRule()}
依科目與教材選擇結構：國語可用角色、段落與情節比較；自然可用觀察、實驗證據與因果；社會可用時序、空間及人與環境關係。這些是結構選項，不是本課事實；其他科目也依教材調整。保留「核心問題→各部分重點→部分之間的關係」脈絡；例子、關鍵詞與統整句若直接洩漏待填答案，改放教師版。
版型：黑白線稿、白底、適合影印，A4橫式優先。以核心問題統整全頁，再依教材分成2–4個脈絡區塊；每區用自然語言小標題、清楚邊框與教材情境插圖，將短句與填空直接嵌入相關圖景、對話框或實驗步驟，不做插圖與題目分離的長問答表。圖片用來觀察、比較、說明順序或因果；實驗題依教材呈現材料、操作、觀察與結論，不能自行新增結果。下方另留「觀念串聯」，以箭頭及簡短統整句表達各部分的關係，不直接洩漏待填答案。可用一、二、三區塊及一般題號1、2、3，禁止B01、B02、Q1等代碼。先確保字大、空格可寫，內容太密就拆兩頁，不硬塞滿。
內容規則：只用下方已核對教材，不新增外部知識。保留已核對的題意及限定語；候選內容依年級選題。學生版使用自然區塊標題，可保留一般題號，不印B01、B02、Q1或任務01等代碼；底稿有代碼也請移除。教師答案依區塊名稱、題面及位置對照。圖片與箭頭應顯示教材的分類、比較、順序或因果，不只是裝飾。條件不明或來源互相矛盾時，列出疑點請老師確認，不能猜答案。
學生圖只印學生標題、班級姓名日期、必要的教學圖文及空白題目。下方底稿中的教師答案、來源表、製作規則、檢查清單不當作學生正文印在圖上。答案表另以文字提供，不放進學生圖片。
請先產生學生圖片，等待老師檢查後，再從同一張圖編輯教師答案版。不要宣稱圖片已經驗證正確。

【已核對教材底稿開始】
${state.material.trim()}
【已核對教材底稿結束】`;}
function teacherPrompt(){if(!state.material.trim())return '';if(state.grade==='high')return `請依剛才C挑戰版的區塊及題目順序，另外製作教師參考版，不覆寫學生空白圖。提供完整參考概念架構、各題教材依據與推理方向、合理替代答案及三級評分規準（精熟／達標／待加強），面向含概念正確、關係解釋、教材證據、情境推理及自主表達。學生可用不同架構或立場，只要有依據；不以與範例圖相同當得分標準。自編題沒有唯一答案，評量其情境合理、提問清楚與答案有據。未經來源支持的法規或細節標示教材未明確提供。\n${state.material.trim()}`;return `請根據剛才已由老師核對的學生圖，使用圖片編輯製作同版教師答案圖。保持原圖版面、插圖、所有題面和空格位置，保留原有注音，只在原空格以紅色填入答案，並加小字「教師答案版」。如原圖有注音，答案也要帶正確注音，但不可擠壓題面。不得新增、刪除、更換題目；不要重新排版。若題面或答案不確定，先列疑點，不猜。
請對照下面教材底稿的獨立答案與來源，依區塊、題面與位置逐格核對，再出圖。出圖後仍需人工比較兩版。
${state.material.trim()}`;}
function render(){document.querySelectorAll('[data-grade]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.grade===state.grade)));$('grade-description').textContent=gradeInfo[state.grade].description;$('font-note').hidden=!usesPhonetic();$('high-note').hidden=state.grade!=='high';$('support').disabled=state.grade==='high';$('support').title=state.grade==='high'?'C挑戰版不使用詞語庫':'';$('notebook-prompt').value=notebookPrompt();$('image-prompt').value=imagePrompt();$('teacher-prompt').value=teacherPrompt();$('copy-image').disabled=!state.material.trim();$('load-example').textContent=state.grade==='high'?'載入六上挑戰版範例':'載入地形實測範例';$('material-status').textContent=!state.material.trim()?'先貼上已核對教材，才能複製圖片提示詞。':state.material.trim().length<100?'目前內容較短，請確認已包含架構、候選題、答案與來源。':'提示詞已帶入你的教材與年級設定，複製前可向上檢查。';}
async function copyText(text,field){if(!text.trim()){toast('請先填入教材內容。');return;}try{await navigator.clipboard.writeText(text);toast('已複製，可以貼到對應平台。');}catch{if(field){field.focus();field.select();}toast('自動複製不可用，請選取文字後手動複製。');}}
for(const key of ['subject','lesson','pages','material','support','phonetic','layout','issues']){$(key).value=state[key];$(key).addEventListener('input',()=>{state[key]=$(key).value;if(key!=='issues')clearChecks();render();save();});}
document.querySelectorAll('[data-grade]').forEach(el=>el.addEventListener('click',()=>{state.grade=el.dataset.grade;clearChecks();render();save();}));
document.querySelectorAll('[data-check]').forEach(el=>{el.checked=state.checks[el.dataset.check]===true;el.addEventListener('change',()=>{state.checks[el.dataset.check]=el.checked;save();});});
for(const i of [1,2]){$('tab-'+i).addEventListener('click',()=>switchStep(i));$('tab-'+i).addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();switchStep(event.key==='Home'?1:event.key==='End'?2:i===1?2:1,true);}});}
$('next-step').addEventListener('click',()=>{switchStep(2,true);$('tab-2').scrollIntoView({block:'start',behavior:'smooth'});});
document.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',()=>copyText($(el.dataset.copy).value,$(el.dataset.copy))));
$('load-example').addEventListener('click',()=>{const isSenior=state.grade==='high';const chosen=isSenior?seniorExampleMaterial:exampleMaterial;if(state.material.trim()&&state.material!==chosen&&!window.confirm('載入範例會取代目前工作區的教材內容。先取消並匯出，可保留原內容。要載入範例嗎？'))return;Object.assign(state,{grade:isSenior?'high':'middle',subject:'社會',lesson:isSenior?'六上1-3 民主國家政府與人民的關係為何？':'四上1-2 家鄉的地形',pages:isSenior?'課本印刷34–39頁／PDF1–6':'課本印刷20–23頁／PDF1–4',material:chosen,support:'none',phonetic:isSenior?'off':state.phonetic});for(const key of ['subject','lesson','pages','material','support','phonetic'])$(key).value=state[key];clearChecks();render();save();toast(isSenior?'已載入六上1-3 C挑戰版底稿（無注音）。':'已載入四年級實測底稿（無詞語庫版）。');});
$('copy-fix').addEventListener('click',()=>{if(!state.issues.trim()){toast('先寫下要修正的地方。');$('issues').focus();return;}copyText(`請編輯剛才的學習單圖片，只修正以下問題，其餘題面、空格與版面保持一致。不要新增教材外知識，不確定的內容先問老師。\n${state.issues.trim()}\n對象：${gradeInfo[state.grade].name}。修正後提供圖片與修改清單，仍須老師對照教材核對。`,$('issues'));});
$('download').addEventListener('click',()=>{const checks=[...document.querySelectorAll('[data-check]')].map(el=>`- [${el.checked?'x':' '}] ${el.parentElement.textContent.trim()}`).join('\n');const text=`# ${state.lesson.trim()||'我的圖像學習單'}｜兩步驟製作包\n\n年級：${gradeInfo[state.grade].name}\n注音：${usesPhonetic()?'加注音':'不加注音'}\n範圍：${state.pages||'未填'}\n\n## 1. NotebookLM提示詞\n\n${notebookPrompt()}\n\n## 已核對教材拆解\n\n${state.material||'尚未貼入'}\n\n## 2. ChatGPT學生圖片提示詞\n\n${imagePrompt()||'先貼入教材拆解'}\n\n## 同版教師圖片提示詞\n\n${teacherPrompt()||'先貼入教材拆解'}\n\n## 人工檢查紀錄\n\n${checks}\n\n## 待修正\n\n${state.issues||'未填'}\n\n勾選僅是人工紀錄，不代表系統驗證或教師已定稿。`;const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='兩步驟學習單製作包.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('製作包已匯出。');});
$('clear').addEventListener('click',()=>{if(!window.confirm('清除目前瀏覽器內這個工具的教材與檢查紀錄？建議先匯出製作包。'))return;try{localStorage.removeItem(STORAGE_KEY);}catch{}location.reload();});
render();switchStep(state.step);if(!storageAvailable)$('save-status').textContent='儲存不可用，請匯出製作包';
