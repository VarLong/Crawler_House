const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../../config/config.json');
const db_client = require("../db/mongoDB_client");

router.route('/').get((req, res) => {
    res.render('pages/page_toutiao', { sess: req.session });
});

router.route('/lianjia_new_details').get((req, res) => {
    if(!fs.existsSync(config.lianjia.new_house.outputPath)){
        fs.writeFile(config.lianjia.new_house.outputPath);
    }
    const results = JSON.parse(fs.readFileSync(config.lianjia.new_house.outputPath));
    db_client.updateDetails("lianjia_new_details", results, () => {
        res.send(JSON.stringify(results));
    });
});

router.route('/lianjia_er_details').get((req, res) => {
    const results = JSON.parse(fs.readFileSync(config.lianjia.er_house.outputPath));
    res.send(JSON.stringify(results));
});

router.route('/db_details').get((req, res) => {
    db_client.getDetails("lianjia_new_details", (collections) => {
        res.send(JSON.stringify(collections));
    });
});

module.exports = router;