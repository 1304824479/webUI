(function($){
    $.extend($.fn, {
          initTab:function () {
               var obj=this;
               var index=window.localStorage.getItem("tabIndex");
               if(index==null){
                  index=0;
               }
              $(this).children("div[class*='tabs-header']").children("p").removeClass("selected").addClass("cursor");
               /*
               var length=$(this).children("div[class*='tabs-header']").children(".selected").length;
               if(length>0){
                   index=$(this).children("div[class*='tabs-header']").children(".selected").index()
               }else{
                   index=window.localStorage.getItem("tabIndex");
                   if(index==null){
                       index=0;
                   }
               }
               */
              $(this).children("div[class*='tabs-header']").children("p").eq(index).addClass("selected");
              $(this).children("div[class*='tabs-content']").eq(index).show();

              $(this).children("div[class*='tabs-header']").children("p").click(function () {
                   $(obj).children("div[class*='tabs-header']").children("p").removeClass("selected");
                   $(this).addClass("selected");
                   $(obj).children("div[class*='tabs-content']").hide();
                   var i=$(this).index();
                   window.localStorage.setItem("tabIndex",i);
                   $(obj).children("div[class*='tabs-content']").eq(i).show();
              });

          }
    });
})(jQuery);