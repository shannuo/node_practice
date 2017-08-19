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

var Account = function(user)
{
	this.username = user.username;
	this.type = user.type;
	this.income = user.income;
	this.money = user.money;
	this.time = user.time;
}

Account.prototype.addAccount = function save(callback)
{
	var nowDate = new Date();
	var createtime = nowDate.toLocaleDateString();
	var user = {
    username : this.username,
    type : this.type,
	income : this.income,
	money : this.money,
	createtime : createtime
  	};
	console.log(user);
	var INSERT_Account= "INSERT INTO Account (ID,USERNAME,TYPE,INCOME,MONEY,CREATETIME) VALUES (0,?,?,?,?,?)";
	pool.getConnection(function(err,connection){
    connection.query(INSERT_Account,[user.username,user.type,user.income,user.money,user.createtime],function(err,result){
      if(err){
        console.log("INSERT_Account Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

//显示类型
Account.prototype.showAccount = function(callback) {
	var user = {
    username : this.username,
	time : this.time
  	};
	console.log(user);
	var nowtime = new Date();
	nowtime = nowtime.toLocaleDateString();
	nowtime = nowtime.split('/');
	nowtime.unshift(nowtime.pop());
	nowtime = nowtime.join('-');
  	pool.getConnection(function(err,connection){
    console.log("getConnection");
    var SELECT_NUM = "SELECT * FROM Account WHERE USERNAME = ? AND (CREATETIME BETWEEN ? AND ?) ";
    connection.query(SELECT_NUM, [user.username,user.time,nowtime], function (err, result) {
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

module.exports = Account;