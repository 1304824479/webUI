/**
 * 字体文件处理
 * 作者：姚明
 */
module.exports = function(gulp, common) {

	gulp.task('bulid:fonts', function() {
		var fontSrc = [
				common.config.src + "/iconfont/**/*.*"
			],
            fontDst = common.config.app + '/iconfont';

        return gulp.src(fontSrc)
            .pipe(common.plugins.changed(fontDst))
            .pipe( common.plugins.plumber({
	          errorHandler: function(_error) {
	            common.plugins.util.log(common.plugins.util.colors.red('bulid error:  bulid:fonts') + _error);
	            common.plugins.util.beep();
	        }})) 
            .pipe(gulp.dest(fontDst))
            // .pipe(common.plugins.notify({ message: 'bulid:fonts task complete' }));
	});
	
 
}