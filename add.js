function add_mapping(router , mapping){
    for (var key in mapping){
        if(key.startsWith("GET ")){
            var path = key.substring(4);
            router.get(path , mapping[key]);
            console.log(`successful! register url ${key}`);
        }
        else if(key.startsWith("POST ")){
            var path = key.substring(5);
            router.post(path , mapping[key]);
            console.log(`successful! register url ${key}`);
        }
        else{   
            console.log("invalid url!");
        }
    }
}

function add_controllers(router){
    var fs = require('fs');
    var file = fs.readdirSync(__dirname + '/controllers');
    var js_file = file.filter((f) => {
        return f.endsWith('.js');
    });
    for (var f of js_file){
        console.log(`read the ${f}...`);
        var mapping = require(__dirname + '/controllers/' + f);
        add_mapping(router , mapping);
    }
}

module.exports = add_controllers;