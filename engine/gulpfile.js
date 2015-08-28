/**
 * File: gulpfile.js
 * Type: Javascript Gulp File
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Requires
// Functions
// Tasks

// Requires
var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var file = require('gulp-file');
var livereload = require('gulp-livereload');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var $reload = true;

// Functions
var getConfig = function() {
   delete require.cache[require.resolve('../project/config.json')];
   return require('../project/config.json');
};

// Tasks
gulp.task('default', ['build', 'watch']);
gulp.task('build', ['clean', 'config', 'engine', 'ui', 'css', 'js']);

gulp.task('clean', function() {
   del([
      './temp/**/*'
   ]);
});

gulp.task('config', function() {
   var $config = getConfig();
   var $data = '';
   if ($config.option) {
      for (var $i = $config.option.length - 1; $i >= 0; $i--) {
         $data += '$option-' + $config.option[$i] + '; ';
      }
   }
   file('config.scss', $data, {
      src: true
   }).pipe(gulp.dest('./sass'));
});

gulp.task('engine', function() {
   gulp.src('./sass/styles.scss')
      .pipe(sass({
         outputStyle: 'compressed'
      }))
      .pipe(gulp.dest('./css'));
   gulp.src('./js/core.js')
      .pipe(concat('start.js'))
      .pipe(uglify({
         compress: true
      }))
      .pipe(gulp.dest('../'));
   gulp.src(['./js/modernizr.js', './js/tools.js'])
      .pipe(concat('scripts.min.js'))
      .pipe(uglify({
         compress: true
      }))
      .pipe(gulp.dest('./js/min'));
   gulp.src('js/fastclick.js')
      .pipe(concat('touch.min.js'))
      .pipe(uglify({
         compress: true
      }))
      .pipe(gulp.dest('./js/min'));
});

gulp.task('css', function() {
   var $config = getConfig();
   if ($config.build) {
      for (var $i = 0, $len = $config.build.length; $i < $len; $i++) {
         var $concat = false;
         var $arConcatStyles = ['./sass/import.scss'];
         if ($config.build[$i].component) {
            for (var $i2 = 0, $len2 = $config.build[$i].component.length; $i2 < $len2; $i2++) {
               var $thisComponent = $config.build[$i].component[$i2];
               var $componentBower = require('../project/component/' + $thisComponent + '/.bower.json');
               if (typeof $componentBower.main == 'object') {
                  for (var $i3 = 0, $len3 = $componentBower.main.length; $i3 < $len3; $i3++) {
                     if ($componentBower.main[$i3].indexOf('.css') > -1) {
                        $concat = true;
                        $arConcatStyles.push('../project/component/' + $thisComponent + '/' + $componentBower.main[$i3]);
                     }
                  }
               } else {
                  if ($componentBower.main.indexOf('.css') > -1) {
                     $concat = true;
                     $arConcatStyles.push('../project/component/' + $thisComponent + '/' + $componentBower.main);
                  }
               }
            }
         }
         $arConcatStyles.push('./sass/overwrite.scss');
         if ($config.build[$i].sass) {
            $concat = true;
            for (var $i2 = 0, $len2 = $config.build[$i].sass.length; $i2 < $len2; $i2++) {
               $arConcatStyles.push('../project/sass/' + $config.build[$i].sass[$i2]);
            }
         }
         if ($concat === true) {
            gulp.src($arConcatStyles)
               .pipe(concat($config.build[$i].name + '.min.scss'))
               .pipe(replace(new RegExp('@import "', 'g'), '@import "../../project/css/'))
               .pipe(gulp.dest('./temp/'))
               .pipe(sass({
                  outputStyle: 'compressed'
               }).on('error', sass.logError))
               .pipe(gulp.dest('../project/css/'))
               .pipe(livereload());
            $reload = false;
            setTimeout(function() {
               $reload = true;
            }, 1000);
         }
      }
   }
});

gulp.task('js', function() {
   var $config = getConfig();
   if ($config.build) {
      for (var $i = 0, $len = $config.build.length; $i < $len; $i++) {
         var $concat = false;
         var $compress = $config.build[$i].compress || true;
         var $mangle = $config.build[$i].mangle || true;
         var $arConcatJS = [];
         if ($config.build[$i].component) {
            for (var $i2 = 0, $len2 = $config.build[$i].component.length; $i2 < $len2; $i2++) {
               var $thisComponent = $config.build[$i].component[$i2];
               var $componentBower = require('../project/component/' + $thisComponent + '/.bower.json');
               if (typeof $componentBower.main == 'object') {
                  for (var $i3 = 0, $len3 = $componentBower.main.length; $i3 < $len3; $i3++) {
                     if ($componentBower.main[$i3].indexOf('.js') > -1) {
                        $concat = true;
                        $arConcatJS.push('../project/component/' + $thisComponent + '/' + $componentBower.main[$i3]);
                     }
                  }
               } else {
                  if ($componentBower.main.indexOf('.js') > -1) {
                     $concat = true;
                     $arConcatJS.push('../project/component/' + $thisComponent + '/' + $componentBower.main);
                  }
               }
            }
         }
         if ($config.build[$i].js) {
            $concat = true;
            for (var $i2 = 0, $len2 = $config.build[$i].js.length; $i2 < $len2; $i2++) {
               $arConcatJS.push('../project/js/' + $config.build[$i].js[$i2]);
            }
         }
         if ($concat === true) {
            gulp.src($arConcatJS)
               .pipe(concat($config.build[$i].name + '.min.js'))
               .pipe(gulp.dest('./temp/'))
               .pipe(uglify({
                  compress: $compress,
                  mangle: $mangle
               }))
               .pipe(gulp.dest('../project/js'))
               .pipe(livereload());
         }
      }
   }
});

gulp.task('reload', function() {
   if ($reload === true) {
      gulp.src('').pipe(livereload());
   }
});

gulp.task('ui', function() {
   gulp.src('../project/ui/**/script.js')
      .pipe(rename(function(path) {
         path.extname = '.min.js';
      }))
      .pipe(uglify({
         compress: true
      }))
      .pipe(gulp.dest(function($file) {
         return $file.base;
      }));
   gulp.src('../project/ui/**/style.scss')
      .pipe(sass({
         outputStyle: 'compressed'
      }))
      .pipe(gulp.dest(function($file) {
         return $file.base;
      }));
});

gulp.task('watch', function() {
   livereload.listen();
   gulp.watch([
      '../project/sass/*.scss',
      '../project/sass/**/*.scss'
   ], ['css']);
   gulp.watch([
      '../project/css/*.css',
      '../project/css/**/*.css'
   ], ['reload']);
   gulp.watch([
      '../project/js/src/*.js',
      '../project/js/src/**/*.js'
   ], ['js']);
   gulp.watch([
      '../project/ui/**/script.js',
      '../project/ui/**/style.scss'
   ], ['ui', 'reload']);
   gulp.watch([
      '../project/config.json'
   ], ['config', 'css']);
});
