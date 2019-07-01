(function($){
    $.extend($.fn, {
        /**
         * 作者：姚明
         * 日期：2018-11-01
         * 功能：仿android加载列表数据
         * @param config
         * url:请求后台的url (可选参数)
         * params：请求后台的参数  (可选参数)
         * data：列表数据 (可选参数)
         * isOpenCache： 是否开启页面缓存机制 默认false (可选参数)
         * moreDiv：更多按钮 (必填参数)
         * onItemClick ：项目点击方法，(可选参数)
         * getItem：获取每一项数据 (必填参数)
         *
         */
         list:function (config) {
             if(this._checkListConfig(config)){
                 var ulObj=this;
                 if(config.isOpenCache){
                     var listCache=window.localStorage.getItem("listCache");
                     if(listCache==null){
                         $(ulObj)._list(config,1);
                     }else{
                         listCache=JSON.parse(listCache);
                         var ulObjHtml=listCache.ulObjHtml;
                         var page=listCache.page;
                         var pageCount=listCache.pageCount;
                         var scrollTop=listCache.scrollTop;
                         $(ulObj).html(ulObjHtml);
                         var isHaveClick=$.isFunction(config.onItemClick);
                         if(isHaveClick){
                             $(ulObj).children().each(function () {
                                 var item=this;
                                 var cacheObj=$(item).attr("data-cache");
                                 obj=JSON.parse(cacheObj);
                                 $(this)._onItemClick(ulObj,config,page,pageCount,obj);
                             });
                         }
                         if(page<pageCount){
                             var moreDiv=config.moreDiv;
                             $(ulObj)._scroll(config,page);
                             $(ulObj).after(moreDiv);
                         }
                         window.localStorage.removeItem("listCache");
                         $(ulObj).parent().scrollTop(scrollTop);
                     }
                 }else{
                     $(ulObj)._list(config,1);
                 }
             }
         },
        _checkListConfig:function (config) {
            if(!config){
                //alert("列表配置文件不能为空");
                app.alert("列表配置文件不能为空");
                return false;
            }

            if(!config.moreDiv || config.moreDiv==""){
                app.alert("更多列表元素不能为空");
                return false;
            }
            return true;
        },
        _list:function (config,page) {
            var ulObj=this;
            var moreDiv=config.moreDiv;
            var data=config.data;
            var pageCount=1;
            var isHaveClick=$.isFunction(config.onItemClick);
            if(data){
                pageCount=data.pageCount;

                var list=data.list;
                $.each(list,function(i,obj){
                    var item=config.getItem(obj);
                    if(isHaveClick){
                        item._onItemClick(ulObj,config,page,pageCount,obj);
                    }
                    $(ulObj).append(item);
                });
                if(page==1&&page<pageCount){
                    $(ulObj).after(moreDiv);
                }
                if(page<pageCount){
                    $(ulObj)._scroll(config,page);
                }else{
                    moreDiv.remove();
                }
            }else{
                var url=config.url;
                var params=config.params;
                if(!params){
                    params={page:page}
                }else{
                    params['page']=page;
                }

                $.post(url,params,function (data) {
                    pageCount=data.pageCount;
                    var list=data.list;
                    $.each(list,function(i,obj){
                        var item=config.getItem(obj);
                        if(isHaveClick){
                            item._onItemClick(ulObj,config,page,pageCount,obj);
                        }
                        $(ulObj).append(item);
                    });
                    console.log("page="+page+",pageCount="+pageCount);
                    if(page==1&&page<pageCount){
                        $(ulObj).after(moreDiv);
                    }
                    if(page<pageCount){
                        $(ulObj)._scroll(config,page);
                    }else{
                        moreDiv.remove();
                    }
                });

            }
        },
        _scroll:function (config,page) {
            var ulObj=this;
            var ulParent=$(this).parent();
            $(ulParent).on('scroll',function(){
                var divHeigth=ulParent.outerHeight();
                var scrollTop=ulParent.scrollTop();
                var scrollHeight=ulParent.get(0).scrollHeight;
                if(scrollHeight==(divHeigth+scrollTop)){
                    $(ulParent).unbind("scroll");
                    page+=1;
                    console.log("加载第"+page+"页");
                    $(ulObj)._list(config,page);
                }
            });
        },
        _onItemClick:function (ulObj,config,page,pageCount,obj) {
            var isHaveClick=$.isFunction(config.onItemClick);
            var isOpenCache=config.isOpenCache;
            var item=this;
            $(item).attr("data-cache",JSON.stringify(obj));
            if(isHaveClick){
                $(item).removeAttr("onclick");
                item.click(function () {
                    if(isOpenCache){
                        var ulObjHtml=$(ulObj).html();
                        var scrollTop=$(ulObj).parent().scrollTop();
                        var listCache={
                            ulObjHtml:ulObjHtml,
                            page:page,
                            pageCount:pageCount,
                            scrollTop:scrollTop
                        };
                        listCache=JSON.stringify(listCache);
                        window.localStorage.setItem("listCache",listCache);
                    }
                    config.onItemClick(obj);
                })
            }
        }
    });
})(jQuery);






