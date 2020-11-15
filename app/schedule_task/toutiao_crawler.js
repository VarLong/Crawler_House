const Crawler = require('crawler')
const temme = require('temme').default
const _ = require('lodash')
const config = require('../../config/config.json')
const webdriver = require('selenium-webdriver')
require('chromedriver')
const ToutiaoConfig = {
  baseUrl: config.toutiao.baseUrl,
  searchUrl: config.toutiao.searchUrl,
  outputPath: config.toutiao.outputPath
}

module.exports = {
  Node_Crawler: {
    init: function () {},
    getItemDetails: function (item) {
      _this = this
      const crawler = new Crawler({
        maxConnections: 100,
        callback: function (error, res, done) {
          if (error) {
            return console.log(error)
          } else {
            const $ = res.$
            const main_openDate = $('.article-content')
              .text()
              .trim()
            item['content'] = main_openDate
          }
          done(() => {
            console.log('getItemDetails done!')
            return itme
          })
        }
      })
      crawler.queue(`${_this.baseUrl}${item.url}`)
    },

    startCrowleBySearch (searchString) {
      this.init()
      const _this = this
      const results = []
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
            return console.log(`Search TOUTIAO ERROR: ${error}`)
          } else {
            const $ = res.$
            const default_count = 20
            deleteJsons(_this.outputPath)
            console.log(res.statusCode)
            console.log(res.body)
            while (
              $(`.sections .articleCard:nth-child(1) .title-box`).textContent
            ) {
              for (let index = 1; index < default_count; index++) {
                let item = {}
                item['title'] = $(
                  `.sections .articleCard:nth-child(${index}) .title-box`
                ).textContent
                item['url'] = $(
                  `.sections .articleCard:nth-child(${index}) .title-box .link`
                ).textContent
                itme = _this.getItemDetails(item)
                results.push(item)
              }
            }
            console.log(results)
          }
          done(console.log('startCrowleBySearch done!'))
        }
      })
      console.log(`${_this.searchUrl}${searchString}`)
      pageCrawler.queue(`${_this.searchUrl}${searchString}`)
    }
  },
  WeberDriver_Crawler: {
    startCrowleBySearch (searchString) {
      _this = this
      let driver = new webdriver.Builder().forBrowser('chrome').build()
      console.log(`${ToutiaoConfig.searchUrl}${searchString}`)
      driver.get(`${ToutiaoConfig.searchUrl}${searchString}`);
      driver.wait(()=>{return webdriver.By.css(`.sections .articleCard:nth-child(1) .title-box`)}, 10000)
      driver.findElement(webdriver.By.css(`.logo-wrap`)).textContent
      driver.findElement(webdriver.By.css(`.sections .articleCard`)).textContent
    }
  }
}
