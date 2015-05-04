var StoryNumber = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var logDateFormat = "MM/dd/yyyy hh:mm:ss";
var ASC = 1;
var DESC = -1;
var dbCollection = "storynumber";

    return {
        get: function (db, id, callback) {
                var collection = db.collection(dbCollection);
                var where = { projectId: id };
                collection.findOne(where, function (err, data) {
                    if (data === null) {
                        data = {};
                        data.projectId = id;
                        data.storyNumber = 1;
                    } else {
                        data.storyNumber += 1;
                    }
                    collection.save(data, {w:1}, function (err, data) {});   // update or insert storyNumber document
                    callback(data !== null ? JSON.stringify(data) : JSON.stringify(err)); // return story document to client
                });
        }
    };
})();

module.exports = StoryNumber;