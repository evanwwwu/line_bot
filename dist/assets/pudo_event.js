const axios = require("axios"),
      config = process.env.NODE_ENV === "development" ? require('../../config') : process.env,
      type_list = {
    "user": 1,
    "group": 2,
    "room": 3
};
const pig_btn = {
    "type": "button",
    "action": {
        "type": "postback",
        "label": "【三牲】怎麼挑？",
        "data": "select_pig"
    },
    "flex": 1,
    "margin": "xs",
    "height": "sm",
    "style": "primary",
    "color": "#cd9968",
    "gravity": "top"
},
      fruit_btn = {
    "type": "button",
    "action": {
        "type": "postback",
        "label": "【四果】怎麼選？",
        "data": "select_fruit"
    },
    "flex": 1,
    "margin": "xs",
    "height": "sm",
    "style": "primary",
    "color": "#cd9968",
    "gravity": "top"
},
      pudo_btn = {
    "type": "button",
    "action": {
        "type": "postback",
        "label": "普渡這些不能少",
        "data": "select_pudo"
    },
    "flex": 0,
    "margin": "xs",
    "height": "sm",
    "style": "primary",
    "color": "#cd9968",
    "gravity": "top"
},
      baybay_btn = {
    "type": "button",
    "action": {
        "type": "postback",
        "label": "拜拜要照規矩來",
        "data": "select_baybay"
    },
    "flex": 0,
    "margin": "xs",
    "height": "sm",
    "style": "primary",
    "color": "#cd9968",
    "gravity": "top"
},
      mv_btn = function (color) {
    color = color || "#b20101";
    return {
        "type": "button",
        "action": {
            "type": "uri",
            "label": "還是看不懂？那用唱的給你聽",
            "uri": "http://bit.ly/2KAHBVK"
        },
        "flex": 1,
        "margin": "xs",
        "height": "sm",
        "style": "primary",
        "color": color,
        "gravity": "top"
    };
},
      carrfour_btn = {
    "type": "button",
    "action": {
        "type": "uri",
        "label": "家樂福線上購物這裡去∼",
        "uri": "http://bit.ly/2OVz6Iq"
    },
    "flex": 0,
    "margin": "xs",
    "height": "sm",
    "style": "primary",
    "color": "#b20101",
    "gravity": "top"
},
      right_text = {
    "type": "text",
    "text": "往右還有喔→",
    "weight": "bold",
    "wrap": false,
    "color": "#0A00FF",
    "flex": 0,
    "size": "lg",
    "margin": "none",
    "align": "center",
    "gravity": "top"
};

const start_template = {
    "type": "flex",
    "altText": `拜拜就是這麼簡單啦，最詳盡的普渡教學，讓中元節勸拜專員-福媽，來教你`,
    "contents": {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/926e7987-b7a9-4385-9ccd-e737a1316256.jpg",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "fit",
            "margin": "none",
            "action": {
                "type": "postback",
                "data": "select_pig"
            }
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "text",
                "text": "拜拜就是這麼簡單啦",
                "weight": "bold",
                "wrap": false,
                "color": "#464646",
                "flex": 5,
                "size": "xl",
                "margin": "none",
                "align": "center",
                "gravity": "top"
            }, {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                    "type": "box",
                    "layout": "vertical",
                    "contents": [{
                        "type": "text",
                        "text": "最詳盡的普渡教學",
                        "weight": "regular",
                        "wrap": true,
                        "color": "#000000",
                        "flex": 0,
                        "size": "lg",
                        "margin": "none",
                        "align": "center",
                        "gravity": "top"
                    }, {
                        "type": "text",
                        "text": "讓中元節勸拜專員-福媽，來教你",
                        "weight": "bold",
                        "wrap": true,
                        "color": "#631919",
                        "flex": 6,
                        "size": "md",
                        "margin": "none",
                        "align": "center",
                        "gravity": "top"
                    }],
                    "flex": 1,
                    "spacing": "sm",
                    "margin": "md"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "lg"
            }],
            "flex": 1,
            "spacing": "none",
            "margin": "md"
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [pig_btn, fruit_btn, baybay_btn, pudo_btn, mv_btn()],
            "flex": 0,
            "spacing": "sm",
            "margin": "md"
        },
        "styles": {
            "header": {
                "backgroundColor": "#FFFFFF",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "hero": {
                "backgroundColor": "#ffffff",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "body": {
                "backgroundColor": "#ffffff",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "footer": {
                "backgroundColor": "#FFFFFF",
                "separator": false,
                "separatorColor": "#FFFFFF"
            }
        }
    }
};

const pig_template = function () {
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/be0cbb98-a77b-4180-9b51-65fe910d4186.jpg",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "margin": "none"
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "text",
                "text": "三牲是【雞】【豬】【魚】",
                "weight": "bold",
                "wrap": false,
                "color": "#464646",
                "flex": 1,
                "size": "lg",
                "margin": "none",
                "align": "center",
                "gravity": "top"
            }, {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                    "type": "box",
                    "layout": "baseline",
                    "contents": [{
                        "type": "text",
                        "text": "擺放位置：",
                        "weight": "bold",
                        "wrap": false,
                        "color": "#7e7e7e",
                        "flex": 3,
                        "size": "sm",
                        "margin": "none",
                        "align": "start",
                        "gravity": "top"
                    }, {
                        "type": "text",
                        "text": "三牲面向神明，雞在左，豬在中，魚在右",
                        "weight": "bold",
                        "wrap": true,
                        "color": "#505050",
                        "flex": 7,
                        "size": "sm",
                        "margin": "xs",
                        "align": "start",
                        "gravity": "top"
                    }],
                    "flex": 1,
                    "spacing": "sm",
                    "margin": "md"
                }, {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [{
                        "type": "text",
                        "text": "注意事項：",
                        "weight": "bold",
                        "wrap": false,
                        "color": "#7e7e7e",
                        "flex": 3,
                        "size": "sm",
                        "margin": "none",
                        "align": "start",
                        "gravity": "top"
                    }, {
                        "type": "text",
                        "text": "傳統上，可使用全豬或三層肉，雞和魚則多使用全雞和全魚，不建議使用牛羊等有角的動物來拜",
                        "weight": "bold",
                        "wrap": true,
                        "color": "#505050",
                        "flex": 7,
                        "size": "sm",
                        "margin": "none",
                        "align": "start",
                        "gravity": "top"
                    }],
                    "flex": 1,
                    "spacing": "sm",
                    "margin": "md"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "lg"
            }],
            "flex": 1,
            "spacing": "none",
            "margin": "md"
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [baybay_btn, pudo_btn, mv_btn(), carrfour_btn],
            "flex": 0,
            "spacing": "sm",
            "margin": "md"
        },
        "styles": {
            "header": {
                "backgroundColor": "#FFFFFF",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "hero": {
                "backgroundColor": "#ffffff",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "body": {
                "backgroundColor": "#ffffff",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "footer": {
                "backgroundColor": "#FFFFFF",
                "separator": false,
                "separatorColor": "#FFFFFF"
            }
        }
    };
};
const fruit_template = function () {
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/8dd6fbb3-f8ed-45d1-92af-ae54f100d2b9.jpg",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "margin": "none"
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "text",
                "text": "四果是【四季時令水果】",
                "weight": "bold",
                "wrap": false,
                "color": "#464646",
                "flex": 1,
                "size": "lg",
                "margin": "none",
                "align": "center",
                "gravity": "top"
            }, {
                "type": "box",
                "layout": "vertical",
                "contents": [{
                    "type": "box",
                    "layout": "baseline",
                    "contents": [{
                        "type": "text",
                        "text": "水果數量：",
                        "weight": "bold",
                        "wrap": false,
                        "color": "#7e7e7e",
                        "flex": 3,
                        "size": "sm",
                        "margin": "none",
                        "align": "start",
                        "gravity": "top"
                    }, {
                        "type": "text",
                        "text": "準備四種當季水果，種類不限，但每種類的水果個數要以三個、五個等奇數的數目",
                        "weight": "bold",
                        "wrap": true,
                        "color": "#505050",
                        "flex": 7,
                        "size": "sm",
                        "margin": "xs",
                        "align": "start",
                        "gravity": "top"
                    }],
                    "flex": 1,
                    "spacing": "sm",
                    "margin": "md"
                }, {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [{
                        "type": "text",
                        "text": "注意事項：",
                        "weight": "bold",
                        "wrap": false,
                        "color": "#7e7e7e",
                        "flex": 3,
                        "size": "sm",
                        "margin": "none",
                        "align": "start",
                        "gravity": "top"
                    }, {
                        "type": "text",
                        "text": "香蕉、李子與梨子不能一起拜，因為台語發音是「招、你、來」可別把好兄弟請進家門了",
                        "weight": "bold",
                        "wrap": true,
                        "color": "#505050",
                        "flex": 7,
                        "size": "sm",
                        "margin": "none",
                        "align": "start",
                        "gravity": "top"
                    }],
                    "flex": 1,
                    "spacing": "sm",
                    "margin": "md"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "lg"
            }],
            "flex": 1,
            "spacing": "none",
            "margin": "md"
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [baybay_btn, pudo_btn, mv_btn(), carrfour_btn],
            "flex": 0,
            "spacing": "sm",
            "margin": "md"
        },
        "styles": {
            "header": {
                "backgroundColor": "#FFFFFF",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "hero": {
                "backgroundColor": "#ffffff",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "body": {
                "backgroundColor": "#ffffff",
                "separator": false,
                "separatorColor": "#FFFFFF"
            },
            "footer": {
                "backgroundColor": "#FFFFFF",
                "separator": false,
                "separatorColor": "#FFFFFF"

            }
        }
    };
};
const baybay_template = [{
    "type": "bubble",
    "hero": {
        "type": "image",
        "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/221276b7-e004-4ee9-9672-d219bc46bdf2.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "margin": "none"
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "拜拜要照規矩來 – 祝禱文",
            "weight": "bold",
            "wrap": false,
            "color": "#464646",
            "flex": 1,
            "size": "lg",
            "margin": "none",
            "align": "center",
            "gravity": "top"
        }, {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "內　容：",
                    "weight": "bold",
                    "wrap": false,
                    "color": "#7e7e7e",
                    "flex": 2,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "今日中華民國XX年XX月XX日良辰吉日，弟子______特地準備三牲、水果及金銀財寶，恭請觀世音菩薩、普渡公作主主持普渡，願四方好兄弟們，吃飽飽、歡喜滿意、一切順利",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "xs",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }],
            "flex": 1,
            "spacing": "sm",
            "margin": "lg"
        }],
        "flex": 1,
        "spacing": "none",
        "margin": "md"
    },
    "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [right_text, pig_btn, fruit_btn, pudo_btn, mv_btn()],
        "flex": 0,
        "spacing": "sm",
        "margin": "md"
    },
    "styles": {
        "header": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "hero": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "body": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "footer": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        }
    }

}, {
    "type": "bubble",
    "hero": {
        "type": "image",
        "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/b349fc23-1a00-4675-9d23-b4eb689b4b31.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "margin": "none"
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "拜拜要照規矩來拜拜步驟",
            "weight": "bold",
            "wrap": false,
            "color": "#464646",
            "flex": 0,
            "size": "lg",
            "margin": "none",
            "align": "center",
            "gravity": "top"
        }, {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "box",
                "layout": "vertical",
                "contents": [{
                    "type": "text",
                    "text": "拜拜這樣做：",
                    "weight": "bold",
                    "wrap": false,
                    "color": "#7e7e7e",
                    "flex": 3,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "1. 點3炷黃香、再念普渡祈福祝禱文",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "2. 插香於香爐且酒杯倒滿1/3杯，再燒經衣金紙",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 0,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "3. 點3炷黃香祭祀後再倒1/3杯，並燒獻予神佛之金紙",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 0,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "4. 點一把黑香祭祀後再倒最後1/3杯，將黑香插於各供品，最後再燒金紙給好兄弟",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 0,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "5. 將香爐上黃香、中間酒杯順時針倒入神佛金爐桶",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 0,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "6. 第二杯酒順時針倒於神佛金爐桶外側",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 0,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "7. 第三杯酒順時針倒於好兄弟金爐桶",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 0,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "center"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }],
            "flex": 1,
            "spacing": "sm",
            "margin": "lg"
        }],
        "flex": 1,
        "spacing": "none",
        "margin": "md"
    },
    "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [right_text, pig_btn, fruit_btn, pudo_btn, mv_btn()],
        "flex": 0,
        "spacing": "sm",
        "margin": "md"
    },
    "styles": {
        "header": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "hero": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "body": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "footer": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        }
    }
}, {
    "type": "bubble",
    "hero": {
        "type": "image",
        "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/136660de-f99c-4cd8-9e73-59f450b3b6a6.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "margin": "none"
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "拜拜要照規矩來 – 注意事項",
            "weight": "bold",
            "wrap": false,
            "color": "#464646",
            "flex": 0,
            "size": "lg",
            "margin": "none",
            "align": "center",
            "gravity": "top"
        }, {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "box",
                "layout": "vertical",
                "contents": [{
                    "type": "text",
                    "text": "※香爐上的黃香燒完可隨時補插，依各家燃燒狀況而不同\n\n※教學(2)(3)(4)之3次燒金紙的祭祀間隔，依各家燃燒狀況自由調配\n\n※神佛金紙與好兄弟金紙之香爐桶需分開\n\n※酒杯倒法：順時針(衰運帶出)、逆時針(福氣帶入)皆可",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "xs",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }],
            "flex": 1,
            "spacing": "sm",
            "margin": "lg"
        }],
        "flex": 1,
        "spacing": "none",
        "margin": "md"
    },
    "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [pig_btn, fruit_btn, pudo_btn, mv_btn(), carrfour_btn],
        "flex": 0,
        "spacing": "sm",
        "margin": "md"
    },
    "styles": {
        "header": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "hero": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "body": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "footer": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        }
    }
}];
const pudo_template = [{
    "type": "bubble",
    "hero": {
        "type": "image",
        "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/5469cee1-50fe-4c29-8ff7-1431edfe2afe.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "margin": "none"
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "普渡這些不能少",
            "weight": "bold",
            "wrap": false,
            "color": "#464646",
            "flex": 1,
            "size": "lg",
            "margin": "none",
            "align": "center",
            "gravity": "top"
        }, {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "打理儀容篇：",
                    "weight": "bold",
                    "wrap": false,
                    "color": "#7e7e7e",
                    "flex": 4,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "準備臉盆(裝半盆水)及毛巾、牙刷、牙膏、漱口杯，讓好兄弟擦洗乾淨",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "xs",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }, {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "酒　水　篇：",
                    "weight": "bold",
                    "wrap": false,
                    "color": "#7e7e7e",
                    "flex": 4,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "準備三個小酒杯，以米酒或清水為主，酒水不可一次倒滿，請看拜拜要照規矩來",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }],
            "flex": 1,
            "spacing": "sm",
            "margin": "lg"
        }],
        "flex": 1,
        "spacing": "none",
        "margin": "md"
    },
    "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [right_text, pig_btn, fruit_btn, baybay_btn, mv_btn()],
        "flex": 0,
        "spacing": "sm",
        "margin": "md"
    },
    "styles": {
        "header": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "hero": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "body": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "footer": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        }
    }

}, {
    "type": "bubble",
    "hero": {
        "type": "image",
        "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/5b3ad181-21b0-4bee-ab76-ab9804ed3b4d.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "margin": "none"
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "普渡這些不能少",
            "weight": "bold",
            "wrap": false,
            "color": "#464646",
            "flex": 1,
            "size": "lg",
            "margin": "none",
            "align": "center",
            "gravity": "top"
        }, {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "紙　錢　篇：",
                    "weight": "bold",
                    "wrap": false,
                    "color": "#7e7e7e",
                    "flex": 4,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "不同祭祀對象須使用不同的紙錢，神明須用天金或太極金，祖先和地基主使用刈金和銀紙，好兄弟使用小銀及更衣",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "xs",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }, {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "*「更衣」要分飯前（插香後）與飯後（拜拜禮成）兩次使用",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#aaaaaa",
                    "flex": 4,
                    "size": "xxs",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }],
            "flex": 1,
            "spacing": "sm",
            "margin": "lg"
        }],
        "flex": 1,
        "spacing": "none",
        "margin": "md"
    },
    "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [right_text, pig_btn, fruit_btn, baybay_btn, mv_btn()],
        "flex": 0,
        "spacing": "sm",
        "margin": "md"
    },
    "styles": {
        "header": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "hero": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "body": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "footer": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        }
    }
}, {
    "type": "bubble",
    "hero": {
        "type": "image",
        "url": "https://friendoprod.blob.core.windows.net/missionpics/EDM/20180803/778e95a1-7196-4e32-8e3e-e48e856e691e.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "margin": "none"
    },
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [{
            "type": "text",
            "text": "普渡這些不能少",
            "weight": "bold",
            "wrap": false,
            "color": "#464646",
            "flex": 1,
            "size": "lg",
            "margin": "none",
            "align": "center",
            "gravity": "top"
        }, {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "零　食　篇：",
                    "weight": "bold",
                    "wrap": false,
                    "color": "#7e7e7e",
                    "flex": 4,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "家樂福買一些愛吃的東西，如：糕餅、餅乾、罐頭、泡麵..等(不可偷吃)",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "xs",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }, {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                    "type": "text",
                    "text": "鮮　花　篇：",
                    "weight": "bold",
                    "wrap": false,
                    "color": "#7e7e7e",
                    "flex": 4,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }, {
                    "type": "text",
                    "text": "以氣味清香的花材為佳，須要使用全開的花朵，不可使用假花、乾燥花",
                    "weight": "bold",
                    "wrap": true,
                    "color": "#505050",
                    "flex": 7,
                    "size": "sm",
                    "margin": "none",
                    "align": "start",
                    "gravity": "top"
                }],
                "flex": 1,
                "spacing": "sm",
                "margin": "md"
            }],
            "flex": 1,
            "spacing": "sm",
            "margin": "lg"
        }],
        "flex": 1,
        "spacing": "none",
        "margin": "md"
    },
    "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [pig_btn, fruit_btn, baybay_btn, mv_btn(), carrfour_btn],
        "flex": 0,
        "spacing": "sm",
        "margin": "md"
    },
    "styles": {
        "header": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "hero": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "body": {
            "backgroundColor": "#ffffff",
            "separator": false,
            "separatorColor": "#FFFFFF"
        },
        "footer": {
            "backgroundColor": "#FFFFFF",
            "separator": false,
            "separatorColor": "#FFFFFF"
        }
    }
}];

function start_event(event) {
    post_log(event, "普渡教學");
    event.reply(start_template);
}

function pig_event(event) {
    post_log(event, "三牲教學");
    let new_pig = pig_template();
    new_pig.footer.contents.unshift(right_text);
    let carousel = {
        "type": "flex",
        "altText": "普渡教學，龍總工吼你災",
        "contents": {
            "type": "carousel",
            "contents": [new_pig, fruit_template()]
        }
    };
    event.reply(carousel);
}

function fruit_event(event) {
    post_log(event, "四果教學");
    let new_fruit = fruit_template();
    new_fruit.footer.contents.unshift(right_text);
    let carousel = {
        "type": "flex",
        "altText": "普渡教學，龍總工吼你災",
        "contents": {
            "type": "carousel",
            "contents": [new_fruit, pig_template()]
        }
    };
    event.reply(carousel);
}

function baybay_event(event) {
    post_log(event, "拜拜教學");
    let carousel = {
        "type": "flex",
        "altText": "普渡教學，龍總工吼你災",
        "contents": {
            "type": "carousel",
            "contents": baybay_template
        }
    };
    event.reply(carousel).then(data => {
        console.log(data);
    });
}

function pudo_event(event) {
    post_log(event, "普渡不能少");
    let carousel = {
        "type": "flex",
        "altText": "普渡教學，龍總工吼你災",
        "contents": {
            "type": "carousel",
            "contents": pudo_template
        }
    };
    event.reply(carousel).then(data => {
        console.log(data);
    });
}

function post_log(event, word) {
    let MG_id = event.source.roomId || event.source.groupId;
    axios.post(config.apiUrl + '/chat', {
        lineId: event.source.userId,
        roomGroupId: MG_id,
        type: type_list[event.source.type],
        chat: "pudo_method",
        words: [`$${word}`]
    });
}
module.exports = {
    start_event: start_event,
    pig_event: pig_event,
    fruit_event: fruit_event,
    baybay_event: baybay_event,
    pudo_event: pudo_event,
    start_template: start_template
};