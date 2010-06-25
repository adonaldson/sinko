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
