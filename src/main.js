const
    config = require("../config"),
    axios = require("axios"),
    linebot = require("linebot"),
    express = require("express"),
    FormData = require('form-data'),
    app = express();

const version = "0.8";

const bot = linebot({
    channelId: config.CHANNER_ID,
    channelSecret: config.CHANNEL_SECRET,
    channelAccessToken: config.ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.post("/", linebotParser);

app.get("/test", function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname +"/index.html");
});

bot.on('message', async function (event) {
    try {
        const {
            type,
            text
        } = event.message;
        console.log(event);
        const group_id = event.source.groupId;
        const user_id = event.source.userId;
        const base_id = group_id || user_id;

        if (type == 'text') {
            if (/^!起床/.test(text)) {
                event.reply('我起床了！');
            }
            if (/^[!！]trx/i.test(text)) { 
                var newStr = text.replace(/[!！]trx/ig, '');
                console.log(newStr)
                if (/規則/.test(newStr)) {
                    const roleStr = '!trx {時間} {人數}\n範例：!trx 6/19(三) +1\n\n!trx 名單  =>可查看名單'
                    event.reply(roleStr);
                }
                if (/名單/.test(newStr)) {
                    event.reply('https://docs.google.com/spreadsheets/d/1lKXoQrymYnH_i2S8e7MjMR9FErWkzVmJaQgjJcDWcg0/edit?usp=sharing');
                }
                if (/[+＋]\d+/.test(newStr)) {
                    const userData = await bot.getUserProfile(user_id);
                    let datas = newStr.replace(/[+＋]/,'').split(/\s+/);
                    let bodyData = new FormData();
                    bodyData.append('name', userData.displayName);
                    bodyData.append('date', datas[1]);
                    bodyData.append('num', datas[2]);
                    let res = await axios.post('https://script.google.com/macros/s/AKfycbwwC--_39aBvQJ5u8dPTlUCYtIeGL-QGh7Y-p21afQhD3HcLpNh/exec', bodyData, {
                        headers: bodyData.getHeaders(),
                    });
                    if (res.data) {
                        event.reply('報名成功')
                    }
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
});

app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port %s version：%s ", app.get("port"),version);
})