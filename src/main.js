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
            if (/^[!！]/.test(text)) { 
                var newStr = text.replace(/[!！]/g, '');
                console.log(newStr)
                if (/規則/.test(newStr)) {
                    event.reply('this is test')
                }
                if (/^[+＋]1/.test(newStr)) {
                    const userData = await bot.getUserProfile(user_id);
                    let bodyData = new FormData();
                    bodyData.append('name', userData.displayName);
                    bodyData.append('date', '星期四');
                    bodyData.append('num', 4);
                    let res = await axios.post('https://script.google.com/macros/s/AKfycbyKonwRNLZ7TOOkczua8skdGW1Y--vpPlAxgWBg0Kek7E5wNLg/exec', bodyData, {
                        headers: bodyData.getHeaders(),
                    });
                    console.log(userData.displayName, res.config, res.data);
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