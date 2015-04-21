var AgileEstimation = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var logDateFormat = 'MM/dd/yyyy hh:mm:ss';
var ASC = 1;
var DESC = -1;
var dbCollection = "agileestimation";

    return {
        get: function (db, id, callback) {
                var collection = db.collection(dbCollection);
                var o_id = new ObjectID(id.toString());
                var where = {_id: o_id};
                var d = new Date();
                collection.findOne(where, function (err, data) {
                    if (err || null) console.log(err);
                    callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
                });
        },

       

        list: function (db, agileestimationtype, callback) {
            var where = {agileEstimationType : Number(agileestimationtype)};
            var d = new Date();
            var collection = db.collection(dbCollection);
            
            collection.find(where).sort({"value":ASC}).toArray(function (err, data) {
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },
      
    };

})();

module.exports = AgileEstimation;