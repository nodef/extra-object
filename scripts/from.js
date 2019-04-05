function from(iterable) {
  var z = {};
  for(var [k, v] of iterable)
    z[k] = v;
  return z;
};
module.exports = from;
