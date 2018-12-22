function find(obj, fn, ths) {
  var K = Object.keys(obj);
  for(var i=0, I=K.length; i<I; i++)
    if(fn.call(ths, obj[K[i]], K[i], obj)) return obj[K[i]];
};
module.exports = find;
