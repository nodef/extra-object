function fromLists(lst) {
  var vi = lst[1][Symbol.iterator](), z = {};
  for(var k of lst[0])
    z[k] = vi.next().value;
  return z;
};
module.exports = fromLists;
