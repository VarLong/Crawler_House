const klawSync = require("klaw-sync");
const path = require("path");

function walk(tag: string | string[], excludedCases: string | string[], groupPath?: string): string[] {
    const tags: string[] = tag.toString().replace(/\s/g, "").split(",") || [],
        excludedCasesArr: string[] = excludedCases ? excludedCases.toString().replace(/\s/g, "").toLowerCase().split(",") : [];
    const getAllFilteredTestPaths = function (paths: string[], tags: string[], excludedTestCases: string[]): string[] {
        const testFilesMatchedTags: string[] = [];
        paths.forEach((path: string) => {
            let tagsOfTest: string[] = require(path).tags || [];
            tagsOfTest = tagsOfTest.map((t: string) => t.toLowerCase());
            const match: boolean = tags.filter((tag: string) => tagsOfTest.indexOf(tag.toLowerCase()) > -1).length > 0;
            if (match) {
                testFilesMatchedTags.push(path);
            }
        });
        return testFilesMatchedTags;
    };

    try {
        const filterFn = (item: any) => {
            return excludedCasesArr.indexOf(path.parse(item.path).name.toLowerCase()) < 0 && path.extname(item.path) === ".js";
        };
        let pathsObjs: any[] = [];
        if (groupPath) {
            const groupPaths = groupPath.split(",").map((gPath: string) => gPath.trim());
            groupPaths.forEach((gPath: string) => {
                gPath = gPath.replace(/\\/g, "/").replace(/artifacts|build/g, "..");
                console.log(`walker the group path ${gPath}`);
                const tempPathsObjs: any[] = klawSync(path.resolve(__dirname, gPath), { filter: filterFn });
                pathsObjs = pathsObjs.concat(tempPathsObjs);
            });
        } else {
            pathsObjs = klawSync(path.resolve(__dirname, "../../tests/"), { filter: filterFn });
        }
        const paths: string[] = pathsObjs.map((p: any) => p.path);
        return getAllFilteredTestPaths(paths, tags, excludedCasesArr);
    } catch (exception) {
        console.log("walking wrong way ? " + exception);
    }
}

module.exports = walk;