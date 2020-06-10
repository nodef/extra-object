import remove$ from './remove$';

function remove(x: object, p: string[]): object {
  return remove$(Object.assign({}, x), p);
}
export default remove;
