var in_book_data = async (ctx , next) => {
    var connection = require('./login.js')();
    var bno = ctx.request.body.bno || "";
    var type = ctx.request.body.type || "";
    var name = ctx.request.body.name || "";
    var press = ctx.request.body.press || "";
    var year = ctx.request.body.year || "";
    var author = ctx.request.body.author || "";
    var price = ctx.request.body.price || "";
    var total = ctx.request.body.total || "";
    var stock = ctx.request.body.total || "";

    var  addSql = 'INSERT INTO book(bno,type,name,press,year,author,price,total,stock) VALUES(?,?,?,?,?,?,?,?,?)';
    var  addSqlParams = [bno, type,name,press,year,author,price,total,stock];

    var rows = await connection.query(addSql , addSqlParams);
    console.log(rows);
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(rows);
    await next();
}

module.exports = {
    "POST /in" : in_book_data
};