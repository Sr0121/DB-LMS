var borrow_data = async (ctx , next) => {
    var connection = require('./login.js')();
    var cno = ctx.request.body.cno || "";
    var bno = ctx.request.body.bno || "";
    var sql = 'select bno,type,title,press,year,author,price,total,stock from book natural join borrow where cno = ? and bno = ?';

    var rows = await connection.query(sql , [cno,bno]);
    console.log(rows);
    var map = new Map();
    map['bno'] = [];
    map['type'] = [];
    map['title'] = [];
    map['press'] = [];
    map['year'] = [];
    map['author'] = [];
    map['price'] = [];
    map['total'] = [];
    map['stock'] = [];
    console.log(rows['bno']);
    
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(row);
    await next();
}

module.exports = {
    "POST /bo" : borrow_data
};