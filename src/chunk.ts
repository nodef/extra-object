import filterAt from './filterAt';

/**
 * Breaks object into chunks of given size.
 * @param x an object
 * @param n chunk size (1)
 * @param s chunk step (n)
 */
function chunk(x: object, n: number=1, s: number=n): object[] {
  var ks = Object.keys(x), a = [];
  for(var i=0, I=ks.length; i<I; i+=s)
    a.push(filterAt(x, ks.slice(i, i+n)));
  return a;
}
export default chunk;
