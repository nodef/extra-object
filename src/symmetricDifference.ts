import unionKeys from './unionKeys';

/**
 * Gives entries not present in both objects.
 * @param x an object
 * @param y another object
 */
function symmetricDifference(x: object, y: object): object {
  var a = {};
  for(var k of unionKeys(x, y)) {
    var xk = x.hasOwnProperty(k);
    var yk = y.hasOwnProperty(k);
    if(xk && !yk) a[k] = x[k];
    else if(!xk && yk) a[k] = y[k]; 
  }
  return a;
}
export default symmetricDifference;
