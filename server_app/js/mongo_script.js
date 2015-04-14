// load("mongo_script.js")
// listUsers()


function listUsers() {
    return db.users.find().toArray();
}

function listStories() {
    return db.stories.find().toArray();
}


function listTasks() {
    return db.tasks.find().toArray();
}

function listModel() {
    var id = "5525569881cc63a80c68210e";
    var s = db.stories.findOne({ _id : ObjectId(id)});
    var t = db.tasks.find({ storyId : id}).toArray();

    // print('STORY - ');
    // print(typeof s);
    // print('name: ' + s.title );
    // print(JSON.stringify(s));

    // print('TASK - ');
    // print(typeof t);
    // print(JSON.stringify(t));

    s.tasks = t;
    
   
    return "\n\n\nStory Model\n" + JSON.stringify(s);


}


function createagileestimationtypes () {
    db.agileestimationtypes.drop();

    db.agileestimationtypes.insert({type: 0, name : 'Shirt Sizes'});
    db.agileestimationtypes.insert({type: 1, name : 'Coffee Cup Sizes'});
    db.agileestimationtypes.insert({type: 2, name : 'Fibonacci Numbers'});
    db.agileestimationtypes.insert({type: 3, name : 'Points'});
}

function createagileestimationList () {
    db.agileestimation.drop();

    db.agileestimation.insert({agileEstimationType: 0, name : 'x-small ', value : 1});
    db.agileestimation.insert({agileEstimationType: 0, name : 'small', value : 2});
    db.agileestimation.insert({agileEstimationType: 0, name : 'medium ', value : 3});
    db.agileestimation.insert({agileEstimationType: 0, name : 'large ', value : 4});
    db.agileestimation.insert({agileEstimationType: 0, name : 'x-large ', value : 5});
    db.agileestimation.insert({agileEstimationType: 1, name : 'small ', value : 1});
    db.agileestimation.insert({agileEstimationType: 1, name : 'tall', value : 2});
    db.agileestimation.insert({agileEstimationType: 1, name : 'grande', value : 3});
    db.agileestimation.insert({agileEstimationType: 1, name : 'venti ', value : 4});
    db.agileestimation.insert({agileEstimationType: 1, name : 'trenta ', value : 5});
    db.agileestimation.insert({agileEstimationType: 2, name : '0.5', value : 0.5});
    db.agileestimation.insert({agileEstimationType: 2, name : '1', value : 1});
    db.agileestimation.insert({agileEstimationType: 2, name : '2', value : 2});
    db.agileestimation.insert({agileEstimationType: 2, name : '3', value : 3});
    db.agileestimation.insert({agileEstimationType: 2, name : '5', value : 5});
    db.agileestimation.insert({agileEstimationType: 2, name : '8', value : 8});
    db.agileestimation.insert({agileEstimationType: 2, name : '13', value : 13});
    db.agileestimation.insert({agileEstimationType: 3, name : '1', value : 1});
    db.agileestimation.insert({agileEstimationType: 3, name : '2', value : 2});
    db.agileestimation.insert({agileEstimationType: 3, name : '3', value : 3});
    db.agileestimation.insert({agileEstimationType: 3, name : '4', value : 4});
    db.agileestimation.insert({agileEstimationType: 3, name : '5', value : 5});

}