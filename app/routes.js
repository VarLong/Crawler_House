const express = require('express');
const main_crawler = require("./schedule_task/main_crawler");
// create our router object
const router = express.Router();

router.use(express.static('public'));
router.use(express.static('views'));
router.use(express.static('app'));

router.use(function (request, response, next) {
    const url = request.url;
    next();
});

// console.log(main_crawler);
// main_crawler.lianjiaCrawler.startCrowle();
router.route('/').get((req, res) => {
    res.render('home', { sess: req.session });
});

const lianjia = require('./content_pages/lianjia');
router.use('/lianjia', lianjia);

module.exports = router;