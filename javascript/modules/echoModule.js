;(function() {
  let echo = function() {
    console.log.apply(this, arguments);
  };

  window.echo = echo;
})();