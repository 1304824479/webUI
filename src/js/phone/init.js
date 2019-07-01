



function windowRoot(){
    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    });

    /*
    if(dirDeep > 1){
        //获取本地存储的用户名
        var userId=token.getItem("userId");
        var username=token.getItem("username");
        var tokenStr=token.getItem("tokenStr");
        if (userId == null || username == null || tokenStr == null) { // 用户名为空或者用户key为空
            var url_prefix = "";
            for(var i=0; i<(dirDeep-1); i++) {
                url_prefix += "../";
            }
            window.location.href = url_prefix + "login.html";
        } else {
            $.post(app.domain + "/token_verific.html", {
                userId : userId,
                username : username,
                tokenStr : tokenStr
            }, function(data) {
                var resultCode = data.resultCode; // 返回结果代码
                var resultInfo = data.resultInfo; // 返回结果信息
                if (resultCode != 0) {
                    var url_prefix = "";
                    for(var i=0; i<(dirDeep-1); i++) {
                        url_prefix += "../";
                    }
                    window.location.href = url_prefix + "login.html";
                } else {
                    if (data.tokenStr != "" && data.tokenStr != undefined) {
                        token.setItem("tokenStr", data.tokenStr);
                    }
                    pageRoot();
                }
            });
        }
    }else if(dirDeep==1){
        pageRoot();
    }
    */

    pageRoot();
}


//页面初始化的函数入口
function pageRoot(){
    $(function() {

        //执行页面初始化函数
        var initFun = $("div[class='page']").attr("data-initFun");
        if (initFun != undefined) {
            window[initFun]();
        }

        //绑定事件
        bindEvent();

    });
}


//获取目录的深度   1：代表一级目录，即网站根目录  2：代表二级目录
function getDirDeep(){
    var rootStart = "/app";
    //console.log("rootStart="+rootStart);
    var pagePath=  window.location.pathname;  //页面路径
   // console.log("pagePath="+pagePath);
    pagePath = pagePath.substring(pagePath.indexOf("/app/"), pagePath.length);
    pagePath = pagePath.replace(rootStart, "");
   // console.log("pagePath="+pagePath);
    var dirDeep = getStrCount(pagePath,"/");
    return dirDeep;
}

//绑定事件
function bindEvent() {

    //绑定含有data-url的点击事件
    $("[data-url]").click(function() {
        var url = $(this).attr("data-url");
        window.location.href = url;
    });


    //绑定返回事件
    $("div[class='back']").click(function() {
        var url = $(this).attr("data-url");
        var clickFun = $(this).attr("data-clickFun");
        if (url == undefined && clickFun == undefined) {
            window.history.go(-1);
        } else if (clickFun != undefined) {
            window[clickFun]();
        }
    });

    //绑定input的回车事件
    $("input").keypress(function(e){
        if(e.keyCode === 13) {
            // 处理相关逻辑
            $(this).blur();
            var keyEnter=$(this).attr("data-keyEnter");
            if (keyEnter != undefined) {
                window[keyEnter]();
            }
        }
    });
}

function loadJs(cfg) {
    var  loadJsType=cfg.loadJsType; //0 默认  1：自定义js
    var  jsRoot=cfg.jsRoot; //js的根目录
    var  jsFileName=cfg.jsFileName;  //自定义js文件名

    var pagePath=  window.location.pathname;  //页面路径
    if(loadJsType==0){
        jsFileName=pagePath.substring(pagePath.lastIndexOf("/")+1,pagePath.lastIndexOf("."))+".js";
        var url_prefix = "";
        var dirDeep = getDirDeep(); //目录的深度  1：代表一级目录，即网站根目录  2：代表二级目录    3：代表三级目录
       // console.log("dirDeep="+dirDeep);
        for(var i=0; i<(dirDeep-1); i++) {
            url_prefix += "../";
        }
    }
    var jsFile=url_prefix+jsRoot+jsFileName;
    console.log("jsFile="+jsFile);
    document.write("<script src='"+jsFile+"'></script>");
}



var pageConfig={
    loadJsType:0, //0 默认  1：自定义js
    jsRoot:"js/pages/data/" , //js的根目录
    jsFileName:""  //自定义js文件名
};
//loadJs(pageConfig); //加载js
windowRoot();  //执行页面初始化

