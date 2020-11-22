const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
// const rename = require("gulp-rename");

//Static server
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(gulp.dest("css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));