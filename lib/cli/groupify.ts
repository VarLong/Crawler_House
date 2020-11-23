const spawner = require("./spawner");
const walker = require("./testsuitewalker");

export function run(args, callback) {
    const filteredTestPaths = walker(args.tag, args.excludedCases, args.group);
    spawner.run(filteredTestPaths, args, callback);
    return;
}