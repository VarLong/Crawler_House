const Crawler = require('crawler');
const temme = require('temme').default;
const _ = require('lodash');
const fs = require('fs');

const baseUrl = 'https://tj.fang.lianjia.com/loupan/';
const detailInfoFilePath = 'lianjia_new_details.json';


function deleteJsons() {
    if (fs.existsSync(detailInfoFilePath)) {
        fs.unlinkSync(detailInfoFilePath);
    }
}
function saveArray(filePath, list) {
    let f_list = [];
    if (fs.existsSync(filePath)) {
        f_list = JSON.parse(fs.readFileSync(filePath));
        if (Array.isArray(list)) {
            f_list = f_list.concat(list);
        } else {
            f_list.push(list);
        }
    }
    fs.writeFileSync(filePath, JSON.stringify(f_list));
};
function getDetailsItems(url) {
    url = url.replace('/loupan/', '') + 'xiangqing/';
    const crawler = new Crawler({
        maxConnections: 100,
        callback: function (error, res, done) {
            if (error) {
                return console.log(error);
            } else {
                const $ = res.$;
                const main_price = $('.big-left ul:nth-child(2) li:nth-child(2) span:nth-child(2)').text().trim();
                const main_location = $('.big-left ul:nth-child(2) li:nth-child(4) span:nth-child(2)').text().trim();
                const main_location_loupan = $('.big-left ul:nth-child(2) li:nth-child(5) span:nth-child(2)').text().trim();
                const main_developer = $('.big-left ul:nth-child(2) li:nth-child(7) span:nth-child(2)').text().trim();

                const item = {
                    main_price: main_price,
                    main_location: main_location,
                    main_location_loupan: main_location_loupan,
                    main_developer: main_developer
                }

                saveArray(detailInfoFilePath, item);
            }
            done(
                console.log(crawler.queueSize);
            );
        }
    });
    console.log(`record ${baseUrl}${url}`);
    crawler.queue(`${baseUrl}${url}`);
}
function getSimpleItems(url) {
    var crawler = new Crawler({
        maxConnections: 100,
        callback: function (error, res, done) {
            if (error) {
                return console.log(error);
            } else {
                let t_items = _.compact(temme(res.body, `[class="resblock-list-wrapper"] li [class="resblock-desc-wrapper"] [class="resblock-name"]@{a[href=$url]{$name}};`));
                t_items.forEach((item) => {
                    getDetailsItems(item.url);
                })
            }
            done();
        }
    });
    crawler.queue(`${baseUrl}${url}`);
}
function startCrowle() {
    const pageCrawler = new Crawler({
        maxConnections: 100,
        // 使用参数 rateLimit 启用慢速模式，两次请求之间会闲置 rateLimit 毫秒，而 maxConnections 将被强行修改为 1 。
        // rateLimit: 1000,

        // Number 请求失败后的重试次数 (默认为 3),
        // retries: 3,

        // Number 重试的默认等待时间，单位为毫秒 (默认为 10000).
        // retryTimeout: 1000,

        // 在每个请求处理完毕后将调用此回调函数
        callback: function (error, res, done) {
            if (error) {
                return console.log(`get LianJia pages error ${error}`);
            } else {
                var $ = res.$;
                const data_total_count = $(".page-box").attr('data-total-count')
                const pageCount = data_total_count % 10 > 0 ? Math.ceil(data_total_count / 10) : data_total_count / 10;
                deleteJsons();
                for (let index = 1; index <= pageCount; index++) {
                    getSimpleItems('pg' + index + '/');
                }
            }
            done();
        }
    });
    pageCrawler.queue(`${baseUrl}`);
}

startCrowle();

