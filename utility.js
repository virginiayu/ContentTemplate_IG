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
                    if(content && content.length > 2)
                        return JSON.parse(content);
                    else return {};
                    break;
                case 'object':
                    return content ;
                    break;
                default:
                    const temp = {};
                    return temp;
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


// overwrite file content (json) with readable space
function overwriteFileContent(jsonPath, inputString = "", callback = undefined){
    if (jsonPath) {
        fs.writeFile(jsonPath, inputString, 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            if (callback) {
                callback(err);
            }
        });
    }
}


// eport module
module.exports = {
    getJsonContent: getJsonContent,
    overwriteFileContent: overwriteFileContent
};