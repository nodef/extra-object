import set$ from './set$';

function set(x: object, p: string[], v: any): object {
  return set$(Object.assign({}, x), p, v);
}
export default set;
