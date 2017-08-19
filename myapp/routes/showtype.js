var express = require('express');
var router = express.Router();
var Type = require("../models/type.js");

router.get('/', function(req, res, next) {
	var user = req.session.user;
	console.log(user);
	if(user)
	{
	  var username = req.session.user.username;
	  var Dtype = new Type({
      username : username
	  });
	  Dtype.showType(function (err, results) {
      if (results == null) {
        err = '没有类型可显示';
      }

      if (err) {
        res.render('main', {errMsg: err,type:'' });
        return;
      }
	  else
	  	 res.json(results);
	  return;
	  });
	}
	else
		res.redirect('/users');
});

module.exports = router;