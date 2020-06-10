import compare from './compare';
import type {compareFn, mapFn} from './_types';

function isEqual(x: object, y: object, fc: compareFn=null, fm: mapFn=null): boolean {
  return compare(x, y, fc, fm)===0;
}
export default isEqual;
