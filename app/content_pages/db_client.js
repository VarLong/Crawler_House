const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config.json');
const mongoDbUrl = config["mongoDbUrl"];

module.exports = {
    getCollections: function (callback) {
        MongoClient.connect(mongoDbUrl, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                console.log("connect Error!", err);
                return;
            };
            const dbase = db.db("House_Details");
            dbase.listCollections().toArray(function (err, items) {
                if (items && items.length > 0) {
                    console.log(JSON.stringify(items));
                }
                callback(items);
            });
        });
    },

    createCollection: function (name, callback) {
        MongoClient.connect(mongoDbUrl, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                console.log("connect Error!", err);
                return;
            };
            const dbase = db.db("House_Details");
            const dbcollection = dbase.collection(name);
        });
    },

    updateDetails: function (name, items, callback) {
        MongoClient.connect(mongoDbUrl, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                console.log("connect Error!", err);
                return;
            };
            const dbase = db.db("House_Details");
            const collectionDB = dbase.collection(name);
            const detailInfo = {
                'title': name,
                'last_update': new Date().getTime(),
                'items': items
            }
            collectionDB.deleteMany({}, (derr, eres) => {
                collectionDB.insertOne(detailInfo, (ierr, ires) => {
                    callback();
                });
            });
        });
    },

    getDetails: function (name, callback) {
        MongoClient.connect(mongoDbUrl, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                console.log("connect Error!", err);
                return;
            };
            const dbase = db.db("House_Details");
            const collectionDB = dbase.collection(name).find({}).toArray((err, results) => {
                console.log(results);
                callback(results);
            });

        });

    },

}




