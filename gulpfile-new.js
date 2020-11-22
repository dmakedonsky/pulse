const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('htmlmin');
const imagemin = require('gulp-imagemin');
// const rename = require("gulp-rename");

//Static server
gulp.task('server', function() {

    browserSync({
        server: {
            // baseDir: "./"
            baseDir: "dist"
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
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("*.html").on('change', gulp.parallel('html'));
});

// gulp.task ('html', function () {
//     return gulp.src("*.html")
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest("dist/"))
// });

gulp.task ('images', function () {
    return GulpClient.src("img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

gulp.task ('scripts', function () {
    return GulpClient.src("js/**/*.js")
    .pipe(gulp.dest("dist/js"));
});

gulp.task ('fonts', function () {
    return GulpClient.src("fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task ('icons', function () {
    return GulpClient.src("icons/**/*")
    .pipe(gulp.dest("dist/icons"));
});

gulp.task ('mailer', function () {
    return GulpClient.src("mailer/**/*")
    .pipe(gulp.dest("dist/mailer"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'images', 'scripts', 'fonts', 'icons', 'mailer'));