## Install

```
$ npm install gulp-monkeyscript --save-dev
```


## Usage

```js
var ms = require('gulp-monkeyscript');
var msProject = ms.createProject("monkeyscript.json");

gulp.src("src/**/*.js")
	.pipe(concat("script.user.js"))
    .pipe(msProject())
	.pipe(gulp.dest("dist/"));

```

Add the following rule to your `monkeyscript.json` file to show which settings there are available:

```
"$schema": "./node_modules/gulp-monkeyscript/schema.json",
```

## Showcase
```json
{
    "$schema": "./node_modules/monkey-script/schema.json",
    "name": "My Awesome Userscript!",
    "namespace": "http://www.seriesfeed.com",
    "version": "1.0.0",
    "author": "Tom",
    "description": "This userscript adds new functionality!",
    "match": [
        "http://www.website.com/page1/",
        "http://www.website-alter.com/*"
    ],
    "runAt": "document-start",
    "useStrict": true
}
```

Becomes:

```js
// ==UserScript==
// @name		My Awesome Userscript!
// @namespace		http://www.seriesfeed.com
// @version		1.0.0
// @author		Tom
// @description		This userscript adds new functionality!
// @match		http://www.website.com/page1/
// @match		http://www.website-alter.com/*
// @run-at		document-start
// ==/UserScript==
'use strict';

<other source>
```

## Dependencies
- <a href="https://www.npmjs.com/package/readable-stream">readable-stream</a>
- <a href="https://www.npmjs.com/package/streamqueue">streamqueue</a>


## License

MIT © 2017 Tom O'Neill
