function value(object, value) {
  var z = {};
  for(var k in object)
    if(k!==value) z[k] = object[k];
  return z;
};
function array(object, value) {
  var z = {};
  for(var k in object)
    if(!value.includes(k)) z[k] = object[k];
  return z;
};
function set(object, value) {
  var z = {};
  for(var k in object)
    if(!value.has(k)) z[k] = object[k];
  return z;
};
function without(object, value) {
  if(object==null) return object;
  if(value instanceof Set) return set(object, value);
  if(Array.isArray(value)) return array(object, value);
  return value(object, value);
};
without.value = value;
without.array = array;
without.set = set;
module.exports = without;
