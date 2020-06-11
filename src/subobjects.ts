import filterAt from './filterAt';
import {subsequences} from 'extra-array';

/**
 * Lists all possible subobjects.
 * @param x an object
 * @param n number of entries (-1 => any)
 */
function* subobjects(x: object, n: number=-1): IterableIterator<object> {
  for(var ks of subsequences(Object.keys(x), n))
    yield filterAt(x, ks);
}
export default subobjects;
