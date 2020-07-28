(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kefir'], factory); // AMD
  } else if (typeof exports === 'object') {
    factory(require('kefir')); // CommonJS
  } else {
    factory(root.Kefir); // Browser globals
  }
})(typeof self !== 'undefined' ? self : this, function (Kefir) {
  Kefir.$ = {};
  Kefir.$.init = function ($) {
    $.fn.asKefirStream = function (eventName, selector, transformer) {
      var $el = this;
      if (transformer === null && selector !== null && 'string' !== typeof selector) {
        transformer = selector;
        selector = null;
      }
      return Kefir.fromBinder(
        function(handler) {
          $el.on(eventName, selector, handler)
          return function () {$el.off(eventName, selector, handler)}
        },
        transformer
      ).setName('asKefirStream');
    }
  };
});
