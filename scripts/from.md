Create [object] from [entries], like [Array.from()].

```javascript
const from = require('@extra-object/from');
// from(<entries>)

from([['g', 7], ['r', 18], ['a', 1]]);
// {'g': 7, 'r': 18, 'a': 1}
from([[13, 'm'], [5, 'e'], [18, 'r']]);
// {'13': 'm', '5': 'e', '18': 'r'}
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
[Array.from()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
