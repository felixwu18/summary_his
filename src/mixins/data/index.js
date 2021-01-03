/* 缓存名录 */
import { pushLatestFileNames } from "@/api/index";
import { indexOf } from "lodash";
const fileNames = [];
function importAll(r) {
    r.keys().forEach(key => fileNames.push(key.slice(2, -5)));
}
importAll(require.context("./fenshi", false, /\.json/));

// console.log(fileNames, 'fileNames------------')
// pushLatestFileNames({data: fileNames})