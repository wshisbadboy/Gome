define(["jquery","jquery-cookie"],function($){
  
  function goodsdetail(){
    $(function(){

      //放大镜
     $("#picture").mouseenter(function(){
       $("#small,#big").show();
     }).mouseleave(function(){
      $("#small,#big").hide();
     }).mousemove(function(ev){
      var l = ev.pageX - $(this).offset().left - 100;
      var t = ev.pageY - $(this).offset().top - 100;
      //限制出界
      l = Math.max(0, l);
      l = Math.min(250, l);
      t = Math.max(0, t);
      t = Math.min(250, t);

      $("#small").css({
        left: l,
        top: t
      })
      $("#big img").css({
        left:-2.25 * l,
        top:-2.25 * t
      })
    })
      //插入放大的图片
      $("#picList ul").on("mouseenter","li",function(){
        $(this).css("borderColor"," #e3101e").siblings("li").css("borderColor", 'transparent');
        // console.log($(this))
        $("#picture").html(`<img src="../images/hugeimg${$(this).index() + 1}.jpg" alt="">
        <div id="small"></div>`);
        $("#big").html(`<img src="../images/hugeimg${$(this).index() + 1}.jpg" alt="">`)
      })
    })
    //配置选择
    $("#color,#cache").on("mouseenter","a",function(){
      $(this).addClass("active")
    })
    $("#color,#cache").on("mouseleave","a",function(){
      $(this).removeClass();
    })

    $("#color").on("click","a",function(){
      $("#color a").css("border","1px solid #ccc");
      $(this).css("borderColor","#e3101e");
      return false;
    })
    $("#cache").on("click","a",function(){
      $("#cache a").css("border","1px solid #ccc");
      $(this).css("borderColor","#e3101e");
      // console.log($(this).index())
      $("#price").html(`￥${4599 + $(this).index() * 500}.0`);
      return false;
    })

    //增减数量
    var i = 1;
    $("#add").click(function(){
      $("#sum").html(`${++i}`);
      return false;
    });
    $("#desc").click(function(){
      if(i < 2){
        i = 2;
      }
      $("#sum").html(`${--i}`);
      return false;
    })


    // $("#btnRight").click(function(){
    //   $("#head_r a").html(`${$("#sum").html()}件商品`);
    //   var sum = $("#sum").html();
    //   $.cookie('goods',sum,{
    //     expires:3
    //   });
    // })

    // arr = [
    //   {
    //     mark: 0,
    //     img: "http://localhost:8848/images/microimg2.jpg",
    //     msg: "Apple iPhone11 黑色 64G移动联通电信4G手机",
    //     price: "5099",
    //   },
    //   {
    //     mark: 1,
    //     img: "http://localhost:8848/images/youlike12.jpg",
    //     msg: "Apple iPad 平板电脑 2019/2020年新款 10.2英寸(2019款深空灰 128G WLAN版标配)",
    //     price: "2618",
    //   },
    //   {
    //     mark: 2,
    //     img: "http://localhost:8848/images/youlike05.jpg",
    //     msg: "长虹（CHANGHONG）42M1 42英寸  蓝光高清  全面屏平板液晶LED电视机（黑色）(黑色 42英寸高清全面屏)",
    //     price: "1099",
    //   },
    //   {
    //     mark: 3,
    //     img: "http://localhost:8848/images/youlike04.jpg",
    //     msg: "华硕(ASUS)D555/D540YA7010 15.6英寸 轻薄商务办公便携娱乐笔记本电脑 E1-7010 定制(外黑内金 4G/500G硬盘)",
    //     price: "4499",
    //   },
    //   {
    //     mark: 4,
    //     img: "http://localhost:8848/images/youlike07.jpg",
    //     msg: "TCL空调 大一匹冷暖空调挂机家用定速1p壁挂式 KFRd-26GW/XQ11+3(白色 1匹)",
    //     price: "1449",
    //   },
    //   {
    //     mark: 5,
    //     img: "http://localhost:8848/images/youlike08.jpg",
    //     msg: "海尔电热水器家用40/50/60升家用节能2KW速热恒温储水式热水器海尔出品统帅系列8年质保(50升)",
    //     price: "599",
    //   },
    // ];
    // console.log(JSON.stringify(arr));

  }

return {
  goodsdetail:goodsdetail,
}
})
