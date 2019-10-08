const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../../config/config.json');

router.route('/').get((req, res) => {
    res.render('pages/page_lianjia', { sess: req.session });
});

router.route('/lianjia_new_details').get((req, res) => {
    const results = JSON.parse(fs.readFileSync(config.lianjia.new_house.outputPath));
    res.send(JSON.stringify(results));
});

module.exports = router;