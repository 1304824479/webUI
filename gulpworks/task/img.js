/**
 * 项目图片文件处理
 * 作者：姚明
 */
module.exports = function(gulp, common) {


	//公共图片部分文件处理

	


	gulp.task('bulid:img', function() {
		var imgSrc = [
				common.config.src + "/images/**/*.*",
				"!"+common.config.src + "/images/sprite",
				"!"+common.config.src + "/images/sprite/**/*.*"
			],
            imgDst = common.config.app + '/images';

        return gulp.src(imgSrc)
            .pipe(common.plugins.changed(imgDst))
            .pipe( common.plugins.plumber({
	          errorHandler: function(_error) {
	            common.plugins.util.log(common.plugins.util.colors.red('bulid error:  img ') + _error);
	            common.plugins.util.beep();
	        }})) 
            .pipe(gulp.dest(imgDst))
	});
	
 
}