/**
 * 文件监听
 * 作者：姚明
 */
module.exports = function(gulp, common) {

	gulp.task('watch' ,function() {
		//sass
		gulp.watch( common.config.src+'/css/**/*.scss', function(event){
			gulp.start('bulid:sass');
		});


		//html
		gulp.watch( common.config.src + '/**/*.html', function(event){
			gulp.start('bulid:html');
		});
		//img
		var imgSrc = [
					common.config.src + "/images/**/*.*",
					"!"+common.config.src + "/images/sprite",
					"!"+common.config.src + "/images/sprite/**/*.*"
				];
		gulp.watch( imgSrc , function(event){
			gulp.start('bulid:img');
		});
		var imgSpriteSrc = [
			common.config.src + "/images/sprite/**/*.*"
		];
		gulp.watch( imgSpriteSrc , function(event){
			gulp.start('bulid:sass');
		});

		//js
		var jsSrc = [
						common.config.src + '/**/*.js',
						'!'+common.config.src + '/pages/**/*.js'
	            ]
	    gulp.watch( jsSrc , function(event){
			gulp.start('bulid:js');
		});
		var pagesSrc = common.config.src+'/js/pages/**/*.js';
		gulp.watch( pagesSrc , function(event){
			gulp.start('bulid:pages:js');
		});
		var libs = common.config.src+'/libs/**/*';
		gulp.watch( libs , function(event){
			gulp.start('bulid:libs');
		});
	})
	

}