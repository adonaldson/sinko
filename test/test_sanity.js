module("Sanity check");

test("Ensure module exists", function() {
  ok(Sinko != undefined, "Sinko is not defined");
});

module("Initalising")

test("will create a 'sinko' property on the host object", function() {
  var host = {};
  Sinko.init(host);

  ok(host.sinko != undefined, "'sinko' property has not been set on host object");
});

test("will allow 'sinko' to exist on many objects at once and not conflict", function() {
  var host = {};
  var host2 = {};

  Sinko.init(host);
  Sinko.init(host2);

  host.sinko.test = "Fish";

  ok(host.sinko.test != host2.sinko.test, "sinko property is the same object on both host objects");
});
