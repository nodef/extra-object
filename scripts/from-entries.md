Create [object] from [entries] of keys and values.

```javascript
const fromEntries = require('@extra-object/from-entries');
// fromEntries(<entries>)

map = new Map([['grey', 'oyster'], ['white', 'button']]);
fromEntries(map);
// {grey: 'oyster', white: 'button'}
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[entries]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
