Test if all values of [object] pass the specified test, like [Array.every()].

```javascript
const every = require('@extra-object/every');
// every(<object>, <test function>, [this])

every({'g': 7, 'r': 18, 'a': 1}, (v) => v>0);
// true
every({'m': 13, 'e': 5, 'r': 18}, (v) => v>=1 && v<=26);
// true
every({'w': 23.1, 'r': 18, 'd': 4}, (v, k, obj) => v>=1 && v<=26 && Math.floor(v)===v && k.length===1);
// false
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[Array.every()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
