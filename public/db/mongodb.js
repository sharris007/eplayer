var mongojs=require('mongojs');
var _db;
module.exports = {

 getDb: function() {
   _db = mongojs('list',['users']);
   return _db;
 },
 
 getObjectId : function(id){
   var uid = mongojs.ObjectId(id);
   return uid;
 }
};
