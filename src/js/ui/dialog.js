(function($){
    $.extend($.fn, {
        /**
         * 打开弹框
         * 作者：姚明
         * 时间：2017-11-09
         * @param dialogCfn
         * url : "",  弹框内容url地址（必填项）
         * title : "默认标题", 弹框标题（可选）
         * titleClass:"标题的class类"（可选）
         * width : 600,  弹框宽度（可选，默认600px） 大于1则为像素宽度，小于等于1则为百分比宽度
         * height : 600,  弹框内容高度（可选，默认根据内容自适应）
         * top : 100, 弹框距离浏览器顶部高度 (可选，默认100px)
         * buttons : dialogBtn, 弹框按钮 （可选）
         * settings : {       弹框自定义参数 （可选）
         *   method : "add",
         *   id:"123456"
         * }
         */
        openMDialog:function(dialogCfn){
            if(!dialogCfn || !dialogCfn.url || dialogCfn.url==""){
                return ;
            }
            var mask = $("<div class='dialog-bg'/>");  // 遮罩层
            var dialog=$("<div class='dialog'/>");  //弹框
            var dialogTitle=$("<div class='dialogTitle' />"); //弹框标题
            var dialogContent=$("<div class='dialogContent' />"); //弹框内容
            var dialogBtn=$("<div class='dialogBtn'/>"); //弹框按钮
            var closeBtn=$("<i class='iconfont icon-close btn-sm'></i>");
            if(dialogCfn.titleClass){
                dialogTitle.addClass(dialogCfn.titleClass);
            }
           // dialogTitle.css("background-color","#fff");

            dialog.append(dialogTitle);
            dialog.append(dialogContent);
            dialog.append(dialogBtn);

            mask.append(dialog).appendTo("body");
            dialog.drag(dialogTitle);//添加拖拽功能
            //绑定close事件
            closeBtn.click(function(){
                mask.remove();
            });

            //设置弹框宽度
            var width=dialogCfn.width;
            if(width){
                if(width>1){
                    var pageWidth=$(window).width();
                    if(width>(pageWidth-200)){
                        width=pageWidth-200;
                    }
                    dialog.css({
                        "width":width,
                        "margin-left":(width/2)*(-1)
                    });
                }else if(width<=1){
                    width=width*100;
                    var left=width/2*(-1);
                    dialog.css({
                        "width":width+"%",
                        "margin-left":(width/2)*(-1)+"%"
                    });
                }
            }
            //设置弹框内容高度
            var height=dialogCfn.height;
            if(height){
                var pageHeight=$(window).outerHeight()-60;
                if(height>1){
                    if(height+55>=pageHeight){
                        height=pageHeight-55;
                    }
                    dialogContent.css({
                        "height":height-25
                    });
                    dialog.css({
                        "margin-top":((height+55)/2+15)*(-1)
                    });
                }else{
                    var dialogHeigth=pageHeight*height;
                    dialogContent.css({
                        "height":dialogHeigth-80
                    });
                    dialog.css({
                        "margin-top":((dialogHeigth)/2+15)*(-1)
                    });
                }
            }else{
                dialog.hide();
            }



            //设置弹框标题
            var title=dialogCfn.title;
            if(!title){
                title="默认标题";
            }
            dialogTitle.html(title).append(closeBtn);

            //用户自定义参数
            var settings=dialogCfn.settings;
            if(!settings){
                settings=null;
            }

            //设置弹框按钮
            var buttons=dialogCfn.buttons;
            if(!buttons){
                buttons= [
                    {
                        text: '确定',
                        onclick: function (dialog,settings) {
                            mask.remove();
                        }
                    },
                    {
                        text: '取消',
                        onclick: function (dialog,settings) {
                            mask.remove();
                        }
                    }
                ];
            }
            $.each(buttons,function (i,obj) {
                  var btn=$("<a class='btn' />");
                  if(i>0){
                      btn=$("<a class='btn ml-lg' />");
                  }
                  if(obj.class){
                      btn.addClass(obj.class);
                  }
                  btn.text(obj.text).appendTo(dialogBtn);
                  btn.click(function(){
                      var isRemove=true;
                      if($.isFunction(obj.onclick)){
                          isRemove=obj.onclick(dialog,settings);
                          if(isRemove==undefined){
                              isRemove=true;
                          }
                      }
                      if(isRemove){
                          mask.remove();
                      }
                  });
            });
            var url=dialogCfn.url;
            $.get(url,function(data){
                dialogContent.html(data);
                if(!height){
                     window.setTimeout(function () {
                         dialog.show();
                         var pageHeight=$(window).outerHeight()-60;
                         var dialogHeight=dialog.outerHeight();
                         //console.log("pageHeight="+pageHeight+",dialogHeight="+dialogHeight);
                         if(dialogHeight<=pageHeight){
                             dialog.css({
                                 "margin-top":((dialogHeight)/2)*(-1)
                             });
                         }else{
                             dialogContent.css({
                                 "height":pageHeight-80
                             });
                             dialog.css({
                                 "margin-top":((pageHeight)/2+15)*(-1)
                             });
                         }
                     },30);
                    // alert(dialogHeight+","+pageHeight);
                }
            });
        }
    });

    $.ligerDialog={
        width:300,
        _getDialogCfg:function(type,content,buttons,settings){
            var dialogCfn={
                type:type,
                title:"提示",
                content:content,
                width:this.width
            }
            if(buttons){
                dialogCfn.buttons=buttons;
            }
            if(settings){
                dialogCfn.settings=settings;
            }
            return dialogCfn;
        },
        _getClassName:function(type){
            var className="";
            if(type=="alert"){
                className="icon-dialog-alert";
            }
            if(type=="success"){
                className="icon-dialog-success";
            }
            if(type=="warn"){
                className="icon-dialog-warn";
            }
            if(type=="info"){
                className="icon-dialog-info";
            }
            if(type=="error"){
                className="icon-dialog-error";
            }
            if(type=="question"){
                className="icon-dialog-question";
            }
            return className;
        },
        /**
         * 生成弹框
         * 作者：姚明
         * 时间：2017-11-17
         * @param dialogCfn
         * type  : "alert" ,提示框类型(必填)  可取值为：alert,success,warn,info,error,question
         * title : "默认标题", 弹框标题（可选）
         * titleClass:"标题的class类"（可选）
         * content : "提示内容",提示内容（可选）
         * width : 300,  弹框宽度（可选，默认300px）
         * height : auto,  弹框内容高度（可选，默认根据内容自适应）
         * buttons : dialogBtn, 弹框按钮 （可选）
         * settings : {       弹框自定义参数 （可选）
         *   method : "add",
         *   id:"123456"
         * }
         */
        _getDialog:function(dialogCfn){
            if(!dialogCfn){
                return ;
            }
            var mask = $("<div class='dialog-bg'/>");  // 遮罩层
            var dialog=$("<div class='dialog'/>");  //弹框
            var dialogTitle=$("<div class='ligerDialogTitle iconfont' />"); //弹框标题
            var dialogContent=$("<div class='ligerDialogContent' />"); //弹框内容
            var dialogBtn=$("<div class='ligerDialogBtn'/>"); //弹框按钮
            var closeBtn=$("<i class='iconfont icon-close'></i>");

            if(dialogCfn.titleClass){
                dialogTitle.addClass(dialogCfn.titleClass);
            }
            var title=dialogCfn.title;
            if(!title){
                title="提示";
            }
            var content=dialogCfn.content;
            if(!content){
                content="";
            }
            var type=dialogCfn.type;

            var className=this._getClassName(type);
            dialogTitle.addClass(className).html(" "+title).append(closeBtn);
            dialogContent.html(content);
            dialog.append(dialogTitle);
            dialog.append(dialogContent);
            dialog.append(dialogBtn);
            mask.append(dialog);

            //绑定close事件
            closeBtn.click(function(){
                mask.remove();
            });



            //设置弹框宽度
            var width=dialogCfn.width;
            if(!width){width=300;}
            if(width>1){
                var pageWidth=$(window).width();
                if(width>(pageWidth-200)){
                    width=pageWidth-200;
                }
                dialog.css({
                    "width":width,
                    "margin-left":(width/2)*(-1)
                });
            }else if(width<=1){
                width=width*100;
                var left=width/2*(-1);
                dialog.css({
                    "width":width+"%",
                    "margin-left":(width/2)*(-1)+"%"
                });
            }
            //设置弹框内容高度
            var height=dialogCfn.height;
            if(height){
                var pageHeight=$(window).outerHeight()-60;
                if(height>1){
                    if(height+55>=pageHeight){
                        height=pageHeight-55;
                    }
                    dialogContent.css({
                        "height":height-25
                    });
                    dialog.css({
                        "margin-top":((height+55)/2+15)*(-1)
                    });
                }else{
                    var dialogHeigth=pageHeight*height;
                    dialogContent.css({
                        "height":dialogHeigth-80
                    });
                    dialog.css({
                        "margin-top":((dialogHeigth)/2+15)*(-1)
                    });
                }
            }else{
                dialog.hide();
            }

            //设置弹框距离顶部的距离
            /*
            var top=dialogCfn.top;
            if(top){
                dialog.css({
                    "top":top
                });
            }
             */
            //用户自定义参数
            var settings=dialogCfn.settings;
            if(!settings){
                settings=null;
            }

            //设置弹框按钮
            var buttons=dialogCfn.buttons;
            if(!buttons){
                buttons= [
                    {
                        text: '确定',
                        onclick: function (dialog,settings) {
                            mask.remove();
                        }
                    }
                ];
            }
            $.each(buttons,function (i,obj) {
                var btn=$("<a class='btn btn-small ' />");
                if(i>0){
                    btn=$("<a class='btn btn-small ml ' />");
                }
                if(obj.class){
                    btn.addClass(obj.class);
                }
                btn.text(obj.text).appendTo(dialogBtn);
                btn.click(function(){
                    var isRemove=true;
                    if($.isFunction(obj.onclick)){
                        isRemove=obj.onclick(dialog,settings);
                        if(isRemove==undefined){
                            isRemove=true;
                        }
                    }
                    if(isRemove){
                        mask.remove();
                    }
                });
            });

            if(!height){
                window.setTimeout(function(){
                    dialog.show();
                    var pageHeight=$(window).outerHeight()-60;
                    var dialogHeight=dialog.outerHeight();
                  //  alert(dialogHeight);
                    if(dialogHeight<=pageHeight){
                        dialog.css({
                            "margin-top":((dialogHeight)/2)*(-1)
                        });
                    }else{
                        dialogContent.css({
                            "height":pageHeight-80
                        });
                        dialog.css({
                            "margin-top":((pageHeight)/2+15)*(-1)
                        });
                    }
                },1)

            }

            return mask;
        },
        /**
         * 打开提示对话框
         * @param dialogCfn
         */
        openTDialog:function(dialogCfn){
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        /**
         * 打开通用的提示对话框
         * @param type
         * @param content
         */
        openCDialog:function(type,content,buttons,settings){
            var dialogCfn=this._getDialogCfg(type,content,buttons,settings);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        alert:function(content){
            var type="alert";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        success:function(content,buttons){
            var type="success";
            var dialogCfn=this._getDialogCfg(type,content,buttons);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        warn:function(content){
            var type="warn";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        info:function(content){
            var type="info";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        error:function(content){
            var type="error";
            var dialogCfn=this._getDialogCfg(type,content);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        },
        question:function(content,buttons,settings){
            var type="question";
            var dialogCfn=this._getDialogCfg(type,content,buttons,settings);
            var dialog=this._getDialog(dialogCfn);
            dialog.appendTo("body");
        }

    };

})(jQuery);