import filterAt from './filterAt';

function chunk(x: object, n: number=1, s: number=n): object[] {
  var ks = Object.keys(x), a = [];
  for(var i=0, I=ks.length; i<I; i+=s)
    a.push(filterAt(x, ks.slice(i, i+n)));
  return a;
}
export default chunk;
