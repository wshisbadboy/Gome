define(["jquery"], function ($) {
  function banner() {
    $(function () {
      const obanner = document.querySelector("#banner .banc");
      const oImgBox = document.querySelector("#banner .banc .imgBox");
      const obtns = document.querySelectorAll("#banner .banc .pointBox li");
      const leftRightBtn = document.querySelectorAll("#banner .banc a");

      //楼层导航  右侧固定购物车
      $(window).on('scroll',function(){
        var  scroll = $(document).scrollTop();
        // console.log(scroll)
        if(parseInt(scroll) > 1200){
          $("#floorsFixed").css("display",'block');
          // $("#floorsFixed li").eq(2).css("color","red")
        }else{
          $("#floorsFixed").css("display",'none');
        }
        if(parseInt(scroll) > 800){
          $(".fixation .returnTop").css("display","block")
                                    .mouseover(function(){
                                      $(".returntop").css("right","32px")
                                    }).mouseout(function(){
                                      $(".returntop").css("right","-300px")
                                    }).click(function(){
                                      $("body,html").animate({
                                        scrollTop: 0
                                      },
                                      500);
                                    })
        }else{
          $(".fixation .returnTop").css("display","none")

        }
      })
      //右侧
      $(".fixation .Serve").mousemove(function(){
        $(".serve").css("right","32px")
      }).mouseout(function(){
        $(".serve").css("right","-300px")
      })
      $(".fixation .Search").mousemove(function(){
        $(".search").css("right","32px")
      }).mouseout(function(){
        $(".search").css("right","-300px")
      })
      $(".fixation .shopCar").mousemove(function(){
        $(".shopcar").css({"right":"32px","bottom":"50px"})
      }).mouseout(function(){
        $(".shopcar").css("right","-300px")
      })

      //楼层导航样式
      $("#floorsFixed").on("click","li a",function(){
        $('#floorsFixed li a').css("color","#888888")
        $(this).css('color','red')
        $("body,html").animate({
          scrollTop: 1000
        },
        500);
      })
      
      //左侧返回顶部和底部
      $("#floorsFixed .upFloor").click(function(){
        $('body,html').animate({
          scrollTop: 0
        },
        500);
      })
      $("#floorsFixed .downFloor").click(function(){
        $('body,html').animate({
          scrollTop: 4000
        },
        500);
      })
      

      //轮播图
      bannerMove(obanner,oImgBox,obtns,leftRightBtn,750,8)
      
    });
  }



  function bannerMove(obanner,oImgBox,obtns,leftRightBtn,imageWidth,imageNum){
    var iNow = 1; //代表当前显示的图片下标
    var timer = null;
    let isRunning = false; //设置标志量，代表当前动画正在执行

    //实现自动轮播
    function autoTab() {
      timer = setInterval(function () {
        iNow++;
        tab();
      }, 2000);
    }

    //开始就要轮播
    autoTab();

    //banner添加移入移出效果
    obanner.onmouseenter = function () {
      clearInterval(timer);
    };
    obanner.onmouseleave = function () {
      autoTab();
    };

    //点击按钮时，进行小圆按钮和轮播图的切换
    for (var i = 0; i < obtns.length; i++) {
      obtns[i].index = i;
      obtns[i].onclick = function () {
        iNow = this.index + 1;
        tab();
      };
    }

    //实现轮播效果
    function tab() {
      //清除所有的按钮的样式
      for (let i = 0; i < obtns.length; i++) {
        obtns[i].className = "";
      }
      if (iNow == obtns.length + 1) {
        obtns[0].className = "active";
      } else if (iNow == 0) {
        obtns[obtns.length - 1].className = "active";
      } else {
        obtns[iNow - 1].className = "active";
      }
      
      //开始动画
      isRunning = true;
      startMove(oImgBox, { left: iNow * -1*imageWidth }, function () {
        //判断最后一张图片结束的时候
        if (iNow == obtns.length + 1) {
          iNow = 1;
          oImgBox.style.left = -1*imageWidth + "px";

          //判断是第一张图片的时候
        } else if (iNow == 0) {
          iNow =imageNum ;
          oImgBox.style.left = iNow * -1*imageWidth + "px";
        }
        //动画结束
        isRunning = false;
      });

      leftRightBtn.onmouseenter = function(){
        // $(this).style.opacity = 0.4;
        $(this).css("opacity","0.4");
      }

      //添加左右按钮点击
      leftRightBtn[0].onclick = function () {
        if (!isRunning) {
          iNow--;
          tab();
        }
        return false;
      };
      leftRightBtn[1].onclick = function () {
        if (!isRunning) {
          iNow++;
          tab();
        }
        return false;
      };
    }
  }







  function startMove(node, styleObj, func) {
    clearInterval(node.timer);

    node.timer = setInterval(function () {
      //设置标志量，判断是否全部属性都执行完（假设全部完成）
      var end = true;

      for (var styleName in styleObj) {
        var targetValue = styleObj[styleName];
        var validValue = null;

        //获取当样式的有效值，注意区别透明度
        if (styleName == "opacity") {
          validValue = parseInt(parseFloat(get_style(node, styleName) * 100));
        } else {
          validValue = parseInt(get_style(node, styleName));
        }

        //处理速度
        var speed = (targetValue - validValue) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        validValue += speed;

        //重设样式，注意区别透明度
        if (styleName == "opacity") {
          node.style.opacity = validValue / 100;
          node.style.filter = `alpha(opacity = ${validValue})`;
        } else {
          node.style[styleName] = validValue + "px";
        }

        //全部完成后，改变标志位
        if (validValue != targetValue) {
          end = false;
        }
      }

      //都到达目标值，清除定时器
      if (end) {
        clearInterval(node.timer);
        func && func.call(node);
      }
    }, 30);
  }

  //声明一个获取有效样式的具有兼容性的函数
  function get_style(label, attr) {
    return label.currentStyle
      ? label.currentStyle[attr]
      : getComputedStyle(label)[attr];
  }


////侧边栏
  function asideFunc(){
    $("#banner .banl").mouseenter(function(){
      $("#goodsList").css("display","block");
    }).mouseleave(function(){
      $("#goodsList").css("display","none");
       
    })
    $("#banner .banl").find(".l1").mouseenter(function(){
       var that = $(this);
      $(this).css("backgroundColor","#ffffff").css("color","#888888");
      // console.log($(this).index())
      $.ajax({
        url:'../data/asidedata.json',
        success:function(res){
          // console.log(res);
          // var res = JSON.parse(res);
          var str = '';
          for(i = 0;i < res.length;i++){
            // console.log(that.index())
            if(that.index() == res[i].id){
              // console.log(res[i].msg)
              $("#goodsList").html();
              for(j = 0;j < res[i].msg.length;j++){
                str += `<dl>
              <dt>${res[i].msg[j][0]}</dt>
                <dd><a href="#"> ${res[i].msg[j][1]}</a></dd>
                <dd><a href="#"> ${res[i].msg[j][2]}</a></dd>
                <dd><a href="#" class="stress"> ${res[i].msg[j][3]}</a></dd>
                <dd><a href="#"> ${res[i].msg[j][4]}</a></dd>
                <dd><a href="#"> ${res[i].msg[j][5]}</a></dd>
                <dd><a href="#"> ${res[i].msg[j][6]}</a></dd>
                <dd><a href="#" class="stress"> ${res[i].msg[j][7]}</a></dd>           
            </dl>`
              }
              
            $("#goodsList").html(str);
            }
          }
        },
        error:function(msg){
          console.log(msg);
        }
      })
    }).mouseleave(function(){
      $(this).css("backgroundColor","#888888").css("color","#ffffff")   
    })
    

  }


  //youMayLike
  function youLike(){
    var i = 9;
    $("#right").click(function(){
      i++;
      var j = i % 3;
      $("#youlike .youlikecon").find(".youmaylikegoods").removeClass("show");
      $("#youlike .youlikecon").find(".youmaylikegoods").eq(j).addClass("show");
      return false;
    });
    $("#left").click(function(){
      i--;
      var j = i % 3;
      $("#youlike .youlikecon").find(".youmaylikegoods").removeClass("show");
      $("#youlike .youlikecon").find(".youmaylikegoods").eq(j).addClass("show");
      if(i == 2){
        i = 10;
      }
      return false;
    })
    
  }

  //onefloorCOmment
  function onefloorComment(){
    $("#activity").mouseenter(function(){
      $("#oneFloor .onefloorR .menuList ul").html("");
      $("#oneFloor .goodsTitle ul li").removeClass("active");
      $(this).addClass("active");
      $("#oneFloor .onefloorR .ban").add($("#oneFloor .onefloorR .goods")).addClass("show");
      // console.log(233)
    })

    $("#oneFloor .goodsTitle ul").on("mouseenter",".onefloorComment",function(){
      $("#oneFloor .onefloorR .ban").add($("#oneFloor .onefloorR .goods")).removeClass("show");
      $("#oneFloor .goodsTitle ul li").removeClass("active");
      $(this).addClass("active");
      $("#oneFloor .onefloorR .menuList ul").html("");
      // console.log($(this).index())
      var that = $(this).index();
      $.ajax({
        url:'../data/onefloorgoods.json',
        success:function(res){
          // console.log(res)
          for(i = 0;i < res.length;i++){
            if(that == res[i].id){
              // console.log(that,res[i].id)
              // var msg = res[j].msg
              var str = '';
              for(j = 0;j < res[i].msg.length;j++){
                str += `<li><a href="#"><img src="${res[i].msg[j][0]}" alt="">
                            <p>${res[i].msg[j][1]}</p>
                          </a>
                        </li>`;
              }
              $("#oneFloor .wbox .onefloorR .menuList ul").html(str);
              // console.log(str);
          }
          }
          
        },
        error:function(msg){
          console.log(msg)
        },
      })
    })
  }


  return {
    banner: banner,
    asideFunc:asideFunc,
    youLike:youLike,
    onefloorComment:onefloorComment,
  };
});
