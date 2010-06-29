module("Syncing markup from host object", {
  setup: function() {
    this.host = {};
    Sinko.init(this.host);

    this.host.sinko.ins('animal_name', "#syncing #animal_name");
    this.host.sinko.sync_in();
    ok(this.host.animal_name == "Dog", "Setup successful");
  },
  teardown: function() {
    this.host = undefined;
    $("#animal_name_out").attr("class", "");
  }
});

test("will execute a callback when sync_out'ing)", function() {
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 
  this.host.sinko.sync_out();

  var animal_name_out = $("#syncing_out #animal_name_out").html();
  ok(animal_name_out == this.host.animal_name, "element value was correctly set to the host value");
});

test("will execute multiple callbacks when sync_out'ing", function() {
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").attr("class", this.animal_name) }); 
  this.host.sinko.sync_out();

  var animal_name_out = $("#syncing_out #animal_name_out");
  ok(animal_name_out.html() == this.host.animal_name, "first callback set value");
  ok(animal_name_out.attr('class') == this.host.animal_name, "second callback set value")
});

test("will allow the user to retrieve an array of the callbacks", function() {
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").attr("class", this.animal_name) }); 

  var outs = this.host.sinko.outs('animal_name');

  ok(outs.length == 2, "callback queue is the correct length");
});

test("will allow the user to manipulate the array of callbacks", function() {
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").attr("class", this.animal_name) }); 

  var outs = this.host.sinko.outs('animal_name');
  outs.pop();

  this.host.sinko.outs('animal_name', outs);

  ok(this.host.sinko.outs('animal_name').length == 1, "callback queue was manipulated");

  this.host.sinko.sync_out();
  
  var animal_name_out = $("#syncing_out #animal_name_out");
  ok(animal_name_out.attr('class') != this.host.animal_name, 'second callback did not change the class');
  ok(animal_name_out.html() == this.host.animal_name, 'first callback set the animal name');
});

module("End of Syncing markup from host object");
