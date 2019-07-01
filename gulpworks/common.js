/**
 * 依赖和公共配置入口
 */


var plugins     	= require('gulp-load-plugins'),
    packageInfo 	= require('../package.json'),
    config 			= require('../config.js'),
    libs        	= require('./libs.js');

plugins.util 		= require('gulp-util');
plugins.plumber 	= require('gulp-plumber');              				//捕获错误
plugins.del 		= require('del');										//删除
plugins.compass 	= require('gulp-compass');                    			//compass
plugins.changed 	= require('gulp-changed');              				//编译修改的
plugins.rename		= require('gulp-rename'),								// 文件重命名
    plugins.jshint 		= require('gulp-jshint');                				//js检查
plugins.uglify 		= require('gulp-uglify');                				//js压缩
plugins.buffer 		= require('vinyl-buffer');								//buffer
plugins.include 	= require('gulp-file-include');							//html include
plugins.source 		= require('vinyl-source-stream');						//merge
plugins.sourcemaps 	= require('gulp-sourcemaps');							// 来源地图
plugins.concat 		= require("gulp-concat"); 								// 文件合并
plugins.cmd 		= require('node-run-cmd');								// 文件合并
plugins._ 			= require('lodash');
plugins.webpack 	= require('webpack-stream');							//webpack-stream
plugins.size 		= require('gulp-size');										//size
plugins.zip 		= require('gulp-zip');


plugins.browserSync = require('browser-sync');					//browserSync
plugins.browserify = require('browserify');
plugins.sass=require('gulp-sass');


// 创建 common 对象
var common = {};
common.plugins = plugins;
common.config = config;
common.libs = libs;
common.packageInfo = packageInfo;
common.NODE_ENV = process.env.NODE_ENV;
module.exports = common;