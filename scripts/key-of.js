function keyOf(obj, val) {
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue;
    if(obj[k]===val) return k;
  }
};
module.exports = keyOf;
