var listmodel = require('./list.model.js');

var getlist = function(callback) {
	return listmodel.listusers(callback);
}

var addlist = function(user,callback) {
	return listmodel.adduser(user,callback);
}

var deletelist = function(id,callback) {
	return listmodel.deleteuser(id,callback);
}

var getuserlist = function(id,callback) {
	return listmodel.listuser(id,callback);
}

var editlist = function(id,user,callback) {
	return listmodel.edituser(id,user,callback);
}

var listctrl={
  getlist:getlist,
  addlist:addlist,
  deletelist:deletelist,
  getuserlist:getuserlist,
  editlist:editlist
};

module.exports=listctrl;
