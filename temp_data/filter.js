const fs = require('fs');
const folderPath = './temp_data/';

const results = JSON.parse(fs.readFileSync(folderPath + 'Tj_ghj.json'));
const objItem = {};
const objKeys = {
    "bh": "滨海新区",
    "tjs": "天津市",
    "hb": "河北区",
    "nk": "南开区",
    "xq": "西青区",
    "dl": "东丽区",
    "jn": "津南区",
    "hx": "河西区",
    "nhq": "宁河区",
    "hd": "河东区",
    "bc": "北辰区",
    "bd": "宝坻区",
    "hp": "和平区",
    "hq": "红桥区",
    "jx": "蓟县",
    "nh": "宁河县",
    "all": "全部",
    "wq": "武清区",
    "jh": "静海县",
    "qt": "其他"
}

function outputTheResultByArea(items, needWriteFile) {
    items.forEach(item => {
        const itemLocation = item.location_area;
        let val = "qt";
        for (const key in objKeys) {
            if (objKeys[key] === itemLocation) {
                val = key;
            }
        }
        if (!objItem[val]) {
            objItem[val] = {
                name: objKeys[val],
                items: []
            }
        }
        objItem[val].items.push(item);
    });
    for (const key in objItem) {
        if (needWriteFile) {
            const fp = "./temp_data/area_" + key + ".json";
            fs.writeFileSync(fp, JSON.stringify(objItem[key].items));
        }
        console.log(`天津 ${key}: ${objItem[key].name} 批准地块 ${objItem[key].items.length}.`);
    }
};

function logByDateFeature(names, months) {
    const deadLine = '2019-12-29';
    const deadLine_year = parseInt(deadLine.split('-')[0]);
    const deadLine_month = parseInt(deadLine.split('-')[1]);
    const generateKey = (index) => {
        const allMonth = deadLine_year * 12 + deadLine_month;
        const a = allMonth - (index + 1) * months;
        const b = allMonth - index * months;
        return Math.floor(b / 12) + '-' + Math.ceil(b % 12) + '_' + Math.floor(a / 12) + '-' + (Math.ceil(a % 12) + 1);
    }
    let res = {};
    names.forEach((name) => {
        const temp_results = JSON.parse(fs.readFileSync(folderPath + 'area_' + name + '.json'));
        const obj = {};
        temp_results.forEach((item) => {
            const allowDate_year = parseInt(item.date_allow.split('-')[0]);
            const allowDate_month = parseInt(item.date_allow.split('-')[1]);
            const index = parseInt(((deadLine_year * 12 + deadLine_month) - (allowDate_year * 12 + allowDate_month)) / months);
            const key = 'date_' + index;
            if (obj[key]) {

            } else {
                obj[key] = {
                    name: generateKey(index),
                    items: []
                }
            }
            obj[key].items.push(item);

        });
        res[name] = {
            area_name: objKeys[name],
            result: obj
        }
        console.log(`${objKeys[name]} 每 ${months} 个月地块批准数量：`);
        for (const key in obj) {
            const ele = obj[key];
            console.log(`${ele.name} ： ${ele.items.length}`);
            const nameLists = [];
            ele.items.forEach((item) => {
                if (nameLists.indexOf(item.name) < 0) {
                    nameLists.push(item.date_allow + ' | ' + item.name + ' | ' + item.size + '平米' + ' | ' + item.provider + '\n');
                }
            })
            console.log(`地块名字：${nameLists.join(' --> ')}`);
        }
    });
}

// output the details in different files.
// outputTheResultByArea(results, true);


//
logByDateFeature(['bc'], 3);







