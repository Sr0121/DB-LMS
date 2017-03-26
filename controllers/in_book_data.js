var in_book_data = async (ctx , next) => {
    var connection = require('./login.js')();
    var bno = ctx.request.body.bno || "";
    var type = ctx.request.body.type || "";
    var title = ctx.request.body.title || "";
    var press = ctx.request.body.press || "";
    var year = ctx.request.body.year || "";
    var author = ctx.request.body.author || "";
    var price = ctx.request.body.price || "";
    var total = ctx.request.body.total || "";
    var stock = ctx.request.body.total || "";

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
    var map1 = new Map();
    map1["error"] = "";
    map1["result"]= "插入失败！";

    var addSql = 'select * from book where bno = ?';
    var rows = await connection.query(addSql , [bno]);
    for (var row of rows){
        for (var key in row){
            map[key].push(row[key]);
        }
    }
    if(map['bno']!=""){
        var flag=0;
        map1["error"]="该书与数据库中的书号为"+map['bno']+"的书存在以下矛盾："
        if(map['type'] != type){   
            flag=1;
            map1["error"]=map1["error"]+'类型 ';
        }
        if(map['title'] != title){
            flag=1;
            map1["error"]=map1["error"]+'书名 ';
        }
        if(map['press'] != press){
            flag=1;
            map1["error"]=map1["error"]+'出版社 ';
        }


        if(map['author'] != author){
            flag=1;
            map1["error"]=map1["error"]+'作者 ';
        }
        if(map['price'] != price){
            flag=1;
            map1["error"]=map1["error"]+'价格 ';
        }

        var flag2=0;
        addSql = 'select * from book where bno = ? and year like ?';
        rows = await connection.query(addSql , [bno,year]);
        for (var row of rows){
            for (var key in row){
                flag2=1;
            }
        }
        if(flag2==0){
            flag=1;
            map1["error"]=map1["error"]+'出版日期 ';
        }

        if(flag==0){
            console.log(total,stock);
            map1["error"]="";
            addSql = 'update book set total = total + ? , stock = stock + ? where bno = ?';
            rows = await connection.query(addSql , [total,stock,bno]);
            map1["result"]="插入成功！" ;
        }
    }
    else{
        addSql = 'insert into book(bno,type,title,press,year,author,price,total,stock) values(?,?,?,?,?,?,?,?,?)';
        rows = await connection.query(addSql , [bno,type,title,press,year,author,price,total,stock]);
        map1["result"]="插入成功！" ;
    }
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map1);
    await next();
}

module.exports = {
    "POST /in" : in_book_data
};