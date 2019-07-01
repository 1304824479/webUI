/**
 * 配置apimocker服务
 * 作者:姚明
 */
var mocker = require('gulp-apimocker');

module.exports = function(gulp, common) {
  
	gulp.task('apimocker', function(){
	  return mocker.start({
	    config: './gulpworks/config/mock.json',
	    mockDirectory: './mock'
	  });
	});

};