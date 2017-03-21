'use strict';

// Handles errors of watch (for example compiling sass to css) via gulp-plumber
// Shows the occuring error message in the console and prevents watch from breaking
var onError = function (error) {
    console.log(error);
    this.emit('end');
}

var gulp = require('gulp'),
    imageMin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    concatCSS = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    imageResize = require('gulp-image-resize'),
    changed = require('gulp-changed'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');
var imgSrc = './src/images/*.*'
var imgDst = './dist/images/'

// Default task when gulp is called
gulp.task('default', ['sass', 'watch']);


// gulp watch
gulp.task('watch', function() {
    gulp.watch(imgSrc, ['small', 'medium', 'large', 'imagemin']);
    gulp.watch('./src/sass/*.scss', ['sass']);
});

// gulp sass
// compiles sass to css, autoprefixing, compression on
gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        //.pipe(concatCSS("styles.css"))
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(gulp.dest('dist/css/'))
    gulp.watch('./src/sass/*.scss', ['sass']);
});

/***********************
 * gulp images tasks
  **********************/

// Small size images
gulp.task('small', function () {
    gulp.src(imgSrc)
        .pipe(imageResize({
            width : 500,
            height : 250,
            crop : true,
            upscale : false,
            imageMagick: true
        }))
        .pipe(imageMin())
        .pipe(rename({suffix: '-small'}))
        .pipe(gulp.dest(imgDst));
});

// Medium sized images
gulp.task('medium', function () {
    gulp.src(imgSrc)
        .pipe(imageResize({
            width : 750,
            height : 400,
            crop : true,
            upscale : false,
            imageMagick: true
        }))
        .pipe(imageMin())
        .pipe(rename({suffix: '-medium'}))
        .pipe(gulp.dest(imgDst));
});

// Large sized images
gulp.task('large', function () {
    gulp.src(imgSrc)
        .pipe(imageResize({
            width : 1000,
            height : 600,
            crop : true,
            upscale : false,
            imageMagick: true
        }))
        .pipe(imageMin())
        .pipe(rename({suffix: '-large'}))
        .pipe(gulp.dest(imgDst));
});

// images get minimized
gulp.task('imageMin', function() {
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// gulp images task - crops all image sizes and minimzes them
gulp.task('images', ['small', 'medium', 'large']);