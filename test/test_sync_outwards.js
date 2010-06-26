module("Syncing markup from host object", {
  setup: function() {
    this.host = {};
    Sinko.init(this.host);

    this.host.sinko.ins('animal_name', "#syncing #animal_name");
    this.host.sinko.sync_in();
    ok(this.host.animal_name == "Dog", "Setup successful");
  }
});

test("will execute a callback when sync_out'ing)", function() {
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 
  this.host.sinko.sync_out();

  var animal_name_out = $("#syncing_out #animal_name_out").html();
  ok(animal_name_out == this.host.animal_name, "element value was not correctly set to the host value");
});

test("will execute multiple callbacks when sync_out'ing", function() {
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").attr("class", this.animal_name) }); 
  this.host.sinko.sync_out();

  var animal_name_out = $("#syncing_out #animal_name_out");
  ok(animal_name_out.html() == this.host.animal_name, "first callback failed to set value");
  ok(animal_name_out.attr('class') == this.host.animal_name, "second callback failed to set value")
});

test("will allow the user to retrieve an array of the callbacks", function() {
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 
  this.host.sinko.outs('animal_name', function() { $("#animal_name_out").attr("class", this.animal_name) }); 

  var outs = this.host.sinko.outs('animal_name');

  // This is because 'sinko' is a module rather than an instance -- need to fix that
  ok(outs.length == 2, "callback queue is not the correct length");
});

module("End of Syncing markup from host object");
