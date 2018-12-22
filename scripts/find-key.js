function findIndex(obj, fn, ths) {
  var K = Object.keys(obj);
  for(var i=0, I=K.length; i<I; i++)
    if(fn.call(ths, obj[K[i]], K[i], obj)) return K[i];
};
module.exports = findIndex;
