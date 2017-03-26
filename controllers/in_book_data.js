var in_book_data = async (ctx , next) => {
    var fs = require('fs');
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
    var file = ctx.request.body.file || "";

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
    if(file==""){
        var map1 = new Map();
        map1["error"] = "";
        map1["result"]= "插入失败！";
        if(bno==""||type==""||title==""||press==""||year==""||author==""||price==""||total=="")
            map1["error"]="请输入所有信息";
        else{
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
            console.log(year);
            addSql = 'insert into book(bno,type,title,press,year,author,price,total,stock) values(?,?,?,?,?,?,?,?,?)';
            rows = await connection.query(addSql , [bno,type,title,press,year,author,price,total,stock]);
            map1["result"]="插入成功！" ;
    }
    }}
    else{
        var map1 = new Map();
        map1["error"] = [];
        map1["result"]= [];
        var data = fs.readFileSync(file, 'utf-8');
        data = data.split('\n');
        for(var i=0;i<data.length;i++){
            var str=data[i].substring(1,data[i].length-1);
            var input=str.split(',');
            var string_err;
            map['bno'] = input[0];
            map['type'] = input[1];
            map['title'] = input[2];
            map['press'] = input[3];
            map['year'] = input[4];
            map['author'] = input[5];
            map['price'] = input[6];
            map['total'] = input[7];
            map['stock'] = input[7];
            if(map['bno']==""||map['type']==""||map['title']==""||map['press']==""||map['year']==""||map['author']==""||map['price']==""||map['total']=="")
                {
                    map1["error"].push("请输入所有信息");
                    map1["result"].push("插入失败！");
                }
            else{
                var addSql = 'select * from book where bno = ? and type = ? and title = ? and press = ? and year like ? and author = ? and price = ?';
                var rows = await connection.query(addSql , [map['bno'],map['type'],map['title'],map['press'],map['year'],map['author'],map['price']]);
                var flag1=0
                for (var row of rows){
                    for (var key in row){
                        flag1=1;
                    }
                }
                var addSql = 'select * from book where bno = ?';
                var rows = await connection.query(addSql , [map['bno']]);
                var flag3=0
                for (var row of rows){
                    for (var key in row){
                        flag3=1;
                    }
                }
                if(flag1==1){
                    addSql = 'update book set total = total + ? , stock = stock + ? where bno = ?';
                    rows = await connection.query(addSql , [map['total'],map['total'],map['bno']]);
                    map1["result"].push("插入成功!") ;
                    map1["error"].push("");
                }
                else if(flag3==1){
                    map1["result"].push("插入失败！") ;
                    map1["error"].push("数据库中已存在书号为"+map['bno']+"的书，且数据库中的书与入库的书信息不符");
                }
                else{
                    addSql = 'insert into book(bno,type,title,press,year,author,price,total,stock) values(?,?,?,?,?,?,?,?,?)';
                    rows = await connection.query(addSql , [map['bno'],map['type'],map['title'],map['press'],map['year'],map['author'],map['price'],map['total'],map['stock']]);
                    map1["result"].push("插入成功！");
                    map1["error"].push("");
                }
            }
        }
    }
    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map1);
    await next();
}

module.exports = {
    "POST /in" : in_book_data
};