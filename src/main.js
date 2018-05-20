

const
    config = require("../config"),    
    linebot = require("linebot"),
    express = require("express"),
    app = express();
const {search_hot, check_ball} = require("./assets/search");


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
    if (/hot/.test(text.toLowerCase())) {
        let type = "";
        if (/!{2,}/.test(test)){
            type = "18+";
        }
        search_hot(type).then((data) => {
            console.log("data::",data);
            event.reply(data);
        })
    }
    else {
        //  event.reply(event.message.text).then(function (data) {
        //      console.log(data);
        //  });
    }
    if (/打球$/.test(text)) {
        let data = check_ball();
        event.reply(data);
    }
    if (/^nba/.test(text.toLowerCase())) {
        let search_date = text.sp
        search_nba().then((data) => {
            
        });
    }
});
app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port ", app.get("port"));
})