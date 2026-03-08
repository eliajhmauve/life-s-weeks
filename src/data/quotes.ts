export const timeQuotes = [
  { text: "時間是我們最珍貴的貨幣，卻也是我們最隨意揮霍的。", author: "塞內卡" },
  { text: "你無法回到過去重新開始，但你可以從現在開始，創造一個全新的結局。", author: "瑪麗亞·乾德" },
  { text: "人生不是關於等待暴風雨過去，而是學會在雨中跳舞。", author: "乾維安·乾恩" },
  { text: "昨日已逝，明日未至，我們擁有的只有今天。", author: "德蕾莎修女" },
  { text: "不要計算日子，讓每一天都有意義。", author: "穆罕默德·阿里" },
  { text: "生命中最重要的兩天，是你出生的那天和你發現為什麼的那天。", author: "馬克·吐溫" },
  { text: "時間會過去，但你用它做了什麼，永遠不會消失。", author: "佚名" },
  { text: "活在當下，不是因為明天不重要，而是因為今天不可替代。", author: "佚名" },
  { text: "二十年後，你會因為沒做的事而後悔，而不是因為做過的事。", author: "馬克·吐溫" },
  { text: "最好的時間是十年前，其次是現在。", author: "中國諺語" },
  { text: "我們不是缺少時間，而是缺少專注。", author: "佚名" },
  { text: "你的時間有限，不要浪費在過別人的生活上。", author: "史蒂夫·賈伯斯" },
  { text: "每一個不曾起舞的日子，都是對生命的辜負。", author: "尼采" },
  { text: "人生苦短，不要把時間花在猶豫上。", author: "佚名" },
  { text: "珍惜眼前人，把握當下事。", author: "佚名" },
];

export function getRandomQuote() {
  return timeQuotes[Math.floor(Math.random() * timeQuotes.length)];
}
