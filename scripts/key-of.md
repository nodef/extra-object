Get first key of value in [object], like [Array.indexOf()].

```javascript
const keyOf = require('@extra-object/key-of');
// keyOf(<object>, <search value>)

keyOf({run: 'ran', jog: 'jogged'}, 'jogged');
// 'jog'
keyOf({r: 18, u: 21, n: 14}, 18);
// 'r'
keyOf({j: 10, o: 15, g: 7}, 5);
// undefined
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[Array.indexOf()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
