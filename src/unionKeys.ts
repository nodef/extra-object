function unionKeys(...xs: object[]): Set<string> {
  var a = new Set<string>();
  for(var x of xs) {
    for(var k in x) {
      if(!x.hasOwnProperty(k)) continue;
      a.add(k);
    }
  }
  return a;
}
export default unionKeys;
