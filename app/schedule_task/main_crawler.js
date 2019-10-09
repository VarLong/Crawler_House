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
    lianjia_new_Crawler: any = {
        lianjia_baseUrl: undefined,
        lianjia_outputPath: undefined,
        init: function () {
            this.lianjia_baseUrl = config.lianjia.new_house.baseUrl;
            this.lianjia_outputPath = config.lianjia.new_house.outputPath;
        },
        getItemDetails1: function (url) {
            const _this = this;
            let item = {};
            url = url.replace('/loupan/', '');
            const loupanURL = this.lianjia_baseUrl + url.replace('/loupan/', '');
            const crawler = new Crawler({
                maxConnections: 100,
                callback: function (error, res, done) {
                    if (error) {
                        return console.log(error);
                    } else {
                        const $ = res.$;
                        const main_openDate = $('.box-left .box-left-bottom .bottom-info .when span:nth-child(3)').text().trim();

                        item = {
                            main_openDate: main_openDate
                        }
                        _this.getItemDetails2(loupanURL, item)
                    }
                    done(() => {
                    }
                    );
                }
            });
            crawler.queue(loupanURL);
        },

        getItemDetails2: function (url, item) {
            const _this = this;
            url = url + 'xiangqing/';
            const crawler = new Crawler({
                maxConnections: 100,
                callback: function (error, res, done) {
                    if (error) {
                        return console.log(error);
                    } else {
                        const $ = res.$;
                        item['main_price'] = $('.big-left ul:nth-child(2) li:nth-child(2) span:nth-child(2)').text().trim();
                        item['main_location'] = $('.big-left ul:nth-child(2) li:nth-child(4) span:nth-child(2)').text().trim();
                        item['main_location_loupan'] = $('.big-left ul:nth-child(2) li:nth-child(5) span:nth-child(2)').text().trim();
                        item['main_location_sale'] = $('.big-left ul:nth-child(2) li:nth-child(6) span:nth-child(2)').text().trim();
                        item['main_developer'] = $('.big-left ul:nth-child(2) li:nth-child(7) span:nth-child(2)').text().trim();
                        saveArray(_this.lianjia_outputPath, item);
                    }
                    done(() => {
                    }
                    );
                }
            });
            crawler.queue(url);
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
                            _this.getItemDetails1(item.url);
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
                        console.log(`get the pageCount: ${pageCount}`);
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

    lianjia_er_Crawler: any = {
        lianjia_baseUrl: undefined,
        lianjia_outputPath: undefined,
        parts: [''],
        init: function () {
            this.lianjia_baseUrl = config.lianjia.er_house.baseUrl;
            this.lianjia_outputPath = config.lianjia.er_house.outputPath;
            this.parts = config.lianjia.er_house.parts
        },
        getItemDetails1: function (url) {
            const _this = this;
            const ershoufangURL = this.lianjia_baseUrl + url;
            const crawler = new Crawler({
                maxConnections: 100,
                callback: function (error, res, done) {
                    if (error) {
                        return console.log(error);
                    } else {
                        const $ = res.$;
                        const main_title = $('.sellDetailHeader .title-wrapper .content .title .main').text().trim();
                        const main_favCount = parseInt($('.sellDetailHeader .title-wrapper .content .btnContainer #favCount').text().trim());
                        const main_totalPrice = $('.overview .content .price .total').text().trim() + '万';
                        const main_unitPrice = $('.overview .content .price .unitPrice .unitPriceValue').text().trim();

                        const item = {
                            main_title: main_title,
                            main_favCount: main_favCount,
                            main_totalPrice: main_totalPrice,
                            main_unitPrice: main_unitPrice
                        }
                        saveArray(_this.lianjia_outputPath, item);
                    }
                    done(() => { }
                    );
                }
            });
            crawler.queue(ershoufangURL);
        },

        getSimpleItems: function (url) {
            const _this = this;
            var crawler = new Crawler({
                maxConnections: 100,
                callback: function (error, res, done) {
                    if (error) {
                        return console.log(error);
                    } else {
                        let t_items = [];
                        const $ = res.$;
                        const dom_items = $(".sellListContent li");
                        for (const index in dom_items) {
                            if (index === '0' || parseInt(index)) {
                                const temp_dom_id = $(`.sellListContent li:nth-child(${parseInt(index) + 1})`).attr("data-lj_action_housedel_id");
                                const temp_dom_name = $(`.sellListContent li:nth-child(${parseInt(index) + 1}) .info .title a`).text();
                                t_items.push({
                                    id: temp_dom_id,
                                    url: temp_dom_id + '.html',
                                    name: temp_dom_name
                                });
                            }
                        }
                        t_items.forEach((item) => {
                            _this.getItemDetails1(item.url);
                        });
                    }
                    done();
                }
            });
            crawler.queue(url);
        },

        startCrowlePart(partUrl) {
            this.init();
            const _this = this;
            const crowUrl = this.lianjia_baseUrl + partUrl;
            const pageCrawler = new Crawler({
                maxConnections: 100,
                callback: function (error, res, done) {
                    if (error) {
                        return console.log(`get LianJia pages error ${error}`);
                    } else {
                        const $ = res.$;
                        const s = $(".contentBottom .page-box .house-lst-page-box").attr('page-data');
                        const pageCount = JSON.parse(s).totalPage;
                        deleteJsons(_this.lianjia_outputPath);
                        for (let index = 1; index <= pageCount; index++) {
                            _this.getSimpleItems(crowUrl + 'pg' + index + '/');
                        }
                    }
                    done();
                }
            });
            pageCrawler.queue(crowUrl);
        }
    },

    julixinjiaCrawler: any = {

    }
}

