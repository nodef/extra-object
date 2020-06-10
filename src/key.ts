/**
 * Picks an arbitrary key.
 * @param x an object
 * @param r random seed 0->1
 */
function key(x: object, r: number=Math.random()): string {
  var ks = Object.keys(x), KS = ks.length;
  var i  = Math.floor(r*KS);
  return ks[i];
}
export default key;
