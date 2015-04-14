var AgileEstimationType = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var logDateFormat = 'MM/dd/yyyy hh:mm:ss';
var ASC = 1;
var DESC = -1;
var dbCollection = "agileestimationtypes";

    return {

        list: function (db, callback) {
            var d = new Date();
            console.log('agileestimationtypes.list ' + d.format(logDateFormat));
            var collection = db.collection(dbCollection);
            
            collection.find().sort({"type":ASC}).toArray(function (err, data) {
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        }
      
    };

})();

module.exports = AgileEstimationType;