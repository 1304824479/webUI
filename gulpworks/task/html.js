/**
 * 编译项目HTML文件
 * 作者:姚明
 */
module.exports = function(gulp, common) {


	gulp.task('bulid:html', function(cb) {
        var htmlSrc = [
                    common.config.src + '/**/*.html'
            ],
            htmlDst = common.config.app;
        return gulp.src(htmlSrc)
            .pipe( common.plugins.changed(htmlDst) )
            .pipe( common.plugins.plumber({
	          errorHandler: function(_error) {
	            common.plugins.util.log(common.plugins.util.colors.red('bulid error:  bulid:html') + _error);
	            common.plugins.util.beep();
	        }})) 
            .pipe( common.plugins.include({
		        prefix: common.config.includePrefix, // 模板函数的前缀
		        basepath:common.config.includeBasepath,
		        context:{
		          relativePath:"./",
		          linkStyles:[],//添加样式文件
		          linkScript:[]//添加脚本文件
		        }
		    }) )
            .pipe(gulp.dest(htmlDst))
            // .pipe(common.plugins.notify({ message: 'bulid:html task complete' }));
    });

}