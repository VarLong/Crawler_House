const express = require('express');
const TouTiao_Crawler = require('./schedule_task/toutiao_crawler');
// create our router object
const router = express.Router();

router.use(express.static('public'));
router.use(express.static('views'));
router.use(express.static('app'));

router.use(function (request, response, next) {
    const url = request.url;
    next();
});

 TouTiao_Crawler.WeberDriver_Crawler.startCrowleBySearch("covid");
// main_crawler.lianjia_er_Crawler.startCrowlePart('xiqing/');

router.route('/').get((req, res) => {
    console.log('home page get!')
    res.render('home', { sess: req.session });
});

const toutiao = require('./routes/Toutiao');
router.use('/toutiao', toutiao);

module.exports = router;