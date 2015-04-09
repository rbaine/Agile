var Account = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var logDateFormat = 'MM/dd/yyyy hh:mm:ss';
var ASC = 1;
var DESC = -1;
var dbCollection = "accounts";

    return {
        get: function (db, id, callback) {
                var collection = db.collection(dbCollection);
                var o_id = new ObjectID(id.toString());
                var where = {_id: o_id};
                var d = new Date();
                console.log('account.get ' + d.format(logDateFormat));
                collection.findOne(where, function (err, data) {
                    if (err || null) console.log(err);
                    callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
                });
        },

        post: function (db, data, callback) {
            var collection = db.collection(dbCollection);
            var d = new Date();
            console.log('account.put ' + d.format(logDateFormat));
            if (data._id !== null) {
                collection.insert(data, function(err, data){
                    if (err || null) {console.log(err); data = err;}
                    callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
                });
            } else {
                callback('{"err": "invalid input"}');
            }
        },

        delete: function (db, id, callback) {
            var o_id = new ObjectID(id.toString());
            var where = {_id: o_id};
            var collection = db.collection(dbCollection);
            var d = new Date();
            console.log('account.delete ' + d.format(logDateFormat));

            collection.remove(where, function(err, data){
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },

        put: function (db, data, callback) {
            var o_id = new ObjectID(data._id.toString());
            // need to convert the mongoDB string _id back to an ObjectID()
            data._id = o_id;

            var where = {_id: o_id};
            var collection = db.collection(dbCollection);
            var upd = {'$set': data};
            var d = new Date();
            console.log('account.update ' + d.format(logDateFormat));
            
            collection.update(where, upd, function (err, data){
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            }); 
        },

        list: function (db, callback) {
            var d = new Date();
            console.log('account.list ' + d.format(logDateFormat));
            var collection = db.collection(dbCollection);
            collection.find().sort({"_id":ASC}).toArray(function (err, data) {
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        }
    };

})();

module.exports = Account;