const
    Jieba = require("./assets/jieba"),
    axios = require("axios"),
    config = (process.env.NODE_ENV === "development") ? require('../config') : process.env,
    time = require("time"),
    querystring = require("querystring"),
    { Pool } = require('pg'),
    consolere = require('console-remote-client').connect('console.re', '80', (config.console_re || "line_fumomo"), false);
const jieba = new Jieba();

const type_list = {
    "user": 1,
    "group": 2,
    "room": 3
}

module.exports = {
    join_event: join_event
}

function join_event(event) {
    try {
        console.re.log("join", event);
        event.reply("安安\n偶速家樂福的中元勸拜專員 - 福媽🎉\n偶會跟大家講普渡的三五事\n也可以來跟我聊心事啦😉\n或是把偶加入群組跟大家一起抬槓\n\n聊一聊如果講中偶的心內話，\n挖伍準備紅包給你噢🎁\n不要說福媽對你不好\n線索抵加👉 http://bit.ly/2uOKgGo\n\n之後有盈時， 福媽會再整理普渡教學給大家\n阿有想學普渡的話，記得要跟我講”普渡教學”內");
    } catch (err) {
        console.re.error(err);
    }
}

async function log_method(Q, A, key) {
    try {
        axios.post(config.apiUrl + '/log/add', {
            Question: Q,
            Answer: A,
            keyword: key
        })
    } catch (err) {
        console.re.error(err);
    }
}

async function push_event(type) {
    try {
        const now = new time.Date();
        now.setTimezone("Asia/Taipei");
        // let msg = "阿唷~拍謝啦!\n剛剛福媽才發現那個資料表壞掉了啦\n阿你趕快再回去填寫之前中彩蛋的領獎資料內\n這樣才能讓福媽把紅包寄給你喔!";

         let msg = [{
             type: 'text',
             text: '哎唷喂呀~\n你之前中彩蛋的收件資料還沒有填內!\n趕快去把資料填一填啦~\n阿不然偶是要怎麼把紅包寄給你蛤?\n\n阿如果你已經找不到填資料的地方吼~\n那就去這邊找偶兒子阿福幫忙啦↓\nhttps://www.facebook.com/carrefour.tw/'
         }];
        // let msg = "推播 測試";
        let res = await axios.post('https://asgardian.azurewebsites.net/api/addpush', querystring.stringify({
            Title: "linebot_push" + time.time(),
            Content: JSON.stringify(msg),
            TargetType: type,
            BookTime:''
        }));
        console.re.log(res.data);
    }
    catch (err) {
        console.re.error(err);
    }
}
