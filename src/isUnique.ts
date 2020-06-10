import {isUnique as iterableIsUnique} from 'extra-iterable';
import type {compareFn, mapFn} from './_types';

function isUnique(x: object, fc: compareFn=null, fm: mapFn=null): boolean {
  if(fc || fm) return iterableIsUnique(Object.keys(x), fc, fm as any);
  else return true;
}
export default isUnique;
