function concat$(x: object, ...ys: object[]): object {
  return Object.assign(x, ...ys);
}
export default concat$;
