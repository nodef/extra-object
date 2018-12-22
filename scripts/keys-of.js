function keysOf(obj, val, z=[], z0=z.length) {
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue;
    if(obj[k]===val) z[z0++] = k;
  }
  return z;
};
module.exports = keysOf;
