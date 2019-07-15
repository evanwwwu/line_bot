const Jieba = require("./assets/jieba.js");
const jieba = new Jieba();
const asyncWorker = (num) => {
    console.log("x"+num)
    return num;
};

function main() {
    // 問題不知為何 [1, 2, 3, 4] 會在最後才呈現
    console.log("main:");
    [1, 2, 3, 4].map(async (data) => {

        let x = await asyncWorker(data);
        console.log(x + 1);
    });

    console.log("is ok");

    [4, 5, 6].map((data) => {
        console.log(data);
    });
    console.log("main end")
}

async function main2() {
    // 目的: 確定node為單執行緒
    console.log("main2:");
        [10, 11, 12, 13].map((data) => {
            var ms = 300 + new Date().getTime();
            while (new Date() < ms) { }
            console.log(data + 1);
        });
    
        console.log("is ok");
    
        [14, 15, 16].map((data) => {
            console.log(data);
        });
    console.log("main2 end");
}

// var a;
// async function x() {
//     const arr = [9, 8, 7, 6];
//     for (var index in arr) {
//         // var ms = 500 + new Date().getTime();
//         // while (new Date() < ms) { }
//         a = arr[index];
//     }
//     console.log(a);
//     return "done";
// }

// x().then((data) => {
//     console.log(data);
// })
// arr.map((obj) => {
//     a += obj;
//     // var ms = 500 + new Date().getTime();
//     // while (new Date() < ms) { }
//     // console.log("1")
//     // a++;
// })

jieba.test("升職加薪，當上CEO，走上人生巔峰區塊鏈，巴加酒").then((result) => {
    console.log(result);
})
if (/^post$/.test(text)) {
    let sendData = {
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Menu",
            "text": "Please select",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                },
                {
                    "type": "datetimepicker",
                    "label": "Select date",
                    "data": "storeId=12345",
                    "mode": "datetime",
                    "initial": "2017-12-25t00:00",
                    "max": "2018-01-24t23:59",
                    "min": "2017-12-25t00:00"
                }
            ]
        }
    };
    event.reply(sendData);
}