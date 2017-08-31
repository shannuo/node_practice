var express = require('express');
var router = express.Router();
var Type = require("../models/type.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.user;
	if(user)
		res.render('main', { errMsg:'',type:'' });
	else
		res.redirect('/users');
});

router.post("/",function(req, res) {
    //获取form表单提交数据
    var type = req.body.type;
	var income = req.body.income;
    var username = req.session.user.username;
    var Dtype = new Type({
      username : username,
      type : type,
	  income : income
    });
    //将类型存入数据库
	console.log(Dtype);
	
	//检查类型是否已经存在
    Dtype.typeNum(function (err, results) {
      if (results != null && results[0]['num'] > 0) {
        err = '该类型已存在';
      }

      if (err) {
        res.json(err);
        return;
      }
	
	  Dtype.addType(function(err,result){
		if(err){
		  res.json(err);
		  return;
		}
		else
		{
		  res.json('添加成功'); 
		}
	   });
	});
});

module.exports = router;