Get first value in [object] that satisfies the test, like [Array.find()].

```javascript
const find = require('@extra-object/find');
// find(<object>, <test function>, [this])

find({a: 'chupa', b: 'chupi'}, (v) => v.startsWith('chup'));
// 'chupa'
find({'mer': 1, 'ven': 2, 'ear': 3}, (v, k) => k[0]==='e');
// 3
find({ligo0: 'Hanford Site, US', ligo1: 'Livingston, US', ligo2: 'Hingoli, India'}, (v, k, obj) => k==='ligo'+(Object.keys(obj).length-1));
// 'Hingoli, India'
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[Array.find()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
