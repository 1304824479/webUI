(function($){
    $.extend($.fn, {

        /**
         * 初始化布局
         * @param layoutCfg
         */
        initLayout:function(layoutCfg){
            var obj=this;
            $(obj).ligerLayout(layoutCfg);
            $(window).resize(function () {   //当浏览器大小变化时
                $(obj).ligerLayout(layoutCfg);
            });
        },
        /**
         * 根据配置参数布局
         * @param layoutCfg
         * topHeight:0  //顶部高度
         * leftWidth:0  //左边宽度
         * rightWidth:0 //右边宽度
         * bottomHeight:0 //底部高度
         */
        ligerLayout:function(layoutCfg){
            if(!layoutCfg){
                return ;
            }
            var layout=this;   //当前布局对象
            var layoutSpacing=5;  //子布局边距
            var layoutWidth=$(this).width();  //布局总宽度
            var layoutHeight=$(this).height(); //布局总高度
            var topHeight=layoutCfg.topHeight?layoutCfg.topHeight:0;  //头部高度
            var leftWidth=layoutCfg.leftWidth?layoutCfg.leftWidth:0;  //左边宽度
            var rightWidth=layoutCfg.rightWidth?layoutCfg.rightWidth:0;  //右边宽度
            var bottomHeight=layoutCfg.bottomHeight?layoutCfg.bottomHeight:0; //底部高度
            var topDiv=$(this).find("div[position='top']");
            var leftDiv=$(this).find("div[position='left']");
            var centerDiv=$(this).find("div[position='center']");
            var rightDiv=$(this).find("div[position='right']");
            var bottomDiv=$(this).find("div[position='bottom']");
            var isExitTopDiv=topDiv[0]?true:false;
            var isExitLeftDiv=leftDiv[0]?true:false;
            var isExitCenterDiv=centerDiv[0]?true:false;
            var isExitRightDiv=rightDiv[0]?true:false;
            var isExitBottomDiv=bottomDiv[0]?true:false;
            $(this).find(".layout-vertical-arrow").remove();
            $(this).find(".layout-horizontal-arrow").remove();
            if(topHeight>0&&leftWidth>0&&rightWidth>0&&bottomHeight>0){  //宽度高度都存在
                if(isExitTopDiv&&isExitLeftDiv&&isExitCenterDiv&&isExitRightDiv&&isExitBottomDiv){  //子布局都存在

                    var centerDivWidth=layoutWidth-leftWidth-rightWidth-layoutSpacing*2;
                    var centerDivHeight=layoutHeight-topHeight-bottomHeight-layoutSpacing*2;
                    var leftDivHeight=layoutHeight-topHeight-bottomHeight-layoutSpacing*2;
                    var rightDivHeight=layoutHeight-topHeight-bottomHeight-layoutSpacing*2;
                    topDiv.addClass("layout-son layout-son-bg").css({
                        height:topHeight
                    });

                    leftDiv.addClass("layout-son layout-son-bg").css({
                        float:"left",
                        width:leftWidth,
                        height:leftDivHeight,
                        "margin-top":layoutSpacing
                    });

                    centerDiv.addClass("layout-son").css({
                        float:"left",
                        width:centerDivWidth,
                        height:centerDivHeight,
                        "margin-left":layoutSpacing,
                        "margin-top":layoutSpacing,
                        "margin-bottom":layoutSpacing
                    });

                    rightDiv.addClass("layout-son layout-son-bg").css({
                        float:"left",
                        width:rightWidth,
                        height:rightDivHeight,
                        "margin-left":layoutSpacing,
                        "margin-top":layoutSpacing
                    });

                    bottomDiv.addClass("layout-son layout-son-bg").css({
                        height:bottomHeight,
                        clear:"both"
                    });

                    //左边收缩图标
                    var miniLeft=$("<div class='layout-vertical-arrow mini-left'></div>");
                    miniLeft.css({
                        left:leftWidth,
                        height:layoutHeight-topHeight-bottomHeight-layoutSpacing*2,
                        top:topHeight+layoutSpacing
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-left");
                        if(iconClass){
                            leftDiv.css({
                                width:0,
                                "border-width":0
                            });
                            var centerWith=centerDivWidth+leftWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-left").addClass("mini-right").css({
                                left:0
                            });
                        }else{
                            leftDiv.css({
                                width:leftWidth,
                                "border-width":1
                            });
                            var centerWith=centerDiv.width()+1-leftWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-right").addClass("mini-left").css({
                                left:leftWidth
                            });
                        }
                    });

                    //右侧收缩图标
                    var miniRight=$("<div class='layout-vertical-arrow mini-right'></div>");
                    miniRight.css({
                        right:rightWidth,
                        height:layoutHeight-topHeight-bottomHeight-layoutSpacing*2,
                        top:topHeight+layoutSpacing
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-right");
                        if(iconClass){
                            rightDiv.css({
                                width:0,
                                "border-width":0
                            });
                            var centerWith=centerDivWidth+rightWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-right").addClass("mini-left").css({
                                right:0
                            });
                        }else{
                            rightDiv.css({
                                width:rightWidth,
                                "border-width":1
                            });
                            var centerWith=centerDiv.width()+1-rightWidth;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-left").addClass("mini-right").css({
                                right:rightWidth
                            });
                        }
                    });


                    //上部收缩图标
                    var miniTop=$("<div class='layout-horizontal-arrow mini-top'></div>");
                    miniTop.css({
                        left:0,
                        top:topHeight
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-top");
                        if(iconClass){
                            topDiv.css({
                                height:0,
                                "border-width":0
                            });
                            var centerHeight=centerDivHeight+topHeight;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-top").addClass("mini-bottom").css({
                                top:0
                            });
                        }else{
                            topDiv.css({
                                height:topHeight,
                                "border-width":1
                            });
                            var centerHeight=centerDiv.height()-topHeight+1;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-bottom").addClass("mini-top").css({
                                top:topHeight
                            });
                        }
                    });


                    //底部收缩图标
                    var miniBottom=$("<div class='layout-horizontal-arrow mini-bottom'></div>");
                    miniBottom.css({
                        left:0,
                        bottom:bottomHeight
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-bottom");
                        if(iconClass){
                            bottomDiv.css({
                                height:0,
                                "border-width":0
                            });
                            var centerHeight=centerDivHeight+bottomHeight;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-bottom").addClass("mini-top").css({
                                bottom:0
                            });
                        }else{
                            bottomDiv.css({
                                height:bottomHeight,
                                "border-width":1
                            });
                            var centerHeight=centerDiv.height()-bottomHeight+1;
                            leftDiv.css({
                                height:centerHeight
                            });
                            centerDiv.css({
                                height:centerHeight
                            });
                            rightDiv.css({
                                height:centerHeight
                            });
                            $(this).removeClass("mini-top").addClass("mini-bottom").css({
                                bottom:bottomHeight
                            });
                        }
                    });
                }else{
                    console.log("some of div elements are missing");
                }
            }else if(topHeight==0&&leftWidth>0&&rightWidth==0&&bottomHeight==0){  //只有左边有宽度时

                if(isExitLeftDiv&&isExitCenterDiv){  //存在左边布局和中间布局

                    leftDiv.addClass("layout-son layout-son-bg").css({
                        float:"left",
                        width:leftWidth,
                        height:layoutHeight
                    });
                    console.log(layoutWidth-leftWidth-layoutSpacing);
                    centerDiv.addClass("layout-son").css({
                        float:"left",
                        width:layoutWidth-leftWidth-layoutSpacing,
                        height:layoutHeight,
                        "margin-left":layoutSpacing
                    });

                    //左边收缩图标
                    var miniLeft=$("<div class='layout-vertical-arrow mini-left'></div>");
                    miniLeft.css({
                        left:leftWidth,
                        top:0
                    }).appendTo(this).click(function(){
                        // alert(111);
                        var iconClass=$(this).hasClass("mini-left");
                        if(iconClass){
                            leftDiv.css({
                                width:0,
                                "border-width":0
                            });
                            var centerWith=centerDiv.width()+leftWidth+2;
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-left").addClass("mini-right").css({
                                left:0
                            });
                        }else{
                            leftDiv.css({
                                width:leftWidth,
                                "border-width":1
                            });
                            //var centerWith=centerDiv.width()+2-leftWidth;
                            var centerWith=layoutWidth-leftWidth-layoutSpacing;
                            console.log(centerWith);
                           // console.log(layoutWidth-leftWidth-layoutSpacing);
                            centerDiv.css({
                                width:centerWith
                            });
                            $(this).removeClass("mini-right").addClass("mini-left").css({
                                left:leftWidth
                            });
                        }
                    });

                }else{
                    console.log("left or center div elements are missing");
                }
            }else{
                console.log("The corresponding parameters are missing");
            }




        }

    });
})(jQuery);