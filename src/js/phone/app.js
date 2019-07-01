var app={

    //保存数据到缓存中
    setItem:function(key,value){
        var islocal='localStorage' in window && window['localStorage'] !== null;
        if(islocal){
            window.localStorage.setItem(key,value);
        }else{
            $.cookie(key,value,{expires:365,path: '/'});
        }
    },

    //从缓存中获取数据
    getItem:function (key) {
        var islocal='localStorage' in window && window['localStorage'] !== null;
        var value=null;
        if(islocal){
            value=localStorage.getItem(key);
        }
        if(value==null){
            value=$.cookie(key);
        }
        return value;
    },

    //删除缓存中的数据
    removeItem:function (key) {
        var islocal='localStorage' in window && window['localStorage'] !== null;
        if(islocal){
            window.localStorage.removeItem(key);
        }else{
            $.cookie(key,null,{ path: '/' });
        }
    },
    //发起post请求
    post:function(methodPath, param1, param2) {
        var paramsLength = arguments.length;
        var userId = this.getItem("userId");
        var username = this.getItem("username");
        var tokenStr = this.getItem("tokenStr");

        var url = itemApp.domain   + methodPath;

        var params = null; // 请求参数
        var callback = null; // 回调函数
        if (userId == null) {
            userId = "";
        }
        if (username == null) {
            username = "";
        }
        if (tokenStr == null) {
            tokenStr = "";
        }

        if (paramsLength == 3) {
            params = param1;
            params['userId'] = userId;
            params['username'] = username;
            params['tokenStr'] = tokenStr;
            callback = param2;
        }
        if (paramsLength == 2) {
            params = {
                "userId" : userId,
                "username" : username,
                "tokenStr" : tokenStr
            };
            callback = param1;
        }
        $.post(url, params, function(data) {
            if ((typeof callback) == 'function') {
                if (data != "error") {
                    callback(data);
                } else {

                }
            }
        });
    },
    //获取页面的参数值
    getParamValue:function (name) {
        var thisURL = document.URL;
        var index = thisURL.indexOf("?");
        var result = "";
        if (index != -1) {
            var param = thisURL.substring(index + 1, thisURL.lenght);
            var arr = param.split("&");
            for (var i = 0; i < arr.length; i++) {
                var str = arr[i];
                var str2 = str.split("=");
                if (name == str2[0]) {
                    result = str2[1];
                }
            }
        }
        return result;
    },
    //及时弹出框
    alert:function (content,callback) {
        var alertBg = $("<div class='alert-bg'></div>");
        var contentDiv = $("<div class='alert'>" + content + "</div>");
        var length = $("body").find("div[class='alert']").length;
        if (length == 0) {
            alertBg.append(contentDiv);
            $("body").append(alertBg);
            var width = contentDiv.outerWidth();
            var bgWidth=alertBg.outerWidth();
            console.log(width);
            var left = (bgWidth- width) / 2 ;
            contentDiv.css("marginLeft",left);
            contentDiv.fadeIn("slow");
            window.setTimeout(function() {
                contentDiv.fadeOut("slow", function() {
                    alertBg.remove();
                    if((typeof callback)== 'function'){
                        callback();
                    }
                });
            }, 2000);
        }
    }
};