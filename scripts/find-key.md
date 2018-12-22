Get index of first value in [object] that satisfies the test, like [Array.findIndex()].

```javascript
const findIndex = require('@extra-object/find-key');
// findIndex(<object>, <test function>, [this])

findIndex({tesla: 'semi-truck', spacex: 'falcon 9'}, (v) => v.startsWith('falcon'));
// 'spacex'
findIndex({spacex: 'falcon 9', blueorigin: 'new shepard'}, (v, k) => k.indexOf('new')<0);
// 'spacex'
findIndex({pa1: 'LHC', pa2: 'KEKB', pa3: 'RHIC', pa4: 'Tevatron'}, (v, k, obj) => k==='pa'+Object.keys(obj).length);
// 'pa4'
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[Array.findIndex()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
