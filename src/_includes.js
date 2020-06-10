function includes(object, value) {
  for(var k in object) {
    if(!object.hasOwnProperty(k)) continue;
    if(object[k]===value) return true;
  }
  return false;
};
module.exports = includes;
