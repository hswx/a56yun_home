var gulp = require('gulp');
var gDebug = require('gulp-debug');
var gConcat = require('gulp-concat');
var gUglify = require('gulp-uglify');
var gLess = require('gulp-less');
var gMinifyCss = require('gulp-minify-css');
var gHtmlReplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var gClean = require('gulp-clean');
var gFilter = require('gulp-filter');
var gRename = require('gulp-rename');
var gReplace = require('gulp-replace');

var fs = require('fs');

var PROD_DIR = './prod';
var PROD_JS_DIR = PROD_DIR + '/js';
var PROD_CSS_DIR = PROD_DIR + '/css';
var PROD_CSS_FONTS_DIR = PROD_CSS_DIR + '/fonts';
var PROD_IMG_DIR = PROD_DIR + '/img';

var timestamp = (new Date()).getTime();

function genHtmlReplaceArgs() {

    return {
        header: fs.readFileSync('./src/html_components/header.html','utf-8'),
        footer: fs.readFileSync('./src/html_components/footer.html','utf-8'),
        css: './css/main_'+timestamp+'.css',
        js: ['./js/vendor_'+timestamp+'.js','./js/main_'+timestamp+'.js'],
        headerMetas: '<meta charset="utf-8">'+
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        browserCheckBegin: '       <!--[if lte IE 8]>' +
        '       <p class="browsehappy">您的浏览器已经过时。为了您的信息安全，请升级主流浏览器<a href="http://browsehappy.com/">最新版本</a><br>若您的计算机无法安装高版本的浏览器（例如WindowsXP系统），请使用<a href="http://chrome.360.cn/">360浏览器</a>，并以<a href="http://jingyan.baidu.com/article/d169e186a3dd27436611d829.html">极速模式</a>运行网页</p> ' +
        '       <![endif]-->' +
        '       <!--[if gt IE 8]>',
        browserCheckEnd:'       <![endif]-->'
    };
}

gulp.task('prod.js.vendor', function () {
    var title = 'prod.js.vendor\t';
    return gulp.src('./bower.json')
        .pipe(require('gulp-main-bower-files')())
        .pipe(gFilter('**/*.js'))
        .pipe(gDebug({title: title}))
        .pipe(gConcat('vendor_'+timestamp+'.js'))
        .pipe(gUglify())
        .pipe(gulp.dest(PROD_JS_DIR));
});

gulp.task('prod.js.src', function () {
    var title = 'prod.js.src\t';
    return gulp.src(['./src/*.js', '!./**/*.specs.js','!./src/cityselect.js'])
        .pipe(gDebug({title: title}))
        .pipe(gConcat('main_'+timestamp+'.js'))
        .pipe(gUglify())
        .pipe(gulp.dest(PROD_JS_DIR));
});

gulp.task('prod.styles', [/*'dev.styles.fonts', 'dev.styles.print'*/], function () {
    var title = 'prod.styles\t';
    return gulp.src(['./src/less/main.less'])
        .pipe(gDebug({title: title}))
        .pipe(gLess())
        .pipe(gReplace(/\^\$IMAGE_VERSION\$/g, '_'+timestamp))
        .pipe(gRename(function (path) {
            path.basename = path.basename + '_' + timestamp;
        }))
        .pipe(gMinifyCss())
        .pipe(gulp.dest(PROD_CSS_DIR));
});

gulp.task('prod.images', [/*'dev.styles.fonts', 'dev.styles.print'*/], function () {
    var title = 'prod.images\t';
    return gulp.src(['./src/img/**/*.*'])
        .pipe(gDebug({title: title}))
        .pipe(gRename(function (path) {
            path.basename = path.basename + '_' + timestamp;
        }))
        .pipe(gulp.dest(PROD_IMG_DIR));
});

gulp.task('prod.favicon', [], function () {
    var title = 'prod.favicon\t';
    return gulp.src(['./src/favicon.ico'])
        .pipe(gDebug({title: title}))
        .pipe(gulp.dest(PROD_DIR));
});

gulp.task('prod.app', function () {
    var title = 'prod.app\t';
    return gulp.src('./src/*.html')
        .pipe(gDebug({title: title}))
        .pipe(gHtmlReplace(genHtmlReplaceArgs(), {
            keepBlockTags: true
        }))
        .pipe(gReplace(/\^\$IMAGE_VERSION\$/g, '_'+timestamp))
        .pipe(gReplace(/\^\$HOME_URL\$/g, '.'))
        .pipe(gReplace(/\^\$IMPORT_ONEWAY_URL\$/g, ''))
        .pipe(gReplace(/\^\$EXPORT_RIDE_URL\$/g, ''))
        .pipe(gReplace(/\^\$TRUCK_BUSINESS_URL\$/g, ''))
        .pipe(gReplace(/\^\$ABOUT_US_URL\$/g, './about.html'))
        .pipe(gReplace(/\^\$ABOUT_US_INTRO_URL\$/g, './about.html#intro'))
        .pipe(gReplace(/\^\$ABOUT_US_DEVELOPMENT_URL\$/g, './about.html#development'))
        .pipe(gReplace(/\^\$ABOUT_US_CULTURE_URL\$/g, './about.html#culture'))
        .pipe(gReplace(/\^\$ABOUT_US_CONTACT_URL\$/g, './about.html#contact'))
        .pipe(gReplace(/\^\$PARTNERS_URL\$/g, './partners.html'))
        .pipe(gReplace(/\^\$HELP_CENTER_URL\$/g, './help.html'))
        .pipe(gReplace(/\^\$JOIN_US_URL\$/g, './join.html'))
        .pipe(gReplace(/\^\$GUIDE_URL\$/g, './guide.html'))
        .pipe(gReplace(/\^\$QA_URL\$/g, './qa.html'))
        .pipe(gReplace(/\^\$QA_BONUS_URL\$/g, './qa.html#bonus'))
        .pipe(gReplace(/\^\$ACTIVITY_URL\$/g, './activity.html'))
        .pipe(gReplace(/\^\$ACTIVITY_URL\$/g, './price.html'))
        .pipe(gReplace(/\^\$REGISTER_URL\$/g, ''))
        .pipe(gReplace(/\^\$LOGIN_URL\$/g, ''))
        .pipe(gReplace(/\^\$FORGET_PASSWORD_URL\$/g, ''))
        .pipe(gReplace(/\^\$REGULAR_URL\$/g, './regular.html'))
        .pipe(gReplace(/\^\$AGENCIES_URL\$/g, './agencies.html'))
        .pipe(gulp.dest(PROD_DIR));
});

gulp.task('clean', function () {
    return gulp.src([PROD_DIR], {read: false}).pipe(gClean());
});


gulp.task('prod', function (callback) {
    runSequence('clean',
        ['prod.app', 'prod.styles', 'prod.js.vendor', 'prod.js.src', 'prod.images', 'prod.favicon'],
        callback);
});