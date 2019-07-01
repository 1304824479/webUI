(function($){
    $.extend($.fn, {
          drag:function(slider){
              var left, top, $this;
              var obj=this;
              $(slider).css({"cursor":"move"}).on("mousedown",function (e) {
                    left = e.clientX, top = e.clientY, $this = $(this);
                    console.log("left="+left+",top="+top);
                      slider.setCapture ? (   //当前元素捕获鼠标的所有事件
                          slider.setCapture(),
                              slider.onmousemove = function(ev) {
                                  mouseMove(ev || event);
                              },
                              slider.onmouseup = mouseUp
                      ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
              });

              /*
              $(document).delegate(slider, 'mousedown', function(e) {
                  left = e.clientX, top = e.clientY, $this = $(this);
                 // console.log("left="+left+",top="+top);
                  slider.setCapture ? (   //当前元素捕获鼠标的所有事件
                      slider.setCapture(),
                          slider.onmousemove = function(ev) {
                              mouseMove(ev || event);
                          },
                          slider.onmouseup = mouseUp
                  ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
              });
              */

              //获得鼠标指针在页面中的位置
              function mouseMove(e) {
                  var target = obj;
                  var l = Math.max((e.clientX - left + Number(target.css('margin-left').replace(/px$/, '')) || 0), -target.position().left);
                  var t = Math.max((e.clientY - top + Number(target.css('margin-top').replace(/px$/, '')) || 0), -target.position().top);
                  l = Math.min(l, $(window).width() - target.width() - target.position().left);
                  t = Math.min(t, $(window).height() - target.height() - target.position().top);
                  left = e.clientX;
                  top = e.clientY;
                  target.css({
                      'margin-left': l,
                      'margin-top': t
                  });
              }

              //当鼠标松开时
              function mouseUp(e) {
                 // var el = $this.css('cursor', 'default').get(0);
                  /*
                  var el = $this.get(0);
                  el.releaseCapture ?
                      (
                          el.releaseCapture(),
                              el.onmousemove = el.onmouseup = null
                      ) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
                  */
                  $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
              }
          }
    });

})(jQuery);