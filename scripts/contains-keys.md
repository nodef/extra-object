Check if an [object] contains specified keys.

```javascript
const containsKeys = require('@extra-object/contains-keys');
// containsKeys(<object>, <search iterable>)

var a = {river: 'R', canal: 'C', stream: 'S'};
containsKeys(a, ['river', 'stream']);
// true
containsKeys(a, ['river', 'stream', 'rapid']);
// false
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
