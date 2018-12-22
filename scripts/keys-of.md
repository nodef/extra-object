Get keys of value in [object], like [Array.indexOf()].

```javascript
const keysOf = require('@extra-object/keys-of');
// keysOf(<object>, <search value>, [target=[]], [at])

var a = {r: 'R', o: 'O', b: 'B', e: 'O'};
keysOf(a, 'o');
// ['o', 'e']
keysOf(a, 'o', ['a', 'b']);
// ['a', 'e', 'o', 'e']
keysOf(a, 'o', ['a', 'b'], 1);
// ['a', 'o', 'e']
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[Array.indexOf()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
