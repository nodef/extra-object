function value(obj, val) {
  var z = {};
  for(var k in obj)
    if(k!==val) z[k] = obj[k];
  return z;
};
function array(obj, val) {
  var z = {};
  for(var k in obj)
    if(!val.includes(k)) z[k] = obj[k];
  return z;
};
function set(obj, val) {
  var z = {};
  for(var k in obj)
    if(!val.has(k)) z[k] = obj[k];
  return z;
};
function without(obj, val) {
  if(obj==null) return obj;
  if(val instanceof Set) return set(obj, val);
  if(Array.isArray(val)) return array(obj, val);
  return value(obj, val);
};
without.value = value;
without.array = array;
without.set = set;
module.exports = without;
