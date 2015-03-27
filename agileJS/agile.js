/**
 * UUID.core.js: The minimal subset of the RFC-compliant UUID generator UUID.js.
 *
 * @fileOverview
 * @author  LiosK
 * @version core-1.0
 * @license The MIT License: Copyright (c) 2012 LiosK.
 */

/** @constructor */
function UUID() {}

/**
 * The simplest function to get an UUID string.
 * @returns {string} A version 4 UUID string.
 */
UUID.generate = function() {
  var rand = UUID._gri, hex = UUID._ha;
  return  hex(rand(32), 8)          // time_low
        + "-"
        + hex(rand(16), 4)          // time_mid
        + "-"
        + hex(0x4000 | rand(12), 4) // time_hi_and_version
        + "-"
        + hex(0x8000 | rand(14), 4) // clock_seq_hi_and_reserved clock_seq_low
        + "-"
        + hex(rand(48), 12);        // node
};

/**
 * Returns an unsigned x-bit random integer.
 * @param {int} x A positive integer ranging from 0 to 53, inclusive.
 * @returns {int} An unsigned x-bit random integer (0 <= f(x) < 2^x).
 */
UUID._gri = function(x) { // _getRandomInt
  if (x <   0) return NaN;
  if (x <= 30) return (0 | Math.random() * (1 <<      x));
  if (x <= 53) return (0 | Math.random() * (1 <<     30))
                    + (0 | Math.random() * (1 << x - 30)) * (1 << 30);
  return NaN;
};

/**
 * Converts an integer to a zero-filled hexadecimal string.
 * @param {int} num
 * @param {int} length
 * @returns {string}
 */
UUID._ha = function(num, length) {  // _hexAligner
  var str = num.toString(16), i = length - str.length, z = "0";
  for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
  return str;
};

// vim: et ts=2 sw=2

Array.prototype.indexOfObj = function(key, valuetosearch) {
    for (var i = 0; i < this.length; i++) {
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
    function STORYTYPE(name, icon, color, dflt){
        this.id = UUID.generate();
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.dfltStoryType = dflt;
    }
    
    // New TASKTYPE constructor
    function TASKTYPE(name, icon, color, dflt){
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
        this.tags = [];
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
        this.storyId = 0;
        this.name = "";
        this.steps = "";
        this.priority = undefined;
        this.tags = [];
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
        getVer : function() {
            // return "Version: " + ver + "\nInstance: " + ACCOUNT.id;
            return ver;
        },
        init: function() {
          this.addStoryType("Feature", 0, 0, false);
          this.addStoryType("Bug", 0, 0, false);
          this.addStoryType("Change", 0, 0, false);
          
          this.addTaskType("Code", 0, 0, false);
          this.addTaskType("Document", 0, 0, false);
          this.addTaskType("Review", 0, 0, false);
          this.addTaskType("Test", 0, 0, false);
        },
        addStoryType: function(name, icon, color, dflt){
            var st = new STORYTYPE(name, icon, color, dflt);
            ACCOUNT.storyTypes.push(st);
            return st.id;
        },
        getStoryTypes : function() {
            return JSON.stringify(ACCOUNT.storyTypes);
        },
        addTaskType: function(name, icon, color, dflt){
            var tt = new TASKTYPE(name, icon, color, dflt);
            ACCOUNT.taskTypes.push(tt);
            return tt.id;
        },
        getTaskTypes: function() {
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
        deleteUser: function(id) {
            var u = ACCOUNT.users;
            u.splice(u.indexOfObj("id", id),1);
        },
        listUsers : function () {
            var userCount = ACCOUNT.users.length;
            console.log("\nNumber of Users: " + ACCOUNT.users.length);
            for (var i = 0; i < userCount; i++) {
                console.log("\t" + ACCOUNT.users[i].firstName + ' ' + ACCOUNT.users[i].lastName + " [" + ACCOUNT.users[i].id + "]  Admin: " + ACCOUNT.users[i].admin);
            }
            console.log("----------\n");
        },
        addProject : function (name) {
            var p = new PROJECT(name);
            var pos = 1;
            var i = 0;

            pos = ACCOUNT.projects.map(function (e) {
                    return e.name.toLowerCase();
                }).indexOf(name.toLowerCase());
            while (pos != -1) {
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
            for (var i = 0; i < projectCount; i++) {
                if (ACCOUNT.projects[i].name.toLowerCase() === name.toLowerCase()) {
                    ACCOUNT.projects.splice(i, 1);
                    return;
                }
            }
        },
        listProjects : function() {
            var projectCount = ACCOUNT.projects.length;
            console.log("\nProjects: " + projectCount);
            for (var i = 0; i < projectCount; i++) {
                console.log("\t" + ACCOUNT.projects[i].id + ' ' + ACCOUNT.projects[i].name);
            }
            console.log("-----\n");
        },
        addIteration: function(projectId, name, stDate, enDate) {
          var i = new ITERATION(name, stDate, enDate);
          var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
          proj.iterations.push(i);
          return i.id;
        },
        deleteIteration: function(projectId, iterationId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var i = proj.iterations.indexOfObj("id", iterationId);
            proj.iterations.splice(i,1);
            return;
        },
        listIterations: function(projectId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var iterationCount = proj.iterations.length;
            console.log("\nIterations: " + iterationCount);
            for (var i = 0; i < iterationCount; i++) {
                console.log(proj.iterations[i].id + ' ' + proj.iterations[i].name + " " + proj.iterations[i].startDate.toDateString() + " / " + proj.iterations[i].endDate.toDateString());
            }
        },
        addTeamMember: function(projectId, userId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            proj.team.push(userId);
        },
        deleteTeamMember: function(projectId, id) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            for (var i = 0; i < proj.team.length; i++) {
                if (proj.team[i] === id) {
                    proj.team.splic(i,1);
                    return;
                }
            }
        },
        listTeamMembers: function(projectId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            if (proj === undefined){
                console.log("Project not found");
            } else {
                console.log("\nTeam Members: " + proj.name);
                for (var i = 0; i < proj.team.length; i++) {
                    // console.log(proj.team[i] + " - " + ACCOUNT.users[ACCOUNT.users.indexOfObj("id", proj.team[i])].fullName());
                    console.log("\t" + proj.team[i] );
                }
                console.log("-----\n");
            }
        },
        getTeamMembers: function(projectId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            return JSON.stringify(proj.team);
        },
        addStory: function(projectId, title, description, tags, type, owner, agileEstimate, originalTimeEstimate) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var s = new STORY(title, description, tags, type, owner, agileEstimate, originalTimeEstimate);
            proj.stories.push(s);
            return s.id;
        },
        addStoryAcceptanceCriteria: function(projectId, storyId, criteria){
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var st = proj.stories[storyId].acceptanceCriteria = criteria;
        },
        listStories: function(projectId) {
          var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
          console.log("\nStories: ");
          for (var i = 0; i < proj.stories.length; i++) {
                console.log("\t" + i + " Title: " + proj.stories[i].title + "\n\tOwner: " + proj.stories[i].owner + " " + ACCOUNT.users[proj.stories[i].owner].fullName());
            }
            console.log("-----\n");
        },
        addTask: function(projectId, storyId, name, owner, state, blocked, originalTimeEstimate, timeSpent) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var story = proj.stories[ proj.stories.indexOfObj("id", storyId)];
            var t = new TASK(storyId, name, owner, state, blocked, originalTimeEstimate, timeSpent);
            story.tasks.push(t);
            return t.id;
        },
        listTasks: function(projectId, storyId) {
            var proj = ACCOUNT.projects[ACCOUNT.projects.indexOfObj("id", projectId)];
            var story = proj.stories[proj.stories.indexOfObj("id", storyId)];
            console.log("Task dump: ");
            console.log("storyId: " + storyId);
            for (var i = 0; i < story.tasks.length; i++){
                if (story.tasks[i].storyId == storyId) {
                    console.log("\tTask: " + story.tasks[i].storyId + " - " + story.tasks[i].name);
                }
            }
            console.log("-----\n");
        },
        getUserByPassword: function() {
            var u = ACCOUNT.users.indexOfObj("password", "222");
            var msg = (u !== null ) ? ACCOUNT.users[u].fullName() : "User not found.";
          console.log(msg);
        },
        saveApp: function() {
          return JSON.stringify(ACCOUNT);
        }
        


    };
})();

var u_id = [];
var p_id = [];
var t_id = [];
AGILE.init();
console.log("Hello from AGILE app.");
console.log(AGILE.getVer());
console.log("");



describe("AGILE Ver: TEST", function() {
var v = AGILE.getVer();
  it("Should be 0.1", function() {
    expect(v).toEqual("0.1");
  });
});


describe("AGILE addUser", function() {
var v = AGILE.addUser("Billy", "Bob", "999", "bb@me.com", false);
  it("Should return a UUID", function() {
    expect(v.length).toEqual(36);
  });
});

describe("AGILE listUsers", function() {
var v = AGILE.listUsers();
v = (typeof v == 'string') ? v : 'Billy Bob';
  it("listUsers", function() {
    expect(v.search("Billy Bob")).not.toEqual(-1);
  });
});


u_id.push(AGILE.addUser("Rod", "Baine", "111", "rbaine@me.com", true));
u_id.push(AGILE.addUser("Connor", "Baine", "222", "cbaine1@me.com", false));
u_id.push(AGILE.addUser("Cyndy", "Baine", "333", "cbaine@me.com"),false);

AGILE.listUsers();
// AGILE.deleteUser(u_id[1]);
// AGILE.listUsers();

p_id.push(AGILE.addProject("PP"));
p_id.push(AGILE.addProject("evo Upgrade"));
p_id.push(AGILE.addProject("iTrack"));
AGILE.listProjects();
console.log("");

t_id.push(AGILE.addTeamMember(p_id[0],u_id[0]));
t_id.push(AGILE.addTeamMember(p_id[0],u_id[1]));
AGILE.listTeamMembers(p_id[0]);

AGILE.listTeamMembers(p_id[1]);

t_id.push(AGILE.addTeamMember(p_id[2],u_id[0]));
t_id.push(AGILE.addTeamMember(p_id[2],u_id[1]));
t_id.push(AGILE.addTeamMember(p_id[2],u_id[2]));
AGILE.listTeamMembers(p_id[2]);
console.log("");




var it = 0;
var sd = new Date("03/16/2015");
var ed = new Date("03/20/2015");
it = AGILE.addIteration(p_id[0], "ITERATION 1", sd, ed);


var sd = new Date("03/23/2015");
var ed = new Date("03/30/2015");
AGILE.addIteration(p_id[0], "ITERATION 2", sd, ed);

var sd = new Date("03/16/2015");
var ed = new Date("03/30/2015");
AGILE.addIteration(p_id[0], "ITERATION 3", sd, ed);

AGILE.listIterations(p_id[0]);



// console.log("Team JSON: \n" + AGILE.getTeamMembers(2) + "\n");

id = AGILE.addStory(p_id[0], "new Story", "This is some description.", "", 0, 0, 1, 5);
AGILE.addTask(p_id[0], id, "new task 1", 0, 0, false, 0, 0);
AGILE.addTask(p_id[0], id, "new task 2", 0, 0, false, 0, 0);
AGILE.addTask(p_id[0], id, "new task 3", 0, 0, false, 0, 0);

// id = AGILE.addStory(1, "new Story for proj 2", "This is some description.", "", 0, 0, 1, 5);
// AGILE.addTask(1, id, "new task 11", 0, 0, false, 0, 0);
// AGILE.addTask(1, id, "new task 22", 0, 0, false, 0, 0);

AGILE.listStories(p_id[0]);
AGILE.listTasks(p_id[0], id);

// console.log("");
// AGILE.listTasks(0, 0);
// console.log("");
// AGILE.listTasks(1, 0);
// console.log("");


// AGILE.getUserByPassword();


// console.log(AGILE.saveApp());