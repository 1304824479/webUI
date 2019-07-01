/**
 * 编译js
 * 作者:姚明
 */
var jspack = require('../../jsconfig.json');
var core = jspack.core;
var ui = jspack.ui;
var phone = jspack.phone;

module.exports = function(gulp, common) {
	var dist=common.config.app+'/js';
	var bulid = function(name,src){
		return gulp.src(src)
        .pipe(common.plugins.concat(name+'.js'))
        .pipe(gulp.dest(dist))
        .pipe(common.plugins.uglify())
        .pipe(common.plugins.concat(name+'.min.js'))
        .pipe(gulp.dest(dist))
	}

	// JS文件压缩&重命名
	gulp.task('bulid:core:js', function() {
		return bulid('core',core);
	});
    gulp.task('bulid:ui:js', function() {
	  	return bulid('ui',ui);
	});
    gulp.task('bulid:phone:js', function() {
        return bulid('phone',phone);
    });
    gulp.task('bulid:pages:js', function () {
		return gulp.src(common.config.src+'/js/pages/**/*')
					.pipe(gulp.dest(dist+"/pages"))
	});
	gulp.task('bulid:js', ['bulid:core:js','bulid:ui:js','bulid:pages:js','bulid:phone:js']);
}