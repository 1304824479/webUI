/**
 * 执行gulp命令，启动项目
 * 作者:姚明
 */
module.exports = function(gulp, common) {

	gulp.task('default',['clean'],function(){
            gulp.start('dev');
	})

	gulp.task('dev', ['bulid:sass','bulid:fonts','bulid:img','bulid:js','bulid:libs','bulid:html','apimocker','watch'],function(){
		gulp.start('server')
	});


}