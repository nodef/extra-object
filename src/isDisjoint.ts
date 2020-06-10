function isDisjoint(...xs: object[]): boolean {
  if(xs.length===0) return true;
  var x = xs[0], ys = xs.slice(1);
  x: for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    for(var y in ys)
      if(!y.hasOwnProperty(k)) continue x;
    return false;
  }
  return true;
}
export default isDisjoint;
