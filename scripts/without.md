Remove specified keys from [object] &#40;[without delete]&#41;.
> Key and key array support added by request [@lachenmayer].

```javascript
const without = require('@extra-object/without');
// without.value(<object>, <key>)
// without.array(<object>, <key array>)
// without.set(<object>, <key set>)
// without(<object>, <key(s)>)

without({'not': '!', 'and': '&', 'nand': '!&'}, new Set(['not', 'and']));
// {'nand': '!&'} (yay to universal gate)
without({'not': '!', 'and': '&', 'nand': '!&'}, ['not', 'and', 'and']);
// {'nand': '!&'} (duplicate keys are fine)
without({'not': '!', 'and': '&', 'nand': '!&'}, 'nand');
// {'not': '!', 'and': '&'} (basic gates)
without({'not': '!', 'and': '&', 'nand': '!&'});
// ({'not': '!', 'and': '&', 'nand': '!&'}
without(null, 'nand');
// null
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[without delete]: https://jsperf.com/object-remove-keys
[@lachenmayer]: https://www.npmjs.com/~lachenmayer
