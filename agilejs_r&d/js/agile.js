var UUID = require('./uuid.core');

Array.prototype.indexOfObj = function (key, valuetosearch) {
    var i = 0;
    for (i = 0; i < this.length; i++) {
        if (this[i][key].toLowerCase() === valuetosearch.toLowerCase()) {
            return i;
        }
    }
    return null;
};




var AGILE = (function () {
    "use strict";

    var ver = "0.1";

    var ACCOUNT = {
        id : UUID.generate(),
        plan : 0,
        storyTypes : [],
        taskTypes : [],
        enableIterations : true,
        enableAcceptanceCriteria : true,
        enableTests : true,
        enableTimeTracking : true,
        agileEstimationType : 0,
        users: [],
        projects: [],
        tests: []
    };

    // New USER constructor
    function USER(fn, ln, pwd, em, admin) {
        this.id = UUID.generate();
        this.firstName = fn;
        this.lastName = ln;
        this.password = pwd;
        this.email = em;
        this.admin = admin;
        this.fullName = function () {
            return this.firstName + " " + this.lastName;
        };
    }

    // New PROJECT constructor
    function PROJECT(name) {
        this.id = UUID.generate();
        this.name = name;
        this.team = [];
        this.iterations = [];
        this.stories = [];
    }

    // New STORYTYPE constructor
    function STORYTYPE(name, icon, color, dflt) {
        this.id = UUID.generate();
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.dfltStoryType = dflt;
    }

    // New TASKTYPE constructor
    function TASKTYPE(name, icon, color, dflt) {
        this.id = UUID.generate();
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.dfltTaskType = dflt;
    }

    // New ITERATION constructor
    function ITERATION(name, stDate, enDate) {
        this.id = UUID.generate();
        this.name = name;
        this.startDate = stDate;
        this.endDate = enDate;
    }

    // New STORY constructor
    function STORY(title, description, tags, type, owner, agileEstimate, originalTimeEstimate) {
        this.id = UUID.generate();
        this.title = title;
        this.description = description;
        this.tags = tags.split(",");
        this.type = type;
        this.owner = owner;
        this.state = undefined;
        this.iteration = 0;
        this.blocked = false;
        this.acceptanceCriteria = "";
        this.agileEstimate = agileEstimate;
        this.originalTimeEstimate = originalTimeEstimate;
        this.timeSpent = 0;
        this.timeLeft = function () {
            return this.originalTimeEstimate - this.timeSpent;
        };
        this.tasks = [];
        this.tests = [];
        this.acceptanceCriteria = [];
    }

    // New TASK constructor
    function TASK(storyId, name, owner, state, blocked, originalTimeEstimate, timeSpent) {
        this.id = UUID.generate();
        this.storyId = storyId;
        this.name = name;
        this.owner = owner;
        this.state = state;
        this.blocked = blocked;
        this.originalTimeEstimate = originalTimeEstimate;
        this.timeSpent = timeSpent;
        this.timeLeft = function () {
            return this.originalTimeEstimate - this.timeSpent;
        };
    }

    // New TEST constructor
    function TEST(storyId, name, steps, priority, tags) {
        this.id = UUID.generate();
        this.storyId = storyId;
        this.name = name;
        this.steps = steps;
        this.priority = priority;
        this.tags = tags.split(",");
        this.runs = [];
    }

    // New TESTRUN constructor
    function TESTRUN() {
        this.id = UUID.generate();
        this.testId = 0;
        this.result = undefined; // true or false
        this.testDate = "";
        this.testBy = "";
    }

    // New ACCEPTANCECRITERIA constructor
    function ACCEPTANCECRITERIA() {
        this.id = UUID.generate();
        this.criteria = "";
        this.satisfied = undefined;   // true or false
    }

    return {
        getVer : function () {
            // return "Version: " + ver + "\nInstance: " + ACCOUNT.id;
            return ver;
        },
        init: function () {
            this.addStoryType("Feature", 0, 0, false);
            this.addStoryType("Bug", 0, 0, false);
            this.addStoryType("Change", 0, 0, false);

            this.addTaskType("Code", 0, 0, false);
            this.addTaskType("Document", 0, 0, false);
            this.addTaskType("Review", 0, 0, false);
            this.addTaskType("Test", 0, 0, false);
        },
        addStoryType: function (name, icon, color, dflt) {
            var st = new STORYTYPE(name, icon, color, dflt);
            ACCOUNT.storyTypes.push(st);
            return st.id;
        },
        getStoryTypes : function () {
            return JSON.stringify(ACCOUNT.storyTypes);
        },
        addTaskType: function (name, icon, color, dflt) {
            var tt = new TASKTYPE(name, icon, color, dflt);
            ACCOUNT.taskTypes.push(tt);
            return tt.id;
        },
        getTaskTypes: function () {
            return JSON.stringify(ACCOUNT.taskTypes);
        },
        addUser : function (fn, ln, pwd, em, admin) {
            var u = new USER(fn, ln, pwd, em, admin);

            if (ACCOUNT.users.map(function (e) {
                    return e.email.toLowerCase();
                }).indexOf(em.toLowerCase()) > 0) {
                console.log("User " + u.firstName + " " + u.lastName + " already exists with that email. (" + u.email + ")");
            } else {
                ACCOUNT.users.push(u);
            }
            return u.id;
        },
        deleteUser: function (id) {
            var u = ACCOUNT.users;
            u.splice(u.indexOfObj("id", id), 1);
        },
        listUsers : function () {
            var userCount = ACCOUNT.users.length;
            var userList = [];
            var i = 0;
            for (i = 0; i < userCount; i++) {
                userList.push(ACCOUNT.users[i]);
            }
            return userList;
        },
        addProject : function (name) {
            var p = new PROJECT(name);
            var pos = 1;
            var i = 0;

            pos = ACCOUNT.projects.map(function (e) {
                return e.name.toLowerCase();
            }).indexOf(name.toLowerCase());
            while (pos !== -1) {
                i++;
                pos = ACCOUNT.projects.map(function (e) {
                    return e.name.toLowerCase();
                }).indexOf(name.toLowerCase() + " (" + i + ")");
            }

            p.name = (i === 0) ? name : name + " (" + i + ")";
            ACCOUNT.projects.push(p);
            return p.id;
        },
        deleteProject : function (name) {
            var projectCount = ACCOUNT.projects.length;
            var i = 0;
            for (i = 0; i < projectCount; i++) {
                if (ACCOUNT.projects[i].name.toLowerCase() === name.toLowerCase()) {
                    ACCOUNT.projects.splice(i, 1);
                    return;
                }
            }
        },
        listProjects : function () {
            var projectCount = ACCOUNT.projects.length;
            var projectList = [];
            var i = 0;
            for (i = 0; i < projectCount; i++) {
                projectList.push(ACCOUNT.projects[i]);
            }
            return projectList;
        },
        addIteration: function (projectId, name, stDate, enDate) {
            var i = new ITERATION(name, stDate, enDate);
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            proj.iterations.push(i);
            return i.id;
        },
        deleteIteration: function (projectId, iterationId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var i = proj.iterations.indexOfObj("id", iterationId);
            proj.iterations.splice(i, 1);
            return;
        },
        listIterations: function (projectId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var iterationCount = proj.iterations.length;
            var iterationList = [];
            var i = 0;
            for (i = 0; i < iterationCount; i++) {
                iterationList.push(proj.iterations[i]);
            }
            return iterationList;
        },
        addTeamMember: function (projectId, userId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            proj.team.push(userId);
        },
        deleteTeamMember: function (projectId, id) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var i = 0;
            for (i = 0; i < proj.team.length; i++) {
                if (proj.team[i] === id) {
                    proj.team.splic(i, 1);
                    return;
                }
            }
        },
        listTeamMembers: function (projectId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var teamMemberList = [];

            if (proj === undefined) {
                console.log("Project not found");
            } else {
                var i = 0;
                for (i = 0; i < proj.team.length; i++) {
                    // console.log(proj.team[i] + " - " + ACCOUNT.users[ACCOUNT.users.indexOfObj("id", proj.team[i])].fullName());
                    teamMemberList.push(proj.team[i]);
                }
            }
            return teamMemberList;
        },
        getTeamMembers: function (projectId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            return JSON.stringify(proj.team);
        },
        addStory: function (projectId, title, description, tags, type, owner, agileEstimate, originalTimeEstimate) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var s = new STORY(title, description, tags, type, owner, agileEstimate, originalTimeEstimate);
            proj.stories.push(s);
            return s.id;
        },
        addStoryAcceptanceCriteria: function (projectId, storyId, criteria) {
            // var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            // var st = proj.stories[storyId].acceptanceCriteria = criteria;
            return;
        },
        listStories: function (projectId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var storyList = [];
            var i = 0;
            for (i = 0; i < proj.stories.length; i++) {
                storyList.push(proj.stories[i]);
            }
            return storyList;
        },
        addTask: function (projectId, storyId, name, owner, state, blocked, originalTimeEstimate, timeSpent) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var story = proj.stories[proj.stories.indexOfObj("id", storyId)];
            var t = new TASK(storyId, name, owner, state, blocked, originalTimeEstimate, timeSpent);
            story.tasks.push(t);
            return t.id;
        },
        listTasks: function (projectId, storyId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var story = proj.stories[proj.stories.indexOfObj("id", storyId)];
            var taskList = [];
            var i = 0;
            for (i = 0; i < story.tasks.length; i++) {
                if (story.tasks[i].storyId === storyId) {
                    taskList.push(story.tasks[i]);
                }
            }
            return taskList;
        },
        saveApp: function () {
            return JSON.stringify(ACCOUNT);
        }
    };
}());

module.exports = AGILE;
