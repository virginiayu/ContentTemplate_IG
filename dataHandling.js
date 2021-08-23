/**
 * Required External Modules
 */
const path = require("path");
const ejs = require('ejs');
const fs = require('fs');

// custom modules
const utility = require('./utility.js');

/** port */
function dataHandling(resQuery, type='normal'){
    let query = JSON.parse(JSON.stringify(resQuery));
    console.log("req query", query);
    
    if (type == 'design' &&  query.custom == 'on' ){
        type = 'custom';
    }
    console.log("type", type);

    let data, result = { "data" : '' };

    switch (type) {
        case 'normal':
            data = data_processer_normal(query);
            console.log("processed data: ", data);
            result = getTemplateResult(data, 'views/template_normal.ejs');
            break; 
        case 'custom':
            data = data_processer_custom(query);
            console.log("processed data: ", data);
            result = getTemplateResult(data, 'views/template_customize.ejs');
            break; 
        case 'design':
            data = data_processer_design(query);
    console.log("processed data: ", data);
            result = getTemplateResult(data, 'views/template_design.ejs');
            break; 
    }

    return result;
}

/** data proocessing */ 
function data_processer_normal(params){
    if(params.items){
        let temp = params.items.map(function(item, ind){
            if (item.size || item.price ) return item;
            return null;
        });
        params.items = temp.filter(x => x !== null);

        let basicjson = {
            "name"      : "",
            "nickname"  : "",
            "name_eng"  : "",
            "function_type"     : "",
            "description_short" : "",
            "description_long"  : ""
        };
        if (params.name) {
            basicjson.name = params.name; 
            const json = utility.getJsonContent('datasrc/detail.json');

            temp = json.filter(it => it.name === params.name);  
            // console.log("temp", temp);
            temp = temp.length > 0 ? temp[0]:basicjson;
            Object.assign(params, temp);
        }
        else {
            Object.assign(params, basicjson);
        }

        if (params.nickname.length > 0) {
            params.nickname = params.nickname.split(",");
        }

    }

    if (params.seqNo) params.seqNo += "號";

    if (params.othername) params.othername = params.othername.split(",");

    if(params.gridItem) params.gridItem = "[格仔鋪有售]";
    else params.gridItem = "";

    return params;
}

function data_processer_custom(params) {
    if(params.items){
        // reduce empty rows
        let titleChecklist = [];
        let relatedTags = [];
        let temp = params.items.map(function(item, ind){
            if (item.name != '' ) {
                relatedTags.push(item.name);
                var str =  "#"+item.name;
                if (item.size) {
                    str+=" ("+item.size+ "mm)";
                }
                titleChecklist.push( str);
            }
        });

        console.log(titleChecklist, relatedTags);

        let basicjson = {
            "titleChecklist": titleChecklist.join(" x "),
            "relatedTags"   : relatedTags
        };
        Object.assign(params, basicjson);
    }
    return params;
}

function data_processer_design(params){
    if(params.items){
        let titleChecklist = [];
        let relatedTags = [];
        let temp = params.items.map(function(item, ind){
            if (item.name != '' ) {
                relatedTags.push(item.name);
                var str =  "#"+item.name;
                if (item.size) {
                    str+=" ("+item.size+ "mm)";
                }
                titleChecklist.push( str);
            }
        });

        // filter useful description from src
        const json = utility.getJsonContent('datasrc/detail.json');
        let shortDesc = [];
        shortDesc = json.filter( it => relatedTags.indexOf(it.name) > -1 );  
        temp = shortDesc.map(function(item, ind){
            item.nickname = item.nickname.split(",");
            return item;
        });
        shortDesc = temp;
        
        let basicjson = {
            "description_short" : shortDesc,
            "titleChecklist"    : titleChecklist.join(" x "),
            "relatedTags"       : relatedTags
        };
        Object.assign(params, basicjson);
    }

    if(params.onlyOne) params.onlyOne = "[一物一圖]";
    else params.onlyOne = "";
    if (!params.custom) params.custom = "";

    if(params.ptdCode) params.ptdCode = "[#"+params.ptdCode+"]";

    if(params.gridItem) params.gridItem = "[格仔鋪有售]";
    else params.gridItem = "";

    return params;
}


/** bind template */
function getTemplateResult(data, filepath = ''){
    let html = "";
    if (Object.keys(data).length > 0 && filepath) {
        // bind template
        const templatePath = path.join(__dirname, filepath);
        // return promise object
        // html = ejs.renderFile(templatePath, data);

        // return plain text
        let template = fs.readFileSync(templatePath, 'utf-8');
        html = ejs.render(template, data);
    }
    console.log(html);

    return {"data" : html};
}

// eport module
module.exports = dataHandling;