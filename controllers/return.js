var fs = require('fs');
var path = require('path');
var return_html = async (ctx , next) => {
    var html_file = fs.readFileSync(path.resolve(__dirname ,'..') +  '/views/return.html');
    ctx.response.type = 'text/html';
    ctx.response.status = 200;
    ctx.response.body = html_file;
    await next();
}

var return_css = async (ctx , next) => {
    var css_file = fs.readFileSync(path.resolve(__dirname , "..") + '/views/return.css');
    ctx.response.type = 'text/css';
    ctx.response.status = 200;
    ctx.response.body = css_file;
    await next();
}

module.exports = {
    "GET /return" : return_html,
    "GET /return.css" : return_css
};