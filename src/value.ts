/**
 * Picks an arbitrary value.
 * @param x an object
 * @param r random seed 0->1
 */
function value(x: object, r: number=Math.random()): string {
  var vs = Object.values(x), VS = vs.length;
  var i  = Math.floor(r*VS);
  return vs[i];
}
export default value;
