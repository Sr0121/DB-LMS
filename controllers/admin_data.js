var admin_data = async (ctx , next) => {
    var connection = require('./login.js')();
    var id = ctx.request.body.id || "";
    var password = ctx.request.body.password || "";
    var sql = 'select id,password,name,telephone from admin where id = ? and password = ?';

    var rows = await connection.query(sql , [id,password]);
    console.log(rows);
    var map = new Map();
    map['id'] = [];
    map['password'] = [];
    map['name'] = [];
    map['telephone'] = [];
    for (var row of rows){
        for (var key in row){
            map[key].push(row[key]);
        }
    }
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);
    await next();
}

module.exports = {
    "POST /ad" : admin_data
};