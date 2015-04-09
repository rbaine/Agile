var Task = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var logDateFormat = 'MM/dd/yyyy hh:mm:ss';
var ASC = 1;
var DESC = -1;
var dbCollection = "tasks";

    return {
        get: function (db, id, callback) {
                var o_id = new ObjectID(id.toString());
                var collection = db.collection(dbCollection);
                var where = { _id: o_id.toString() };
                var d = new Date();
                console.log('task.get ' + d.format(logDateFormat));
                collection.findOne(where, function (err, data) {
                    callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
                });
        },


        post: function (db, data, callback) {
            var collection = db.collection(dbCollection);
            var d = new Date();
            console.log('task.post ' + d.format(logDateFormat));
            collection.insert(data, function(err, data){
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },

        delete: function (db, id, callback) {
            var o_id = new ObjectID(id.toString());
            var collection = db.collection(dbCollection);
            var where = { _id: o_id };
            var d = new Date();
            console.log('task.delete ' + d.format(logDateFormat));

            collection.remove(where, function(err, data){
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },

        put: function (db, data, callback) {
            var o_id = new ObjectID(data._id.toString());
            var collection = db.collection(dbCollection);
            
            // need to convert the mongoDB string _id back to an ObjectID()
            data._id = o_id;

            var where = { _id: o_id };
            var upd = {'$set': data};
            var d = new Date();
            console.log('task.put ' + d.format(logDateFormat));
            console.log(data);
            console.log(where);
            console.log(upd);


            collection.update(where, upd, function (err, data){
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            }); 
        },

        list: function (db, storyid, callback) {
            var collection = db.collection(dbCollection);
            var where = { storyId : storyid };
            var d = new Date();
            console.log('task.list ' + d.format(logDateFormat));
            collection.find().sort({"seq":ASC}).toArray(function (err, data) {
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        }
    };

})();

module.exports = Task;