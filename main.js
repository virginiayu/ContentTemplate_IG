function dataHandling(resQuery){
    console.log("contentProcessor");
    var query = JSON.parse(JSON.stringify(resQuery));

    // data validation
    // data hanlding
    if (query.uniqueness) {
        query.uniqueness = "["+query.uniqueness+"]";
    }
    if (query.ptdCode) {
        query.ptdCode = "[#"+query.ptdCode+"]";
    }
    if (query.comment && query.comment.length > 0) {
        query.comment += '<br/>.';
    }

    // get value from datasrc json
    query.productGroup = '';
    query.nicknames = [];
    if (query.functions) {
        query.functions += '<br/>.';
    }
    else {
        query.functions = '';
    }
    
    console.log(query);
    return query;
}

// eport module
module.exports = dataHandling;