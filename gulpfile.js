const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename'); 

const paths = {
  styles: {
    src: 'src/**/*.scss', 
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/imgs/**/*',
    dest: 'dist/img/'
  },
  html: {
    src: 'src/*.html',
    watch: 'src/**/*.html', 
    dest: 'dist/'
  },
  bootstrap: {
    css: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
    js: [
        'node_modules/@popperjs/core/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ]
  }
};

function clean(){
    return del('dist');
}

function styles(){
    return src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream()) 
}

function scripts(){
    return src(paths.scripts.src)
    .pipe(concat('main.js')) 
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
}

function images(){
    return src(paths.images.src, {encoding: false})
    .pipe(imagemin())
    .pipe(dest(paths.images.dest))
}

function html(){
    return src(paths.html.src)
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest(paths.html.dest))
}

function copyBootstrapCSS() {
  return src(paths.bootstrap.css)
    .pipe(dest(paths.styles.dest)); 
}

function copyBootstrapJS() {
  return src(paths.bootstrap.js)
    .pipe(dest(paths.scripts.dest)); 
}

function reload(cb) {
  browserSync.reload();
  cb();
}

function watchTask(){
    browserSync.init({
        server:{
            baseDir: './dist' 
        },
        notify: false
    });

  watch(paths.styles.src, styles);
  watch(paths.scripts.src, series(scripts, reload));
  watch(paths.images.src, series(images, reload));
  watch(paths.html.watch, series(html, reload));
}

const copyBootstrap = parallel(copyBootstrapCSS, copyBootstrapJS);

exports.build = series(clean, parallel(styles, scripts, images, html, copyBootstrap));
exports.default = series(exports.build, watchTask);