# Sinko: Syncing javascript to stuff

Build your object in JS. Sync it in from $source, Sync it out to $destination.

<a href="https://github.com/dies-el/sinko/tree/master/test">The tests</a> are probably the most thorough documentation at the moment. See below for usage.

## Requirement:
* jQuery or Sizzle

## Building
To build the source into a minified.js, just run 'rake' in the checked out folder.

Minifying rake task pinched from @i_am_cam / http://github.com/cameronyule/github-api.js, ta!

## Usage

### Initialisation
Initialize the object -- this gives you a 'sinko' object in your host

    var host = {
      animal_name: undefined,
      animal_noise: undefined,
      animal_flavour: undefined
    };

    Sinko.init(host);

### Syncing
You trigger the syncing action by calling either:

    host.sync_in();
    // or
    host.sync_out();
    // or do in then out
    host.sync();

But really you want to set your 'ins' first -- populate your objects values

### Setting up 'in's
    // Set all the values in one go -- you could do this from an AJAX call
    host.sinko.ins(function() {
      this.animal_name = 'Pig';
      this.animal_noise = 'Oink';
      this.animal_flavour = 'Bacony';
    });

    //Or you can do it on a per-property basis:
    // From a CSS selector
    host.sinko.ins('animal_name', "#animal_name_field");

    // or from a jQuery object
    var animal_noise_field = $("#animal_noise");
    host.sinko.ins('animal_noise', animal_noise_field);

    // or from a function's return value
    host.sinko.ins('animal_flavour', function() {
      return 'Pork-like';
    });

### Setting up 'out's
    host.sinko.outs('animal_name', function() {
      $("#animal_name_title").html(this.animal_name);
    });

    // You can set multiple callbacks...
    host.sinko.outs('animal_name', function() {
      $("#animal_name_link_name").html(this.animal_name);
    });

For extra customisation, you can mess about with the callback array
    var outs = this.host.sinko.outs('animal_name');
    outs.pop(); // Only one callback will run
    host.sinko.outs('animal_name', outs);

### Switching selector engine
To use sinko with Sizzle, include the following line in your code:

    Sinko.defaults.selector_library = 'sizzle';

Licensed under MIT (see MIT-LICENSE.txt)

Copyright (c) 2010 Andrew Donaldson http://dies-el.co.uk/

