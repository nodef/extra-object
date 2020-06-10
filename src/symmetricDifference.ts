import unionKeys from './unionKeys';

function symmetricDifference(x: object, y: object): object {
  var ks = unionKeys(x, y), a = {};
  for(var k of ks) {
    var xk = x.hasOwnProperty(k);
    var yk = y.hasOwnProperty(k);
    if(xk && !yk) a[k] = x[k];
    else if(!xk && yk) a[k] = y[k]; 
  }
  return a;
}
export default symmetricDifference;
