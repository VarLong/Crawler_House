const Crawler = require('crawler');
const temme = require('temme').default;
const _ = require('lodash');
const fs = require('fs');
const config = require('../../config/config.json');

function deleteJsons(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

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
}


module.exports = {
    lianjiaCrawler: any = {
        lianjia_baseUrl: undefined,
        lianjia_outputPath: undefined,
        init: function () {
            this.lianjia_baseUrl = config.lianjia.new_house.baseUrl;
            this.lianjia_outputPath = config.lianjia.new_house.outputPath;
        },

        getDetailsItems: function (url) {
            const _this = this;
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
                        saveArray(_this.lianjia_outputPath, item);
                    }
                    done(()=>{

                        console.log('done');
                    }
                    );
                }
            });
            console.log(`crawler ${this.lianjia_baseUrl}${url}`);
            crawler.queue(`${this.lianjia_baseUrl}${url}`);
        },

        getSimpleItems: function (url) {
            const _this = this;
            var crawler = new Crawler({
                maxConnections: 100,
                callback: function (error, res, done) {
                    if (error) {
                        return console.log(error);
                    } else {
                        let t_items = _.compact(temme(res.body, `[class="resblock-list-wrapper"] li [class="resblock-desc-wrapper"] [class="resblock-name"]@{a[href=$url]{$name}};`));
                        t_items.forEach((item) => {
                            _this.getDetailsItems(item.url);
                        })
                    }
                    done();
                }
            });
            crawler.queue(`${this.lianjia_baseUrl}${url}`);
        },

        startCrowle() {
            this.init();
            const _this = this;
            console.log(this);
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
                        deleteJsons(_this.lianjia_outputPath);
                        for (let index = 1; index <= pageCount; index++) {
                            _this.getSimpleItems('pg' + index + '/');
                        }
                    }
                    done();
                }
            });
            pageCrawler.queue(`${this.lianjia_baseUrl}`);
        }
    },

    julixinjiaCrawler: any = {

    }
}

