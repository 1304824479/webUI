var fileUtil={
    upload:function (url,callback) {
       /* if(!config || !config.url || config.url==""){
            return ;
        }
        var url=config.url;
        var callback=config.complete;*/
        $("body").find("input[id='file']").remove();
        var file=$("<input type='file' id='file' style='opacity: 0' />");
        file.appendTo("body");
        this.callback=callback;
        file.click();
        file.change(function () {
            var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
            //console.log(fileObj);
            var form = new FormData(); // FormData 对象
            form.append("file", fileObj); // 文件对象
            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.onload = fileUtil.uploadComplete; //请求完成
            xhr.onerror =  fileUtil.uploadFailed; //请求失败
            xhr.upload.onprogress = fileUtil.progressFunction;//【上传进度调用方法实现】
            xhr.upload.onloadstart = function(){//上传开始执行方法
                ot = new Date().getTime();   //设置上传开始时间
                oloaded = 0;//设置上传开始时，以上传的文件大小为0
            };
            xhr.send(form); //开始上传，发送form数据
        });

    },
    uploadComplete:function (evt) {
        var data = JSON.parse(evt.target.responseText);
        var callback=fileUtil.callback;
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
        file.remove();
       // $("body").find("input[id='file']").remove();
    },
    uploadFailed:function (evt) {
        $.ligerDialog.warn("请求失败");
        file.remove();
       // $("body").find("input[id='file']").remove();
    },
    progressFunction:function (evt) {  //进度条功能
       /* var progressBar = document.getElementById("progressBar");
        var percentageDiv = document.getElementById("percentage");
        var time = document.getElementById("time");*/
        // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
        if (evt.lengthComputable) {//
           /* progressBar.max = evt.total;
            progressBar.value = evt.loaded;
            percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";*/
            console.log("进度："+ Math.round(evt.loaded / evt.total * 100) + "%");
        }
        var nt = new Date().getTime();//获取当前时间
        var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
        ot = new Date().getTime(); //重新赋值时间，用于下次计算
        var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
        oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
        //上传速度计算
        var speed = perload/pertime;//单位b/s
        var bspeed = speed;
        var units = 'b/s';//单位名称
        if(speed/1024>1){
            speed = speed/1024;
            units = 'k/s';
        }
        if(speed/1024>1){
            speed = speed/1024;
            units = 'M/s';
        }
        speed = speed.toFixed(1);
        //剩余时间
        var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
        /* time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
        if(bspeed==0) time.innerHTML = '上传已取消';*/
        console.log('  速度：'+speed+units+'，剩余时间：'+resttime+'s');
        if(bspeed==0) console.log("上传已取消");
    }
};