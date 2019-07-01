(function($){
    $.extend($.fn, {
        selectInit:function(callback){
            var url=$(this).attr("data-init-url");
            if(url){
                var obj=this;
                var defaultOption=$("<option value=''>请选择</option>");
                defaultOption.appendTo(obj);
                $.post(url,function (data) {
                    if(data.length>0){
                        $.each(data,function (i,role) {
                            var key=role.key;
                            var value=role.value;
                            var option=$("<option value='"+key+"'>"+value+"</option>");
                            option.appendTo(obj);
                        });
                        var changeurl=$(obj).attr("data-url");
                        if(changeurl){
                            $(obj).selectOnChange();
                        }
                        if($.isFunction(callback)){
                            callback(obj);
                        }
                    }
                })
            }
        },
        selectOnChange:function () {
            var url=$(this).attr("data-url");
            if(url){
                var obj=this;
                var beforename=(obj).attr("name");
                $(obj).change(function(){
                    var key=this.value;
                    if(key!="") {
                        $(this).loadSelect(url,key);
                    }else{
                        $(obj).nextAll("select[name^='"+beforename+"']").remove();
                    }
                });
            }
        },
        loadSelect:function (url,vkey,callback) {
            var obj=this;
            var beforename=(obj).attr("name");
            var name=beforename+"1";
            var className=$(obj).attr("class");
            $.post(url,{
                key:vkey
            },function (data) {
                $(obj).nextAll("select[name^='"+beforename+"']").remove();
                 if(data.length>0){
                     var select=$("<select name='"+name+"' data-url='"+url+"'></select>");
                     if(className){
                         select=$("<select name='"+name+"' class='"+className+"' data-url='"+url+"'></select>");
                     }
                     var defaultOption=$("<option value=''>请选择</option>");
                     defaultOption.appendTo(select);
                     $.each(data,function (i,role) {
                         var key=role.key;
                         var value=role.value;
                         var option=$("<option value='"+key+"'>"+value+"</option>");
                         option.appendTo(select);
                     });
                     select.insertAfter(obj).selectOnChange();
                     if(callback&&$.isFunction(callback)){

                         callback(select);
                     }
                 }
            })
        },
        loadSelectInitValue:function (value,arrSonValue) {
            //alert(arrSonValue);
            var sonValue=arrSonValue[0];
            var url=$(this).attr("data-url");
            this.loadSelect(url,value,function(obj){
                $(obj).val(sonValue);
                if(arrSonValue.length>1){
                    arrSonValue.remove(0);
                    obj.loadSelectInitValue(sonValue,arrSonValue);
                }
            });
        }

    });
})(jQuery);
