(function($){
    $.extend($.fn, {
        /**
         * 作者：姚明
         * 日期：2018-10-30
         * @param config
         * leftSymbol：变量左符号 (可选参数  默认符号 {{ )
         * rightSymbol：变量右符号 (可选参数  默认符号 }} )
         * url:请求后台的url (可选参数)
         * params：请求后台的参数  (可选参数)
         * data:要加载的数据  (可选参数,如果缺省，则请求url加载数据)
         * getData:数据的绑定 （可选参数，如果存在，则请求到后台数据之后通过该方法对数据进行绑定）
         *
         */
        entity:function (config) {
            if(!config){
                app.alert("配置文件不能为空");
                return ;
            }
            var docObj=this;
            var leftSymbol=config.leftSymbol?config.leftSymbol:"{{"; //左分隔符
            var rightSymbol=config.rightSymbol?config.rightSymbol:"}}"; //右分隔符
            var  resultObj=$(docObj)._checkHtmlCode(leftSymbol,rightSymbol);
            var checkResult=resultObj.checkResult;
            var length=resultObj.length;
            if(checkResult&&length>0){
                var startArr=resultObj.startArr;
                var endArr=resultObj.endArr;
                var htmlCode=$(docObj).html();
                //$(docObj)._replaceHtml(htmlCode,startArr,endArr);
                var obj=config.data;
                if(obj){
                    $(docObj)._replaceHtml(htmlCode,obj,startArr,endArr,leftSymbol,rightSymbol);
                }else{
                    var url=config.url;
                    var params=config.params;
                    if(!params){params={} };
                    if(url&&url!=""){
                        $.post(url,params,function (data) {
                            var isMethod=$.isFunction(config.getData);
                            obj=data;
                            if(isMethod){
                                obj=config.getData(data);
                            }
                            //console.log(obj);
                             $(docObj)._replaceHtml(htmlCode,obj,startArr,endArr,leftSymbol,rightSymbol);
                        });
                    }


                }


            }
        },
        _checkHtmlCode:function (leftSymbol,rightSymbol) {
            var docObj=this;
            var htmlCode=$(docObj).html();
            var startArr=new Array();
            var endArr=new Array();
            var startIndex=htmlCode.indexOf(leftSymbol);
            while (startIndex!=-1){
               // console.log("startIndex="+startIndex);
                startArr.push(startIndex);
                startIndex=htmlCode.indexOf(leftSymbol,startIndex+leftSymbol.length);
            }
            var endIndex=htmlCode.indexOf(rightSymbol);
            while (endIndex!=-1){
                endArr.push(endIndex);
                endIndex=htmlCode.indexOf(rightSymbol,endIndex+rightSymbol.length);
            }
            var length=startArr.length;
            var checkResult=true;
            var resultObj={
                checkResult:checkResult,
                startArr:startArr,
                endArr:endArr,
                length:length
            };
            if(length==0){
                resultObj.checkResult=false;
                return resultObj;
            }
            if(startArr.length!=endArr.length){
                resultObj.checkResult=false;
                app.alert("左符号和右符号的数量不匹配");
                return resultObj;
            }
            for(var i=0;i<length;i++){
                 if(startArr[i]>endArr[i]){
                     resultObj.checkResult=false;
                     app.alert("右符号不能在左括号的前面");
                     return resultObj;
                 }
                 if(i<length-1){
                     if(startArr[i+1]<endArr[i]){
                         resultObj.checkResult=false;
                         app.alert("符号不能嵌套使用");
                         return resultObj;
                     }
                 }
                 var varName=htmlCode.substring(startArr[i]+leftSymbol.length,endArr[i]).trim();
                 var reg=/^[A-Za-z0-9]+$/;
                 if(!reg.test(varName)){
                     resultObj.checkResult=false;
                     app.alert("变量名"+varName+"命名规范有误");
                     return resultObj;
                 }
            }
            return resultObj;
        },
        _replaceHtml:function (htmlCode,obj,startArr,endArr,leftSymbol,rightSymbol) {
            var docObj=this;
            var length=startArr.length;
            var htmlResult=htmlCode;
            for(var i=0;i<length;i++){
                var sourceName=htmlCode.substring(startArr[i]+leftSymbol.length,endArr[i]);
                var objName=sourceName.trim();
                if(obj&&obj[objName]){
                    htmlResult=htmlResult.replace(leftSymbol+sourceName+rightSymbol,obj[objName]);
                }else{
                   // htmlResult=htmlResult.replace("["+sourceName+"]","");
                }
            }
            //htmlResult=htmlResult.replace(/data-src/g,"src");
            $(docObj).html(htmlResult);
            $(docObj).find("img").each(function () {
                var data_src=$(this).attr("data-src");
                //console.log(data_src);
                if(data_src.indexOf(leftSymbol)==-1&&data_src.indexOf(rightSymbol)==-1){
                    $(this).attr("src",data_src).removeAttr("data-src");
                }
            })
        }
    });
})(jQuery);