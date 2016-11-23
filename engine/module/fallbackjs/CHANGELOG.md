CHANGELOG
========

## v1.1.7 / 2015-08-04
- Fixing IE11 issue where `ready` callback is not firing. https://github.com/dolox/fallback/issues/33
- Fixing IE8 issue where Objects aren't being detected properly. https://github.com/dolox/fallback/issues/27
- Updating README.md typos.

## v1.1.6 / 2014-10-20
- Fixing IE11 CSS loading issue where it's not loading fallback stylesheets.
- Adding more files to ignore to the `bower.json` file. PR from @jieryn

## v1.1.5 / 2014-10-04
- Fixing CORS issues with IE11 and stylesheets.
- Added `fbk` as a library alias for short-hand. e.g. `fbk.load()`
- Added ESLint for linting
- Added aliases `deps` and `dependencies` for `options.shim`

## v1.1.4 / 2014-09-02
- Moved CHANGELOG from `README.md` to `CHANGELOG.md`
- Fixing typo in README.md
- Changed text in `gh-pages` branch from `INCREASE` to `DECREASE` for the line `INCREASE PAGE LOAD TIMES`
- Fixed `callback` not being fired when contained within the `load` functions `option` object.

## v1.1.3 / 2014-07-20
- Fixing IE10 `onReadyStateChange` and `onLoad` callback issues with CSS files.

## v1.1.2 / 2014-03-24
- Fixing CORS issue with stylesheet selector check.

## v1.1.1 / 2013-12-13
- Fixing bug with stylesheet selector check.
- Fixing parallel callback issues.
- Various other performance tweaks.

## v1.1.0 / 2013-12-03
- Entire library revamped.
- Added stylesheet selector check for CSS files.
- Added .import() function.
- Added .load() invocation to .ready() function.
- Fixed bug where parallel scripts would break.
- Fixed bug where code running in parallel up against the same library would attempt to load it more than once during a load cycle.

## v1.0.6 / 2013-12-01
- Adding document and undefined to constructor.
- Wrapping eval for `is_defined` function in a try catch.
- Checking that callback is a function before attempting to invoke.

## v1.0.5 / 2013-10-09
- Launched http://fallback.io/
- Updated documentation.

## v1.0.4 / 2013-10-08
- Fixing issue with missing callback sometimes throwing an error expecting a function.
- Tested and confirmed as working in IE6.

## v1.0.3 / 2013-07-28
- Fixing broken ready function in IE7-9. Contributors @displague
- Fixing issues with IE7 and IE8 due to new changes/adjustments.
- Added utility functions to trim down code and support older versions of IE.
- Fixed example index.html so that no console notices/errors are thrown in IE.
- Added POSTLOAD test to example.

## v1.0.2 / 2013-07-27
- Added .jshintrc file and fixes for JSHint validation. Contributors: @displague
- Updated the closure.sh file to auto prepend the tagline.
- Update example/index.js for the minifier's externs that way window.fallback doesn't get removed.

## v1.0.1 / 2013-07-26
- Bug with .ready() function not being called. Contributors: @mrgamer @claudyus
- Updates to the example demonstration.

## v1.0.0 / 2013-07-20
- Initial public release.
- Added bower.json and to bower repository.
- Added ability to call .ready() after libraries have already loaded.

## v0.3.0 / 2013-06-14
- Removed `ready_invoke` option.
- Added the ability to pass in an array of libraries to the `ready` event.

## v0.2.0 / 2013-06-13
- Fixes for IE 7, 8 and 9.
- Added MIT license.
- Added .gitignore
- Added `release` branch.

## v0.1.0 / 2013-05-27
- Initial development release.