function filter(object, callback, self) {
  var out = {};
  for(var k in object)
    if(callback.call(self, object[k], k, object)) out[k] = object[k];
  return out;
};
module.exports = filter;
