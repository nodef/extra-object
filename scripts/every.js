function every(obj, fn, ths) {
  var K = Object.keys(obj);
  for(var i=0, I=K.length; i<I; i++)
    if(!fn.call(ths, obj[K[i]], K[i], obj)) return false;
  return true;
};
module.exports = every;
