// var a = require('agileJS');

function adder(a, b){
  return a + (b * 1);
};



describe("AGILE Ver TEST", function() {

  it("Should be true", function() {
    expect(true).toEqual(true);
    
  });
});




describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
}); 
 

describe("simple test", function() {
    
  it("a=a", function() {
    expect('a').toEqual('a');
  });
});

describe("TEST - addr() = 5", function() {
  var r = adder(1,4);
  
  it("adder should return 5", function() {
    expect(r).toEqual(5);
  });
});

console.log('boo');

