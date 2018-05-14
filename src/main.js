

const
    config = require("../config"),    
    linebot = require("linebot"),
    express = require("express"),
    app = express();

const bot = linebot({
    channelId: config.CHANNER_ID,
    channelSecret: config.CHANNEL_SECRET,
    channelAccessToken: config.ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.post("/", linebotParser);



app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port ", app.get("port"));
})