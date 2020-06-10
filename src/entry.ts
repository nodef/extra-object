/**
 * Picks an arbitrary entry.
 * @param x an object
 * @param r random seed 0->1
 */
function entry(x: object, r: number=Math.random()): [string, any] {
  var es = Object.entries(x), ES = es.length;
  var i  = Math.floor(r*ES);
  return es[i];
}
export default entry;
