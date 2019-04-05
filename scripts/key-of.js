function keyOf(object, value) {
  for(var k in object) {
    if(!object.hasOwnProperty(k)) continue;
    if(object[k]===value) return k;
  }
};
module.exports = keyOf;
