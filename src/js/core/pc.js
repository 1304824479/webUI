

var pc={
    message:{
        success:"success", // 成功
        error:"error",      //失败
        operate_error:400    //用户操作失败
    },
    post:function(url,param1,param2){
        var paramsLength=arguments.length ;
        var params=null; //请求参数
        var callback=null; //回调函数
        if(paramsLength==3){
            params=param1;
            callback=param2;
        }
        if(paramsLength==2){
            params={};
            callback=param1;
        }
        if(url!=null&&params!=null&&callback!=null){
            $.post(url,params,function(data){
                if((typeof callback)== 'function'){
                    if(data.key==iroad.message.success){
                        callback(data);
                    }else{
                        var info=data.info;
                        var code=data.code;
                        if(code==iroad.message.operate_error){
                            $.ligerDialog.warn(info);
                        }else{
                            $.ligerDialog.error(info);
                        }
                    }
                }
            });
        }
    },
    callback:function(type,info){  //表单提交回调函数
        if(type==1){  //1 代表成功，则跳转URL
            window.location.href=info;
        }
        if(type==2){ //2 代码失败，则打印提示信息
            //$.ligerDialog.warn(info);
            var dialogBtn = [
                {
                    text: '确定',
                    onclick: function (dialog,settings) {
                        $("input[type='submit']").removeClass("disabled")
                    }
                }
            ];
            var type="warn"; //alert   success  warn  info  error  question
            var content=info;
            $.ligerDialog.openCDialog(type,content);
        }
    }
};

var pcPage={
    refresh:function () {
        var isRefresh=window.localStorage.getItem("isRefresh");
        if(isRefresh==1){
            window.localStorage.removeItem("isRefresh");
            window.location.reload();
        }
    },
    goback:function () {
        window.localStorage.setItem("isRefresh",1);
        window.history.go(-1);
    }
};

