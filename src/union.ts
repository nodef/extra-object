import union$ from './union$';
import type {compareFn, mapFn} from './_types';

function union(x: object, y: object, fc: compareFn=null, fm: mapFn=null): object {
  return union$(Object.assign({}, x), y, fc, fm);
}
export default union;
