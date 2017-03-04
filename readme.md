## Install

Dependencies are not installed by default yet:
```
$ npm install fs --save-dev
$ npm install readable-stream --save-dev
$ npm install streamqueue --save-dev
```

(NOT AVAILABLE YET, CLONE AND PUT MANUALLY INTO node_modules):
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
"$schema": "node_modules/gulp-monkeyscript/schema.json",
```


## License

MIT © 2017 Tom O'Neill
