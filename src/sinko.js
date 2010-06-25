var Sinko = (function (my) {
    var _source = undefined;
    var _ins = {};
    var _outs = {};
    
    my.init = function(o) {
      o.sinko = Sinko;
      o.sinko._source = o;
    };

    var value_from_selector = function(selector) {
      var source_element = $(selector);

      if (source_element.is(":input"))
        return source_element.val();
      else
        return source_element.html();
    };

    my.ins = function(property, source) {
      _ins[property] = source;
    };

    my.outs = function(property, callback) {
      if (arguments.length > 1) {
        if (_outs[property] == undefined)
          _outs[property] = [];

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
      for (property in _ins) {
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
            if (_ins[property].length > 0)
              my._source[property] = value_from_selector(_ins[property]);
            break
        }
      }
    };

    my.sync_out = function() {
      for (property in _outs) {
        for (var ii=0; ii<_outs[property].length; ii++)
          _outs[property][ii].apply(my._source);
      }
    };

    return my; 
}(Sinko || {}));
