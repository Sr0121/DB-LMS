function login(){
    var mysql = require('mysql');
    var wrapper = require('co-mysql');
    var pool = mysql.createPool({
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'library'
    });
    var p = wrapper(pool);
    return p;
}

module.exports = login;