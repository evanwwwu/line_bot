

const
    config = require("../config"),    
    linebot = require("linebot"),
    express = require("express"),
    app = express();
const {
    search_hot
} = require("./assets/search");
const bot = linebot({
    channelId: config.CHANNER_ID,
    channelSecret: config.CHANNEL_SECRET,
    channelAccessToken: config.ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.post("/", linebotParser);

bot.on('message', function (event) {
    console.log(event);
    const { type, text } = event.message;
   
    if (/^hot/.test(text)) {
        search_hot().then((data) => {
            console.log("data::",data);
            event.reply(data);
        })
    }
    else {
        //  event.reply(event.message.text).then(function (data) {
        //      console.log(data);
        //  });
    }
});

app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port ", app.get("port"));
})