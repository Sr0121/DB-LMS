var borrow_data = async (ctx , next) => {
    var connection = require('./login.js')();
    var cno = ctx.request.body.cno || "";
    var bno = ctx.request.body.bno || "";

    var sql = 'select bno,type,title,press,year,author,price,total,stock from book natural join borrow where cno = ? order by title limit 50';
    var rows = await connection.query(sql , [cno]);
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
    map["error"] = "";
    var flag = 0;
    for (var row of rows){
        for (var key in row){
            map[key].push(row[key]);
            flag = 1;
        }
    }
    if(flag == 0){
        map["error"] = "借书证不存在！";
    }
    else{
        sql = 'select stock from book where bno = ?';
        var result = await connection.query(sql , [bno]);
        console.log(`借书证号：${cno}，书号：${bno}`);
        try{
            if(result[0]["stock"] > 0){
                try{
                    sql = 'insert into borrow value(? , ? , curdate() , date_add(curdate() , interval 2 month) , "001")';
                    await connection.query(sql , [cno,bno]);
                    sql = 'update book set stock = stock - 1 where bno = ?';
                    await connection.query(sql , [bno]);
                    map["return"] = "";
                }
                catch(err){
                    console.log(err);
                    map["error"] = "已经借过同一本书！";
                }
            }
            else{
                sql = 'select min(return_date) as return_date from borrow where bno = ?';
                result = await connection.query(sql , [bno]);
                map["return"] = result[0]["return_date"];
            }
        }
        catch(err){
            console.log(err);
            map["error"] = "书号不存在！";
        }
    }
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);
    await next();
}

module.exports = {
    "POST /bo" : borrow_data
};