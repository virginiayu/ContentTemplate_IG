function dataHandling(resQuery, type='normal'){
    // console.log("contentProcessor");
    var query = JSON.parse(JSON.stringify(resQuery));
    var result;

    if (type == "normal") {
        result = data_processer_normal(query);
    }
    else { // type == design
        result = data_processer_design(query);
    }

    return result;
}

function data_processer_normal(params){
    let temp = params.items.map(function(item, ind){
        if (item.size != '' && item.price != '') return item;
        return null;
    });
    params.items = temp.filter(x => x !== null);
    return params;
}

function data_processer_design(params){
    return params;
}

// eport module
module.exports = dataHandling;