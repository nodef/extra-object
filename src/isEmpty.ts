/**
 * Checks if object is empty.
 * @param x an object
 */
function isEmpty(x: object): boolean {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    return false;
  }
  return true;
}
export default isEmpty;
