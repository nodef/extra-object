function fromEntries(entries) {
  var object = {};
  for(var e of entries)
    object[e[0]] = e[1];
  return object;
};
module.exports = Object.fromEntries||fromEntries;
