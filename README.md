## babel-plugin-transform-md-require-to-string

this is a plugin that can replace you code like

```js
const mdContent = require('tetst.md');
```

to:

```js
const mdContent = 'content of that file';
```

also, things like:

```js
var mdContent = require('tetst.md');
```
 also works.

## inspired by projects below
[babel-plugin-transform-md-import-to-string](https://github.com/khrome83/babel-plugin-transform-md-import-to-string)