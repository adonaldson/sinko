module("Sync in, sync out");

test("will populate itself using sync_in() then update markup using sync_out() when sync()ing", function() {
  var host = {};
  Sinko.init(host);

  host.sinko.ins('animal_name', "#syncing #animal_name");
  host.sinko.outs('animal_name', function() { $("#animal_name_out").html(this.animal_name) }); 

  host.sinko.sync();
  ok(host.animal_name == "Dog", "sync_in was probably executed");

  var animal_name_out = $("#syncing_out #animal_name_out").html();
  ok(animal_name_out == host.animal_name, "sync_out was probably executed");
});

test("will run sync_in() followed by sync_out() when sync()ing", function() {
  var host = {};
  Sinko.init(host);

  var sync = $("#sync");
  host.sinko.sync_in = function() { sync.html(sync.html() + 'in'); }
  host.sinko.sync_out = function() { sync.html(sync.html() + 'out'); }

  host.sinko.sync();
  ok(sync.html() == 'inout', 'sync() executed sync_in() first, followed by sync_out()');
});

module("End of sync in, sync out");
