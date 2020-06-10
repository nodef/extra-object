/**
 * Removes first entry.
 * @param x an object (updated)
 * @returns x
 */
function shift$(x: object): object {
  for(var k in x) {
    if(!x.hasOwnProperty(k)) continue;
    delete x[k]; break;
  }
  return x;
}
