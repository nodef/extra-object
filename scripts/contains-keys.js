function containsKeys(obj, itr) {
  for(var k of itr)
    if(!(k in obj)) return false;
  return true;
};
module.exports = containsKeys;
