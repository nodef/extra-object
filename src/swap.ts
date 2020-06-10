import swap$ from './swap$';

function swap(x: object, k: string, l: string): object {
  return swap$(Object.assign({}, x), k, l);
}
export default swap;
