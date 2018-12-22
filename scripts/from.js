function from(itr) {
  var z = {};
  for(var [k, v] of itr)
    z[k] = v;
  return z;
};
module.exports = from;
