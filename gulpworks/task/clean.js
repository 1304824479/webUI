/**
 * 清理输出文件
 * 作者:姚明
 */
module.exports = function(gulp, common) {
  gulp.task('clean', function() {
    common.plugins.del.sync(common.config.delFileDir, {force: true});
    common.plugins.util.log(common.plugins.util.colors.green('Clean: ') + '清理所有的 ' + common.config.delFileDir + ' 文件');
  });
};