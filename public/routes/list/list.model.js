var mongoUtil = require('../../db/mongodb');
var db = mongoUtil.getDb();

var listusers = function(callback) {
  db.users.find(function(err,docs){
  console.log("@@@@@@@@@@in model",docs);
  if(callback) {
        callback(err,docs);
				} else {
					if(err) throw err;
				  };
     });
};

var adduser = function(user,callback) {
  db.users.insert(user,function(err,docs){
    console.log("after insertion",docs);
    if(callback) {
          callback(err,docs);
          } else {
            if(err) throw err;
            };
  });
};

var deleteuser = function(id,callback) {
  db.users.remove({_id:mongoUtil.getObjectId(id)},function(err,docs){
    console.log("after deletion",docs);
    if(callback) {
          callback(err,docs);
          } else {
            if(err) throw err;
            };
  });
};

var listuser = function(id,callback) {
  db.users.findOne({_id:mongoUtil.getObjectId(id)},function(err,docs){
    console.log("after insertion",docs);
    if(callback) {
          callback(err,docs);
          } else {
            if(err) throw err;
            };
  });
};

var edituser = function(id,user,callback) {
  var query = {_id:mongoUtil.getObjectId(id)}
  var setQuery = {$set:
    {name:user.name,
      email:user.email,
      number:user.number,
   }}
  db.users.findAndModify(
  {
    query:query,
    update:setQuery,
    new:true
  },
  function(err,docs){
    console.log("after insertion",docs);
    if(callback) {
          // return (docs)?callback(err,docs):callback(err);
          callback(err,docs);
          } else {
            if(err) throw err;
            };
  });
};

var listmodel = {
	listusers: listusers,
  adduser:adduser,
  deleteuser:deleteuser,
  listuser:listuser,
  edituser:edituser
};
module.exports = listmodel;
