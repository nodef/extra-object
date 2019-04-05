function keyOf(object, value) {
  for(var k in object) {
    if(!object.hasOwnProperty(k)) continue;
    if(object[k]===value) return k;
  }
}
function keysOf(object, value, target=[], offset=target.length) {
  for(var k in object) {
    if(!object.hasOwnProperty(k)) continue;
    if(object[k]===value) target[offset++] = k;
  }
  return target;
}
function containsKeys(object, iterable) {
  for(var k of iterable)
    if(!(k in object)) return false;
  return true;
}
function includes(object, value) {
  for(var k in object) {
    if(!object.hasOwnProperty(k)) continue;
    if(object[k]===value) return true;
  }
  return false;
}
function from(iterable) {
  var z = {};
  for(var [k, v] of iterable)
    z[k] = v;
  return z;
}
function fromLists(lists) {
  var vi = lists[1][Symbol.iterator](), z = {};
  for(var k of lists[0])
    z[k] = vi.next().value;
  return z;
}
function fromEntries(entries) {
  var object = {};
  for(var e of entries)
    object[e[0]] = e[1];
  return object;
}
const exports6 = Object.fromEntries||fromEntries;
function value(object, value) {
  var z = {};
  for(var k in object)
    if(k!==value) z[k] = object[k];
  return z;
}
function array(object, value) {
  var z = {};
  for(var k in object)
    if(!value.includes(k)) z[k] = object[k];
  return z;
}
function set(object, value) {
  var z = {};
  for(var k in object)
    if(!value.has(k)) z[k] = object[k];
  return z;
}
function without(object, value) {
  if(object==null) return object;
  if(value instanceof Set) return set(object, value);
  if(Array.isArray(value)) return array(object, value);
  return value(object, value);
}
without.value = value;
without.array = array;
without.set = set;
function every(object, callback, self) {
  var K = Object.keys(object);
  for(var i=0, I=K.length; i<I; i++)
    if(!callback.call(self, object[K[i]], K[i], object)) return false;
  return true;
}
function find(object, callback, self) {
  var K = Object.keys(object);
  for(var i=0, I=K.length; i<I; i++)
    if(callback.call(self, object[K[i]], K[i], object)) return object[K[i]];
}
function findIndex(object, callback, self) {
  var K = Object.keys(object);
  for(var i=0, I=K.length; i<I; i++)
    if(callback.call(self, object[K[i]], K[i], object)) return K[i];
}
// 1. Search methods
Object.keyOf = keyOf;
Object.keysOf = keysOf;
Object.containsKeys = containsKeys;
Object.includes = includes;

// 2. Generate methods
Object.from = from;
Object.fromLists = fromLists;
Object.fromEntries = exports6;

// 3. Transform methods
Object.without = without;

// 4. Functional methods
Object.every = every;
Object.find = find;
Object.findKey = findIndex;
module.exports = Object;
