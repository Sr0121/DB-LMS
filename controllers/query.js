var fs = require('fs');
var path = require('path');
var query_html = async (ctx , next) => {
    var html_file = fs.readFileSync(path.resolve(__dirname , "..") + '/views/query.html');
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = html_file;
    await next();
}

var query_css = async (ctx , next) => {
    var css_file = fs.readFileSync(path.resolve(__dirname , "..") + '/views/query.css');
    ctx.response.type = 'text/css';
    ctx.response.status = 200;
    ctx.response.body = css_file;
    await next();
}

module.exports = {
    "GET /query" : query_html,
    "GET /query.css" : query_css
};