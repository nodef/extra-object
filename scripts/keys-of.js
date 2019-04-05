function keysOf(object, value, target=[], offset=target.length) {
  for(var k in object) {
    if(!object.hasOwnProperty(k)) continue;
    if(object[k]===value) target[offset++] = k;
  }
  return target;
};
module.exports = keysOf;
