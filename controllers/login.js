function login(){
    var mysql = require('mysql');
    var wrapper = require('co-mysql');
    var pool = mysql.createPool({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'library'
    });
    var p = wrapper(pool);
    return p;
}

module.exports = login;