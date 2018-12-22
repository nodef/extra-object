function includes(obj, val) {
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue;
    if(obj[k]===val) return true;
  }
  return false;
};
module.exports = includes;
