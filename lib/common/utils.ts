///<reference path='../../typings/tsd.d.ts' />

const fse = require("fs-extra");
const JSON5 = require("json5");

function pad(n: number): string {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
}

module.exports = {

    initTempData: function (filePath: string) {
        fse.writeFileSync(filePath, JSON.stringify([]));
    },

    saveTempData: function (list: any) {
        const filePath = "./temp_data/Tj_ghj.json";
        let f_list = [];
        f_list = JSON.parse(fse.readFileSync(filePath));
        if (Array.isArray(list)) {
            f_list = f_list.concat(list);
        } else {
            f_list.push(list);
        }
        fse.writeFileSync(filePath, JSON.stringify(f_list));
    },

    saveData: function (filePath: string, list: any) {
        const fp = "./temp_data/" + filePath;
        fse.writeFileSync(fp, JSON.stringify(list));
    },

    // Load .js, .json, or .json5 file, or die trying.
    checkConfigPath: function (pathname: string) {
        try {
            return JSON5.parse(fse.readFileSync(pathname).toString());
        } catch (err) {
            console.error(`Error loading config ${pathname} ${err}`);
            process.exit(9);
        }
    },

    formattedTimestamp: function () {
        const d = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
        return "[" + [d.getDate(), months[d.getMonth()], time].join(" ") + "] ";
    },

    checkUrl: function (url: string) {
        const expFormat = "^((https|http|ftp|rtsp|mms)://)"
            + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}"
            + "|"
            + "([0-9a-z_!~*'()-]+\.)*"
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."
            + "[a-z]{2,6})"
            + "(:[0-9]{1,4})?"
            + "((/?)|"
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

        const regExp = new RegExp(expFormat);
        if (regExp.test(url) === true) {
            return true;
        } else {
            return false;
        }
    },

    createDir: function (path: string) {
        fse.mkdirsSync(path, function (err: any) {
            if (err) {
                console.error(err);
            }
        });
    },

    obj2Url: function (searchParameters: any) {
        let urlParameters = JSON.stringify(searchParameters);
        urlParameters = "?" + urlParameters.replace(/{|}|"/g, "").replace(/:/g, "=").replace(/,/g, "&");
        return urlParameters;
    }
};