function concat(...xs: object[]): object {
  return Object.assign({}, ...xs);
}
export default concat;
