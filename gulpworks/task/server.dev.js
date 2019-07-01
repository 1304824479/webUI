

module.exports = function(gulp, common) {
	
	gulp.task('server', function () {

	    common.plugins.browserSync.init({
            files: "./"+common.config.app + "/**",
            //proxy: "yourlocal.com",
            server:{
                baseDir: "./"+common.config.app
            },
            port: common.config.browserSyncPort
        });

	});
}