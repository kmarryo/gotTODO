'use strict';

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
gulp.task('default', ['sass', 'watch']);
gulp.task('watch', function() {
    gulp.watch(imgSrc, ['small', 'medium', 'large', 'imagemin']);
    gulp.watch('./src/sass/*.scss', ['sass']);
});
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
        .pipe(concatCSS("styles.css"))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css/'))
    gulp.watch('./src/sass/*.scss', ['sass']);
});
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
gulp.task('imageMin', function() {
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});
gulp.task('images', ['small', 'medium', 'large']);