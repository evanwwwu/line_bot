const
    request = require("request"),
    express = require("express"),
    cheerio = require("cheerio"),
    bodyParser = require('body-parser'),
    Nightmare = require("nightmare"),
    // line = require("@line/bot-sdk"),
    line = require('node-line-bot-api'),
    app = express();

const nightmare = Nightmare({
    show:false,
    horizontalFlag:false
});

const config = {
        accessToken:"ZApDtRwq0jFWAmd3eUyLie4OrhHYSUzG2uIj7t+RwnxdSrh2LWMfKY62fAp5HmCmM/p0eESkxxteyMFKdvI7kQpZYAYWyX8hGGO2FliM+VLSkOxEG0NJGI5dQn3efIXlm1gk/6YYciN7p/OJ+dGyeAdB04t89/1O/w1cDnyilFU=",
        channelSecret:"7fd05c4dab08536aa4f59dafc2b0c30c"
    };
line.init(config);

const nightmareHelper = require("nightmare-helper");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// nightmareHelper.googleImages("正妹")
// .then(function(e){
//     console.log(e.length);
// });


app.post('/webhook/', function(req, res, next) {
    console.log(321);
    res.send("KO;")
    // console.log( line.validator.validateSignature())
    // Promise
    //     .all(req.body.events.map(handleEvent))
    //     .then((result) => res.json(result))
    //     .catch((err) => {
    //     console.error(err);
    //     res.status(500).end();
    //     });const promises = req.body.events.map(event => {
    // reply message
//     return line.client
//       .replyMessage({
//         replyToken: event.replyToken,
//         messages: [
//           {
//             type: 'text',
//             text: event.message.text
//           }
//         ]
//       })
//   })
//   Promise
//     .all(promises)
//     .then(() => res.json({success: true}))
});


// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}





app.set('port', (process.env.PORT || 5002));
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});
