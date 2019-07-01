(function($){
    $.extend($.fn, {
        initTree:function(callback){
            var obj=this;
            $(obj)._treeCss();
            $(obj)._treeOpenClose();
            $(obj)._treeChecked();
            $(obj)._treeClick(callback);
        },
        _treeCss:function(){
           var lis=$(this).find("li");
            lis.each(function(){
                //console.log(123);
                var isHasSunUl=$(this).children("ul").length==1?true:false;
                //var isHasSunI=$(this).children("div").children("i").length==1?true:false;
                //console.log(isHasSunUl);
                var isHasSon=false;
                 if(isHasSunUl){
                     var isHasSunLi=$(this).children("ul").children("li").length>0?true:false;
                     if(isHasSunLi){
                         isHasSon=true;
                     }
                 }
                 if(isHasSon){
                     $(this).children("div").prepend("<i class='iconfont icon-arrow-down'></i>");
                 }else{
                     $(this).children("div").css({
                         "padding-left":20
                     });
                 }
           });
        },
        _treeOpenClose:function(){
            $(this).find("i[class*='iconfont']").click(function(){
                 var iconClass=$(this).hasClass("icon-arrow-right");
                 if(iconClass){  //关闭状态
                     $(this).removeClass("icon-arrow-right").addClass("icon-arrow-down").parent("div").next("ul").show();
                 }else{
                     $(this).removeClass("icon-arrow-down").addClass("icon-arrow-right").parent("div").next("ul").hide();
                 }
            });
        },
        _treeChecked:function(){
            $(this).find("span[class='tree-input']").click(function(){
                 var checked=$(this).find("input[type='checkbox']").prop("checked");
                 if(checked){
                     $(this).parent("div").next("ul").find("input[type='checkbox']").prop("checked",true);
                     $(this).parents("ul").prev("div").find("input[type='checkbox']").prop("checked",true);
                 }else{
                     $(this).parent("div").next("ul").find("input[type='checkbox']").prop('checked',false);
                 }
            });
        },
        _treeClick:function (callback) {
            var obj=this;
            $(this).find("span[class*='tree-text']").click(function () {
                 $(obj).find("span[class*='tree-text']").removeClass("selected");
                 $(this).addClass("selected");
                 if(callback&&$.isFunction(callback)){
                     var value=$(this).attr("data-value");
                     if(!value){
                         value=null;
                     }
                     callback(value)
                 }
            });
        }
    });
})(jQuery);