var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { errMsg: '' });
});

router.post("/",function(req, res) {
    //获取form表单提交的登录数据
    var username = req.body.username;
    var password = req.body.password;
	console.log(req.body);
    var loginUser = new User({
      username : username,
      userpwd : password
    });
    //通过用户名取到用户信息
    loginUser.userInfo(function(err,result){
      if(err){
        res.json(err);
        return;
      }
      if(result == ''){
         res.json('用户不存在!点击注册按钮注册!');
         return;
      }
      else{
        //判断用户密码是否填写正确  演示没做加密，等有时间再加
        if(result[0]['userpwd'] == password){
          var user = {'username':username};
		  console.log(req.session); 
		  //保存用户session信息
          req.session.user = user; 
		  res.json('登陆成功!');
        }
        else{
           res.json('密码有误!');
        }
      }
     });
});

module.exports = router;
