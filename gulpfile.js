'use strict';

/**
 * 前端框架的搭建过程
 * 1，打开终端，进入到需要搭建框架的目录中
 * 2，项目初始化，命令：cnpm init
 * 3，在package.json中加入需要依赖的插件
 * 4，安装插件，命令：cnpm install
 * 5，新建配置文件config.js，并设置好源代码目录，目标代码目录，模板引擎，端口号等相关内容。
 * 6，新建gulpworks目录，专门用于存放gulp工作的相关文件
 * 7，在gulpwroks目录中，新建libs.js，专门用于gulp工作的工具类
 * 8，在gulpwroks目录中，新建common.js，引入相应的依赖和公共配置入口
 * 9，在gulpwroks目录中，新建task目录，依次将相关任务Js拷贝过来
 * 10，在gulpwroks目录中，新建config目录，然后在新建mock.json，并配置好mock服务。
 * 11，新建mock目录，专门用于存放json数据源
 * 12，新建源src目录，专门用户存放开发的源代码
 * 13，（1）在src目录中新建css目录，专门用于存放sass文件，并且初始化sass文件,拷贝iconfont目录到src目录下面
 * 14，（2）拷贝images文件目录到src目录下
 * 15，（3）在src目录中新建js目录，并在js目录新建三个目录  core核心库目录  ui操作目录   pages单独页面引入js目录，同时在根目录下面新建jsconfig.json配置文件
 * 16，（4）在src目录中新建lib目录，同时将jquery.js拷贝过来
 * 17，（5）在src目录中新建template模板目录，同时把模板html文件拷贝过来
 * 18，（6）在src目录中新建view目录，专门用于存放html的静态页面
 * 19，（7）在src目录中新建index.html页面
 * 20，在gulpfile.js文件中载入任务，载入代码如下
 * 21，启动项目，命令：gulp
 */


/**
 * 任务总入口
 */
var gulp = require('gulp'),
    fs = require('fs'),
    common = require('./gulpworks/common');

// 载入任务
let taskPath = 'gulpworks/task';

fs.readdirSync(taskPath).filter(function (_file) {
    return _file.match(/js$/); // 排除非 JS 文件，如 Vim 临时文件
}).forEach(function (_file) {
    require('./' + taskPath + '/' + _file)(gulp, common);
});

