Create [object] with pairs that pass the specified test, like [Array.filter()].

```javascript
const filter = require('@extra-object/filter');

filter({g: 7, r: 18, a: 1}, value => value>1);
// {g: 7, r: 18}
```
<br>


## reference

```javascript
const filter = require('@extra-object/filter');

filter(object, callback, self);
: callback(value, key, object)
-> filtered object
```


[![extra-object](https://i.imgur.com/yFUJ4GM.jpg)](https://www.npmjs.com/package/extra-object)

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
[Array.filter()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
