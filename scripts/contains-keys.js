function containsKeys(object, iterable) {
  for(var k of iterable)
    if(!(k in object)) return false;
  return true;
};
module.exports = containsKeys;
