var SinkoInstance;
var Sinko = (function (my) {
    my.available_selector_libraries = (function() {
      var available_libraries = [];

      if (typeof(Sizzle) != 'undefined') {
        available_libraries.push('sizzle');
        }

      if (typeof(jQuery) != 'undefined') {
        available_libraries.push('jquery');
        }

      return available_libraries;
    }());

    my.defaults = {
      selector_library: my.available_selector_libraries[0]
    };

    my.init = function(o) {
      o.sinko = SinkoInstance(o);
    };

    my.find = (function() {
      var find_using_sizzle = function(selector, context) {
        return Sizzle(selector, context);
      };
      var find_using_jquery = function(selector, context) {
        return jQuery(selector, context);
      };

      return function(selector, context) {
        switch(my.defaults.selector_library) {
          case 'sizzle':
            return find_using_sizzle(selector, context);
          case 'jquery':
            return find_using_jquery(selector, context);
        }
      };
    }());

    return my; 
}(Sinko || {}));

SinkoInstance = function(source) {
  var my = {};

  var _source;
  var _ins = {};
  var _outs = {};

  my._source = source;

  var value_from_selector = function(selector, context) {
    var source_element = Sinko.find(selector, context);

    if (source_element[0]) {
      switch (source_element[0].tagName) {
        case 'INPUT':
        case 'SELECT':
        case 'TEXTAREA':
          return source_element[0].value;
        default:
          return source_element[0].innerHTML;
      }
    }
  };

  my.ins = function(property_or_populating_function, source) {

    if (typeof(property_or_populating_function) === 'function') {
      _ins._base_sync = property_or_populating_function;
    } else if (property_or_populating_function == '_base_sync') {
      throw("Cannot use internal property name '_base_sync'");
    } else {
      _ins[property_or_populating_function] = source;
    }
  };

  my.outs = function(property, callback) {
    if (arguments.length > 1) {
      if (_outs[property] === undefined) {
        _outs[property] = [];
      }

      switch(typeof(callback)) {
        case 'function':
          _outs[property].push(callback);
          break;
        case 'object':
          _outs[property] = callback;
          break;
      }
    }

    return _outs[property];
  };

  my.sync_in = function() {
    if (_ins._base_sync !== undefined) {
      _ins._base_sync.apply(my._source);
    }

    for (property in _ins) {
      if (_ins.hasOwnProperty(property)) {
        if (property === '_base_sync') {
          continue;
        }

        switch(typeof(_ins[property])) {
          case 'undefined':
            my._source[property] = undefined;
            break;
          case 'function':
            my._source[property] = _ins[property].apply(my._source);
            break;
          case 'string':
            my._source[property] = value_from_selector(_ins[property]);
            break;
          case 'object':
            if (_ins[property].length > 0) {
              if (Sinko.selector_library == 'jquery') {
                my._source[property] = value_from_selector(_ins[property]);
              } else {
                my._source[property] = value_from_selector(_ins[property].selector);
              }
            }
          break;
        }
      }
    }
  };

  my.sync_out = function() {
    for (property in _outs) {
      for (var ii=0; ii<_outs[property].length; ii++) {
        _outs[property][ii].apply(my._source);
      }
    }
  };

  my.sync = function() {
    my.sync_in();
    my.sync_out();
  };

  return my;
}
