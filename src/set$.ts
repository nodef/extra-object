import get from './get';

function set$(x: object, p: string[], v: any): object {
  var xp = get(x, p.slice(-1));
  if(xp && p.length) xp[p[p.length-1]] = v;
  return x;
}
export default set$;
