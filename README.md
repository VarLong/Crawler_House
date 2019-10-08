# Crawler_House
Crawler_House crawler a web

    // "start": "nodemon --ignore node_modules/ --ignore public/",


// ----------------------------------------------------------------------------------------->
// 自定义参数
// var ccrawler2 = new Crawler({
//     callback: function (error, res, done) {
//         if (error) {
//             console.log(error);
//         } else {
//             var $ = res.$;
//             console.log($("title").text());
//             // 获取输入的自定义参数并打印。
//             console.log(res.options);
//         }
//         done();
//     }
// });

// ccrawler2.queue({
//     uri: "http://www.baidu.com",
//     parameter1: "value1",
//     parameter2: "value2",
//     parameter3: "value3"
// });

// ----------------------------------------------------------------------------------------->
// 处理原始返回数据
// 在爬取图片、PDF文档等二进制文件时，需要对服务器返回的原始数据进行处理，此时需通过指定 encoding 参数为 null 来禁止 Node-Crawler 将其转换为字节流，同时也需要将 jQuery 参数指定为 false 来禁止 DOM 元素提取。 下面是一个抓取图片并保存为本地图片的例子。

// var Crawler = require("crawler");
// var fs      = require("fs");

// var c = new Crawler({
//     encoding:null,
//     jQuery:false,// set false to suppress warning message.
//     callback:function(err, res, done){
//         if(err){
//             console.error(err.stack);
//         }else{
//             fs.createWriteStream(res.options.filename).write(res.body);
//         }

//         done();
//     }
// });

// c.queue({
//     uri:"https://nodejs.org/static/images/logos/nodejs-1920x1200.png",
//     filename:"nodejs-1920x1200.png"
// });

// 如果你想修改一些默认值，可以在构造 Crawler() 的时候配置相关的参数，此时的参数将在全局范围内生效。如果你只想对单个请求配置独立的参数，你可以在调用 queue() 函数时覆盖参数。

// Crawler 使用了 request 库，所以 Crawler 可供配置的参数列表是 request 库的参数列表的超集，即 request 库中所有的配置在 Crawler 中均适用。