const fs = require('fs');

/** utilitize */
const getJsonContent = function( filepath = '') {
    console.log("filepath", filepath);
    console.log("--------");

    if (filepath) {
        try {
            let content = fs.readFileSync(filepath, 'utf-8');
            switch (typeof content){
                case 'string': 
                    return JSON.parse(content);
                    break;
                case 'object':
                    return content 
                    break;
                default:
                    return "{}";
            }
            
        } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
            return {};
        }
    }
    return null;
}

// // overwrite file content (json) with readable space
// const overwriteJsonFile = function (filePath, json, callback = undefined){
//     if (json) {
//         const str = JSON.stringify(json, null, 4); // 4 == num. of space for readability purposes
//         const result =
//         fs.writeFileSync(filePath, str, function(err) {
//             if(err) {
//                 console.log(err);
//                 result = "error";
//             }
//             console.log("The file was saved!");
//             // result = true;
//             if (callback !== undefined) callback();
//         }); 
//         console.log("writeFileSync", result);
//     }
//     // return false;
// }

// eport module
module.exports = {
    getJsonContent: getJsonContent,
    // overwriteJsonFile: overwriteJsonFile
};