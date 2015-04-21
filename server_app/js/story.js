var Story = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var logDateFormat = 'MM/dd/yyyy hh:mm:ss';
var ASC = 1;
var DESC = -1;
var dbCollection = "stories";

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

        post: function (db, data, callback) {
            var collection = db.collection(dbCollection);
            var d = new Date();
            collection.insert(data, function(err, data){
                if (err || null) {console.log(err); data = err;}
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },

        delete: function (db, id, callback) {
            var o_id = new ObjectID(id.toString());
            var where = {_id: o_id};
            var collection = db.collection(dbCollection);
            var d = new Date();
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
            collection.update(where, upd, function (err, data){
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            }); 
        },

        list: function (db, projectid, callback) {
            var where = {projectId: projectid};
            var d = new Date();
            var collection = db.collection(dbCollection);
            
            collection.find(where).sort({"_id":ASC}).toArray(function (err, data) {
                if (err || null) console.log(err);
                callback(data !== null ? JSON.stringify(data) : JSON.stringify(err));
            });
        },
        full: function (db, id, callback) {
                var colStories = db.collection("stories");
                var colTasks = db.collection("tasks");

                var o_id = new ObjectID(id.toString());
                var where = {_id: o_id};

                var _t = this;
                var story = null;
                var tasks = null;

                colStories.findOne(where, function (err, data) {
                    _t.story = (data !== null) ? data : {};

                    colTasks.find({storyId : o_id.toString()}).toArray(function (err, data) {
                        _t.tasks = (data !== null) ? data : [];
                        _t.story.tasks = _t.tasks;
                        callback(JSON.stringify( _t.story));
                    });
                });



        },
    };

})();

module.exports = Story;
