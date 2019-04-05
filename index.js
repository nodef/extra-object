function keyOf(obj, val) {
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue;
    if(obj[k]===val) return k;
  }
}
function keysOf(obj, val, z=[], z0=z.length) {
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue;
    if(obj[k]===val) z[z0++] = k;
  }
  return z;
}
function containsKeys(obj, itr) {
  for(var k of itr)
    if(!(k in obj)) return false;
  return true;
}
function includes(obj, val) {
  for(var k in obj) {
    if(!obj.hasOwnProperty(k)) continue;
    if(obj[k]===val) return true;
  }
  return false;
}
function from(itr) {
  var z = {};
  for(var [k, v] of itr)
    z[k] = v;
  return z;
}
function fromLists(lst) {
  var vi = lst[1][Symbol.iterator](), z = {};
  for(var k of lst[0])
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
function value(obj, val) {
  var z = {};
  for(var k in obj)
    if(k!==val) z[k] = obj[k];
  return z;
}
function array(obj, val) {
  var z = {};
  for(var k in obj)
    if(!val.includes(k)) z[k] = obj[k];
  return z;
}
function set(obj, val) {
  var z = {};
  for(var k in obj)
    if(!val.has(k)) z[k] = obj[k];
  return z;
}
function without(obj, val) {
  if(obj==null) return obj;
  if(val instanceof Set) return set(obj, val);
  if(Array.isArray(val)) return array(obj, val);
  return value(obj, val);
}
without.value = value;
without.array = array;
without.set = set;
function every(obj, fn, ths) {
  var K = Object.keys(obj);
  for(var i=0, I=K.length; i<I; i++)
    if(!fn.call(ths, obj[K[i]], K[i], obj)) return false;
  return true;
}
function find(obj, fn, ths) {
  var K = Object.keys(obj);
  for(var i=0, I=K.length; i<I; i++)
    if(fn.call(ths, obj[K[i]], K[i], obj)) return obj[K[i]];
}
function findIndex(obj, fn, ths) {
  var K = Object.keys(obj);
  for(var i=0, I=K.length; i<I; i++)
    if(fn.call(ths, obj[K[i]], K[i], obj)) return K[i];
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
