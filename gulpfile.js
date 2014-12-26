var gulp         = require('gulp'),
    compass      = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    jade         = require('gulp-jade'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    changed      = require('gulp-changed'),
    svgstore     = require('gulp-svgstore'),
    svgmin       = require('gulp-svgmin'),
    svgSprite    = require('gulp-svg-sprites'),
    svg2png      = require('gulp-svg2png'),
    browserSync  = require('browser-sync');

//webserver
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
            // index: 'index.html'
        },
        files: ["css/*.css", "*.html", "js/**/*.js"],
        port: 8080,
        open: false,
        notify: false,
        ghostMode: false
    });
});

//jade
gulp.task('jade', function() {
    return gulp.src('jade/*.jade')
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(changed('./', {extension: '.html'}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'));
});

//compile all jade files
gulp.task('jade-all', function() {
    return gulp.src('jade/*.jade')
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./'));
});

//compass
gulp.task('compass', function() {
    return gulp.src('sass/**/*.sass')
        .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
        .pipe(compass({
            config_file: 'config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});

//svg sprite
// gulp.task('svgsprite', function() {
//     return gulp.src('img/svg/*.svg')
//         .pipe(svgmin())
//         .pipe(svgstore({ fileName: 'icons.svg', prefix: 'icon-' }))
//         .pipe(gulp.dest('img/'));
// });

gulp.task('svgSprite', function() {
    return gulp.src('img/svg/icons/*.svg')
        .pipe(svgmin())
        .pipe(svgSprite({
            svg: {
                sprite: 'sprites/sprite.svg'
            },
            templates: {
                css: require('fs').readFileSync('sass/lib/sprite-template.scss', "utf-8")
            },
            cssFile: '../sass/_svg-sprite.sass',
            // selector: 'icon-%f',
            svgPath: '../img/sprites/%f',
            pngPath: '../img/sprites/%f',
            padding: 10
        }))
        .pipe(gulp.dest('img'));
});

gulp.task('pngSprite', function() {
    return gulp.src('img/sprites/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('img/sprites'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('sass/**/*', ['compass']);
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('jade/includes/*.jade', ['jade-all']);
    gulp.watch('jade/layouts/*.jade', ['jade-all']);
    gulp.watch('img/svg/icons/*.svg', ['svgSprite', 'pngSprite']);
});

gulp.task('build',['jade', 'compass', 'svgSprite', 'pngSprite'], function() {});

gulp.task('default',['build', 'browser-sync', 'watch'], function() {});