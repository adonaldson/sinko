module("Syncing to host object");

test("will populate its host from a css string from the elements html() value if it's a normal tag", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', "#syncing #animal_name");
  host.sinko.sync_in();
  ok(host.animal_name == "Dog", "Host value was not correctly set from an html element");
});

test("will populate its host from a jQuery object from the elements html() value if it's a normal tag", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', $("#syncing #animal_name"));
  host.sinko.sync_in();
  ok(host.animal_name == "Dog", "Host value was not correctly set from an html element");
});

test("will populate it's host from a css string from the elements val() if it's a form field", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', "#syncing #animal_field_input");
  host.sinko.sync_in();
  ok(host.animal_name == "Cat", "Host value was not correctly set from an input element");

  host.sinko.ins('animal_name', "#syncing #animal_field_select");
  host.sinko.sync_in();
  ok(host.animal_name == "Sheep", "Host value was not correctly set from a select element");

  host.sinko.ins('animal_name', "#syncing #animal_field_textarea");
  host.sinko.sync_in();
  ok(host.animal_name == "Duck", "Host value was not correctly set from a textarea");
});

test("will populate it's host from a jQuery object from the elements val() if it's a form field", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', $("#syncing #animal_field_input"));
  host.sinko.sync_in();
  ok(host.animal_name == "Cat", "Host value was not correctly set from an input element");

  host.sinko.ins('animal_name', $("#syncing #animal_field_select"));
  host.sinko.sync_in();
  ok(host.animal_name == "Sheep", "Host value was not correctly set from a select element");
});

test("will populate it's host from a passed in function", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', function() { return 'Goat'; });
  host.sinko.sync_in();
  ok(host.animal_name == "Goat", "Host value was not correctly set from a function");

  host.favourite_animal = "Fish";

  host.sinko.ins('animal_name', function() { return this.favourite_animal; });
  host.sinko.sync_in();
  ok(host.animal_name == "Fish", "Host value was not correctly set from a function");
});

test("will remove the sink if undefined is passed in", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', function() { return 'Goat'; });
  host.sinko.sync_in();

  host.sinko.ins('animal_name', undefined);
  host.sinko.sync_in();

  ok(host.animal_name == undefined);
});

// I can't think of a better name for this than 'base sync'
test("will populate the host entirely from one function (base sync)", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins(function() {
    this.animal_name = 'fish';
    this.animal_noise = 'glug';
  });
  host.sinko.sync_in();

  ok(host.animal_name === 'fish', 'host property does not matched synced value');
});

test("specific 'ins' will always take presidence over the base sync in", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', function() { return 'Goat'; });

  host.sinko.ins(function() {
    this.animal_name = 'fish';
    this.animal_noise = 'glug';
  });

  host.sinko.sync_in();

  ok(host.animal_name === 'Goat', 'host property does not matched synced value');
});

test("if you try to set up an 'in' with the _base_sync internal name, throw an error", function() {
  var host = {};
  Sinko.init(host);

  raises(function() {
    host.sinko.ins('_base_sync', function() { return 'Explosion!'; });
  }, 'should raise error');
});
