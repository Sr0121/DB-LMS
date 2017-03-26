var query_data = async (ctx , next) => {
    var connection = require('./login.js')();
    var bno = ctx.request.body.bno || "%";
    var type = ctx.request.body.type || "%";
    var title = ctx.request.body.title || "%";
    var press = ctx.request.body.press || "%";
    var year = ctx.request.body.year || "%";
    var author = ctx.request.body.author || "%";
    var price1 = ctx.request.body.price1 || "";
    var price2 = ctx.request.body.price2 || "";
    var total1 = ctx.request.body.total1 || "";
    var total2 = ctx.request.body.total2 || "";
    var stock1 = ctx.request.body.stock1 || "";
    var stock2 = ctx.request.body.stock2 || "";


    if(ctx.request.body.fuzzy_bno==1)
        bno='%'+bno+'%';
    if(ctx.request.body.fuzzy_type==1)
        type='%'+tyoe+'%';
    if(ctx.request.body.fuzzy_title==1)
        title='%'+title+'%';
    if(ctx.request.body.fuzzy_press==1)
        press='%'+press+'%';
    if(ctx.request.body.fuzzy_author==1)
        author='%'+author+'%';

    if(price1!=""){
    if(ctx.request.body.price_judge1==1)
        price1=' and price > '+price1;
    if(ctx.request.body.price_judge1==0)
        price1=' and price = '+price1;
    if(ctx.request.body.price_judge1==-1)
        price1=' and price < '+price1;
    if(ctx.request.body.price_judge2==1)
        price1=price1+' and price > '+price2;
    if(ctx.request.body.price_judge2==-1)
        price1=price1+' and price < '+price2;
    }

    if(total1!=""){
    if(ctx.request.body.total_judge1==1)
        total1=' and total > '+total1;
    if(ctx.request.body.total_judge1==0)
        total1=' and total = '+total1;
    if(ctx.request.body.total_judge1==-1)
        total1=' and total < '+total1;
    if(ctx.request.body.total_judge2==1)
        total1=total1+' and total > '+total2;
    if(ctx.request.body.total_judge2==-1)
        total1=total1+' and total < '+total2;
    }

    if(stock1!=""){
    if(ctx.request.body.stock_judge1==1)
        stock1=' and stock > '+stock1;
    if(ctx.request.body.stock_judge1==0)
        stock1=' and stock = '+stock1;
    if(ctx.request.body.stock_judge1==-1)
        stock1=' and stock < '+stock1;
    if(ctx.request.body.stock_judge2==1)
        stock1=stock1+' and stock > '+stock2;
    if(ctx.request.body.price_judge2==-1)
        stock1=stock1+' and stock < '+stock2;
    }

    console.log(year);

    var  addSql = 'select * from book where bno like ? '+price1+stock1+total1+' and type like ? and title like ? and press like ? and year like ? and author like ? order by title limit 50';
    var  addSqlParams = [bno, type,title,press,year,author];

    var rows = await connection.query(addSql , addSqlParams);
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
        map["error"] = "不存在！";
    }

    ctx.response.status = 200;
    ctx.response.type = 'application/json';
    ctx.response.body = JSON.stringify(map);
    await next();
}

module.exports = {
    "POST /qu" : query_data
};