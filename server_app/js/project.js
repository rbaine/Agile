var Project = (function () {
"use strict";
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var logDateFormat = 'MM/dd/yyyy hh:mm:ss.SSS';
var ASC = 1;
var DESC = -1;
var dbCollection = "projects";

    return {
        get: function (db, id, callback) {
            //TODO: need to add storytypes and agile estimation to this get function
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

        list: function (db, userid, callback) {
            var _this = this;
            var where = {userId: userid};
            var colProjects = db.collection("projects");
            var colStoryTypes = db.collection("storytypes");
            var colAgileEstimation = db.collection("agileestimation");
            var projects = [];
            
            colProjects.find(where).toArray(function (err, data) {

                async.each( data, 
                            function(project, callback) {

                                // using async.js to serialize db calls to avoid nested callbacks
                                async.series([
                                    function (call) {
                                        colStoryTypes.find({projectId : project._id.toString()}).toArray(function (err, data) {
                                            project.storyTypes = data;
                                            call(null, '');
                                        });
                                    },
                                    function (call) {
                                        colAgileEstimation.find({agileEstimationType : project.agileEstimationType}).toArray(function (err, data) {
                                            project.agileEstimation = data;
                                            call(null, '');
                                        });
                                    }
                                    ], function (err, result) {
                                        projects.push(project);
                                        callback();
                                    });

                            },
                            function(err) {
                                callback(JSON.stringify(projects));
                            });   // end of async.each()
            });

        }
    };

})();

module.exports = Project;