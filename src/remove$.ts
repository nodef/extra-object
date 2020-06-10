import get from './get';

function remove$(x: object, p: string[]): object {
  var xp = get(x, p.slice(-1));
  if(xp && p.length) delete xp[p[p.length-1]];
  return x;
}
export default remove$;
