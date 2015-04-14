var User = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var logDateFormat = 'MM/dd/yyyy hh:mm:ss';
var ASC = 1;
var DESC = -1;
var dbCollection = "users";

    return {
        get: function (db, uid, callback) {
                var collection = db.collection(dbCollection);
                var o_id = new ObjectID(uid.toString());
                var where = {_id: o_id};
                var d = new Date();
                console.log('user.get ' + d.format(logDateFormat));
                collection.findOne(where, function (err, data) {
                    if (err || null) console.log(err);
                    callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
                });
        },

        getByEmail: function (db, email, callback) {
                var collection = db.collection(dbCollection);
                var where = {"email" : email};
                var d = new Date();
                console.log(where);
                console.log('user.getByEmail ' + d.format(logDateFormat));
                collection.find(where).count(function (err, cnt) {
                    if (err || null) console.log(err);
                    callback(cnt !== null ? JSON.stringify({"count" : cnt}) : JSON.stringify(err));
                });
        },


        post: function (db, data, callback) {
            var collection = db.collection(dbCollection);
            var d = new Date();
            console.log('user.post ' + d.format(logDateFormat));
            collection.insert(data, function(err, data){
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },

        delete: function (db, uid, callback) {
            var o_id = new ObjectID(uid.toString());
            var collection = db.collection(dbCollection);
            var where = {_id: o_id};
            var d = new Date();
            console.log('user.delete ' + d.format(logDateFormat));

            collection.remove(where, function(err, data){
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },

        put: function (db, data, callback) {
            var collection = db.collection(dbCollection);
            var o_id = new ObjectID(data._id.toString());
            // need to convert the mongoDB string _id back to an ObjectID()
            data._id = o_id;

            var where = {_id: o_id};
            var upd = {'$set': data};
            var d = new Date();
            console.log('user.put ' + d.format(logDateFormat));
            
            collection.update(where, upd, function (err, data){
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            }); 
        },
        list: function (db, callback) {
            var d = new Date();
            console.log('user.list ' + d.format(logDateFormat));
            var collection = db.collection(dbCollection);
            collection.find().sort({"id":ASC}).toArray(function (err, data) {
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        }
    };

})();

module.exports = User;