Check if value is present in [object], like [Array.includes()].

```javascript
const includes = require('@extra-object/includes');
// includes(<object>, <search value>)

var a = {a: 'fight', b: 'flight'};
includes(a, 'thought');
// false
includes(a, 'fight');
// true
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)
[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[Array.includes()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
