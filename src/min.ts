import range from './range';
import type {compareFn, mapFn} from './_types';

function min(x: object, fc: compareFn=null, fm: mapFn=null): [string, any] {
  return range(x, fc, fm)[0];
}
export default min;
