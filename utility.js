const fs = require('fs');

/** utilitize */
const getJsonContent = function( filepath = '') {
    console.log("getJsonContent() - filepath", filepath, fs.existsSync(filepath) );
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
                    return {};
            }
            
        } catch (error) {
            console.error("catch error");
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
        if (typeof inputString == "object"){
            inputString = JSON.stringify(inputString, null, 4);
        }
        fs.writeFile(jsonPath, inputString, (err) => {
            if (err) console.log( err);
            else {
                console.log('The file has been saved!');
            }
            if (typeof callback == "function") {
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