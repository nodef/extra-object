Create [object] from [lists] of keys and values.

```javascript
const fromLists = require('@extra-object/from-lists');
// fromLists(<lists>)

a = ['green', 'magic', 'beans'];
fromLists([a.keys(), a]);
// {0: 'green', 1: 'magic', 2: 'beans'}
fromLists([['w1', 'w2', 'w3'], a]);
// {w1: 'green', w2: 'magic', w3: 'beans'}
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[lists]: https://www.npmjs.com/package/@extra-lists/is
