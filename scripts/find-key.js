function findIndex(object, callback, self) {
  var K = Object.keys(object);
  for(var i=0, I=K.length; i<I; i++)
    if(callback.call(self, object[K[i]], K[i], object)) return K[i];
};
module.exports = findIndex;
