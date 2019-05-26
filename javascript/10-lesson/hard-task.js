(function (x, f = () => x) {
  var x;
  var y = x;
  x = 2;
  return [x, y, f()];
})(1);
// -> [2, 1, 1]

(function (x, f = () => x) {
  // var x;
  var y = x;
  x = 2;
  return [x, y, f()];
})(1);
// -> [2, 1, 2]

(function (x, f = () => x) {
  var x;
  var y = x;
  // x = 2;
  return [x, y, f()];
})(1);
// -> [1, 1, 1]