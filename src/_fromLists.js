function fromLists(lists) {
  var vi = lists[1][Symbol.iterator](), z = {};
  for(var k of lists[0])
    z[k] = vi.next().value;
  return z;
};
module.exports = fromLists;
