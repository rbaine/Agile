
var AGILE = require('../agile');



var u_id = [];
var p_id = [];
var t_id = [];
var s_id = [];
AGILE.init();
console.log("Hello from AGILE app.");
console.log(AGILE.getVer());
console.log("");




u_id.push(AGILE.addUser("Rod", "Baine", "111", "rbaine@me.com", true));
u_id.push(AGILE.addUser("Connor", "Baine", "222", "cbaine1@me.com", false));
u_id.push(AGILE.addUser("Cyndy", "Baine", "333", "cbaine@me.com", false));
console.log('\nUser List --');
console.log(AGILE.listUsers());

AGILE.deleteUser(u_id[1]);
console.log('\nUser List --');
console.log(AGILE.listUsers());



p_id.push(AGILE.addProject("PP"));
p_id.push(AGILE.addProject("evo Upgrade"));
p_id.push(AGILE.addProject("iTrack"));
console.log('\nProject List --');
console.log(AGILE.listProjects());



t_id.push(AGILE.addTeamMember(p_id[0], u_id[0]));
t_id.push(AGILE.addTeamMember(p_id[0], u_id[1]));
console.log("\nTeam Member List ---");
console.log(AGILE.listTeamMembers(p_id[0]));


t_id.push(AGILE.addTeamMember(p_id[2], u_id[0]));
t_id.push(AGILE.addTeamMember(p_id[2], u_id[1]));
t_id.push(AGILE.addTeamMember(p_id[2], u_id[2]));
console.log("\nTeam Member List ---");
console.log(AGILE.listTeamMembers(p_id[2]));



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

console.log("\nIteration List ---");
console.log(AGILE.listIterations(p_id[0]));

console.log("Team JSON: \n" + AGILE.getTeamMembers(p_id[2]) + "\n");

s_id.push(AGILE.addStory(p_id[0], "New Story 1", "This is some description for story 1.", "tag1, tag2, tag3", 0, 0, 1, 5));
s_id.push(AGILE.addStory(p_id[0], "New Story 2", "This is some description for story 2.", "", 0, 0, 1, 5));
s_id.push(AGILE.addStory(p_id[0], "New Story 3", "This is some description for story 3.", "", 0, 0, 1, 5));

console.log(AGILE.listStories(p_id[0]));

//projectId, 
//storyId, 
//name, 
//owner, 
// state, 
// blocked, 
// originalTimeEstimate, 
// timeSpent

AGILE.addTask(p_id[0], s_id[0], "new task 1", u_id[0], 0, false, 0, 0);
AGILE.addTask(p_id[0], s_id[0], "new task 2", 0, 0, false, 0, 0);
AGILE.addTask(p_id[0], s_id[0], "new task 3", 0, 0, false, 0, 0);


console.log("\nTask List ---");
console.log(AGILE.listTasks(p_id[0], s_id[0]));



console.log(AGILE.saveApp());