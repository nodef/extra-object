/**
 * Joins entries together.
 * @param x an object
 * @param sep separator (,)
 * @param asc associator (=)
 */
function join(x: object, sep: string=',', asc: string='='): string {
  var a = '';
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    a += k+asc+x[k]+sep;
  }
  return a.slice(0, -sep.length);
}
export default join;
