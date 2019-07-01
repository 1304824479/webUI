/**
 * 构建所有项目的公共CSS文件
 * 作者：姚明
 */
module.exports = function(gulp, common) {


	gulp.task('bulid:sass', function () {
		// 被编译文件的路径
		let src = [common.config.src+'/css/**/*.scss'];// sass 來源路徑
		return gulp.src(src)
			.pipe(common.plugins.sass())
			.pipe(gulp.dest(common.config.app+'/css'))
		//.pipe(livereload());
	});



	/*var src = [common.config.src+'/css/!**!/!*.scss'];// sass 來源路徑
	return gulp.src(src)
		.pipe( common.plugins.plumber({
			errorHandler: function(_error) {
				common.plugins.util.log(common.plugins.util.colors.red('bulid error:  bulid:sass') + _error);
				common.plugins.util.beep();
			}}))
		.pipe(common.plugins.compass({
			config_file: './gulpworks/config/config.compass.rb',
			css: common.config.app+'/css', 				// compass 輸出位置
			sass: common.config.src+'/css',      			// sass 來源路徑
			/!*image: common.config.common+'/images',   			// img 输出路徑
            generated_images_path : common.config.commonDist+"/images" ,
            style: 'expanded',                					// css 處理方式，預設 nested（expanded, nested, compact, compressed）
            comments: false                    					// 是否要註解，預設(true)*!/
		}))*/




}
