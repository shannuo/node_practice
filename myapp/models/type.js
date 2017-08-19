var mysql = require('mysql');

var DB_NAME= 'cashbook';

//创建连接池 createPool(Object)
// Object和createConnection参数相同。
var pool = mysql.createPool({
      host : '127.0.0.1',
      user : 'root',
      password :'',
      database:'cashbook',
      port : 3306
  });
//可以监听connection事件，并设置session值
pool.on('connnection',function(connection){
  console.log("pool on");
  //connection.query('SET SESSION auto_increment_increment=1')
});

var Type = function(user)
{
	this.username = user.username;
	this.type = user.type;
	this.income = user.income;
}

Type.prototype.addType = function save(callback)
{
	var user = {
    username : this.username,
    type : this.type,
	income:this.income
  	};
	console.log(user);
	var INSERT_TYPE= "INSERT INTO TYPE (ID,NAME,USERNAME,TYPE) VALUES (0,?,?,?)";
	pool.getConnection(function(err,connection){
    connection.query(INSERT_TYPE,[user.type,user.username,user.income],function(err,result){
      if(err){
        console.log("INSERT_TYPE Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

//判断类型是否重复
Type.prototype.typeNum = function(callback) {
	var user = {
    username : this.username,
    type : this.type,
	income:this.income
  	};
  	pool.getConnection(function(err,connection){
    console.log("getConnection");
    var SELECT_NUM = "SELECT COUNT(1) AS num FROM TYPE WHERE (USERNAME = ? OR USERNAME = 'shan') AND NAME = ? AND TYPE = ?";
    connection.query(SELECT_NUM, [user.username,user.type,user.income], function (err, result) {
      if (err) {
        console.log("SELECT_NUM Error: " + err.message);
        return;
      }
	  console.log(result);
      connection.release();
      callback(err,result);
    });
  });
};

//显示类型
Type.prototype.showType = function(callback) {
	var user = {
    username : this.username
  	};
  	pool.getConnection(function(err,connection){
    console.log("getConnection");
    var SELECT_NUM = "SELECT * FROM TYPE WHERE USERNAME = ? OR USERNAME = 'shan'";
    connection.query(SELECT_NUM, [user.username], function (err, result) {
      if (err) {
        console.log("SELECT_NUM Error: " + err.message);
        return;
      }
	  console.log(result);
      connection.release();
      callback(err,result);
    });
  });
};

module.exports = Type;