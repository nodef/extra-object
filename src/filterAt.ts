function filterAt(x: object, ks: string[]): object {
  var a = {};
  for(var k of ks)
    a[k] = x[k];
  return a;
}
export default filterAt;
