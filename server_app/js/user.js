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
                collection.findOne(where, function (err, data) {
                    if (err || null) console.log(err);
                    callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
                });
        },

        getByEmail: function (db, email, callback) {
                var collection = db.collection(dbCollection);
                var where = {"email" : email};
                var d = new Date();
                collection.find(where).count(function (err, cnt) {
                    if (err || null) console.log(err);
                    callback(cnt !== null ? JSON.stringify({"count" : cnt}) : JSON.stringify(err));
                });
        },


        post: function (db, data, callback) {
            var collection = db.collection(dbCollection);
            var d = new Date();
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
            
            collection.update(where, upd, function (err, data){
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            }); 
        },
        list: function (db, callback) {
            var d = new Date();
            var collection = db.collection(dbCollection);
            collection.find().sort({"id":ASC}).toArray(function (err, data) {
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },

        login: function (db, data, callback) {
            var collection = db.collection(dbCollection);
            var where = {"email" : data.email.toLowerCase(), "password" : data.password};

            var d = new Date();

            collection.findOne(where, function (err, data) {
                if (err || null) console.log(err);
                if (data || null) {
                    data.error = false;
                    data.message = "";
                } else {
                    data = {"error" : true, "message" : "Bad User or Password"};
                }
                callback(JSON.stringify(data));
            });

        }
    };

})();

module.exports = User;