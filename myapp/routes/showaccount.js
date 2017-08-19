var express = require('express');
var router = express.Router();
var Type = require("../models/account.js");

/* GET home page. */
router.get('/:key', function(req, res, next) {
	var user = req.session.user;
	console.log(user);
	if(user)
	{
	  var username = req.session.user.username;
	  var nowDate = new Date();
	  var temp_time = nowDate.toLocaleDateString().split('-');
	  console.log(temp_time);	
	  if(req.params.key=='week')
	  	{
			if(temp_time[2]>7)
				temp_time[2] = parseInt(temp_time[2])-7;
			else
				{
					if(temp_time[1]>1)
						{
							temp_time[1] = parseInt(temp_time[1])-1;
							temp_time[2] = 31-7+parseInt(temp_time[2]);
						}
					else
						{
							temp_time[0] -= 1;
							temp_time[1] = 12;
							temp_time[2] = 31-7+parseInt(temp_time[2]); 
						}
				}
		}
	  if(req.params.key=='month')
	  {
	
		  if(temp_time[1]>1)
			  {
				  temp_time[1] = parseInt(temp_time[1])-1;
			  }
		  else
			  {
				  temp_time[0] = parseInt(temp_time[0])-1;
				  temp_time[1] = 12;
			  }
	  }
	  if(req.params.key=='year')
	  {
		  temp_time[0] = parseInt(temp_time[0])-1;
	  }
	  var time = temp_time.join('-');
	  var Account = new Type({
      username : username,
	  time : time
	  });
	  console.log(temp_time);
	  Account.showAccount(function (err, results) {
      if (results == null) {
        err = '没有账单可显示';
      }

      if (err) {
        res.send(err);
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