var express = require('express');
var router = express.Router();
var Type = require("../models/account.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.user;
	if(user)
		res.render('account', { errMsg:''});
	else
		res.redirect('/users');
});

router.post("/",function(req, res) {
    //获取form表单提交数据
    var type = req.body.type;
	var income = req.body.income;
	var money = req.body.money;
	console.log(money);
    var username = req.session.user.username;
    var Account = new Type({
      username : username,
      type : type,
	  income : income,
	  money : money
    });
	console.log(Account);
    //将类型存入数据库
	console.log(Account);
	Account.addAccount(function(err,result){
	  if(err){
		res.render('account', {errMsg: err });
		return;
	  }
	  else
	  {
		res.render('account', {errMsg: '添加成功！'});  
		  }
	 });
});

module.exports = router;