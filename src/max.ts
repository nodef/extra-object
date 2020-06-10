import range from './range';
import type {compareFn, mapFn} from './_types';

function max(x: object, fc: compareFn=null, fm: mapFn=null): [string, any] {
  return range(x, fc, fm)[1];
}
export default max;
