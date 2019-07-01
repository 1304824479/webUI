/**
 * 三方公共文件库
 * 作者:姚明
 */
module.exports = function(gulp, common) {

	gulp.task('bulid:libs', function () {
		return gulp.src(common.config.src+'/libs/**/*')
					.pipe(gulp.dest(common.config.app+'/libs'))
	});

}