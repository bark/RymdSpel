var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var connect = require('gulp-connect-multi')();
var sass    = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');



gulp.task('build', function () {
    return gulp.src(['src/Tiles/TileItem.js','src/Tiles/*.js','src/Ship.js','src/test.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('bower', function () {
    return gulp.src(mainBowerFiles('**/*.js'))
        // Then pipe it to wanted directory, I use
        // dist/lib but it could be anything reall
        .pipe(concat('allBower.js'))
        .pipe(gulp.dest('dist'));


});


gulp.task('watch', function () {

    gulp.start('connect');
    gulp.start('build');
    gulp.start('scss');

    gulp.watch('src/**/*.js', ['build']);
    gulp.watch('css/*.scss', ['scss']);
});

gulp.task('scss', function () {
    return gulp.src(['css/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});


gulp.task('connect', connect.server({
    root: ['dist','bower_components'],
    port: 1337,
    livereload: true,
    open: {
        file: 'index.html',
        browser: 'chromium-browser' // if not working OS X browser: 'Google Chrome'
    }
}));
