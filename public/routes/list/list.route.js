var express = require('express');
var router = express.Router();
var bodyparser=require('body-parser');
var listctrl = require('./list.controller.js');
//get all users
router.get('/listing',function(req,res) {
  console.log("Inside route");
            listctrl.getlist(function(err,docs) {
      	        res.status(200).json(docs);
                console.log("In route",docs);
      	    });
});

router.post('/listing',function(req,res) {
  console.log("from post route",req.body);
  listctrl.addlist(req.body,function(err,docs) {
      res.status(200).json(docs);
      console.log("After adding user",docs);
  });
});

router.delete('/listing/:id',function (req,res) {
  console.log(req.params.id);
  var id=req.params.id;
  listctrl.deletelist(id,function(err,docs) {
      res.status(200).json(docs);
      console.log("After deleting a user",docs);
  });
});

router.get('/listing/:id',function (req,res) {
  console.log(req.params.id);
  var id=req.params.id;
  listctrl.getuserlist(id,function(err,docs) {
      res.status(200).json(docs);
      console.log("After getting a user",docs);
  });
});

router.put('/listing/:id',function(req,res){
  console.log("request the body:::::",req.body);
  var id=req.params.id;
  listctrl.editlist(id,req.body,function(err,docs) {
      res.status(200).json(docs);
      console.log("After editing a user",docs);
  });
});
module.exports = router;
