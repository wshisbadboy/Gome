
define(["jquery","jquery-cookie"],function($){
  
    function shopCar(){
      $(function(){
        shopCar_msg();
        // shopCar_num();
        //将数据加载到页面上
        $.ajax({
          url:'../data/data.json',
          success:function(res){
            var str = '';
            for(var i = 0;i < res.length;i++){
              str += `<li>
              <a href="#">
                <img src="${res[i].img}" alt="" />
                <p>${res[i].msg}</p>
                <span>￥：${res[i].price}.00</span>
              </a>
              <div id="${res[i].id}" title = "${res[i].price}" class="joincar">加入购物车</div>
            </li>`;
            }
            $('#recomment .wbox ul').html(str);
            // ischeck();
          },
          error:function(err){
            console.log(err);
          }
        })
      })

      //设置Cookie
      $("#recomment .wbox ul").on('click','.joincar',function(){
        //取出当前点击加入购物车按钮的ID
        var id = this.id;
        var price = this.title;
        //1、判断是否是第一次添加cookie
        var first = $.cookie('goods') == null ? true : false;
        if(first){
          $.cookie('goods',JSON.stringify([{id:id,num:1,price:price}]),{
            expires:3
          });
        }else{
          //2、不是第一次，判断之前是否添加过数据
          var cookieArr = JSON.parse($.cookie('goods'));
          var same = false;   //假设没有相同的数据
          for(var i = 0;i < cookieArr.length;i++){
            if(cookieArr[i].id == id){
              same = true;
              break;
            }
          }
          same ? cookieArr[i].num++ : cookieArr.push({id:id,num:1,price:price})
        
          //3、将处理完的数据存储回去
          $.cookie("goods",JSON.stringify(cookieArr),{
            expires:3
          })
        }
        // shopCar_num();
        shopCar_msg();
        // ischeck();
        // alert($.cookie("goods"));

        // var sum = shopCar_money();
        
        // $("#sumMoney").html(`￥：${sum}.00`);
      })
    }
  

    //加载右侧的购物车里的数据
      //1、购物车的数据存储在cookie中  2、商品的数据在服务器里
      function shopCar_msg(){
        $("#car .goodsList").html("");
        var cookieStr = $.cookie("goods");
        if(!cookieStr){
          return;
        }
        //下载所有的商品信息
        $.ajax({
          url:'../data/data.json',
          success:function(res){
            var cookieArr = JSON.parse(cookieStr);
            var newArr = [];
            for(var i = 0;i < res.length;i++){
              for(var j = 0;j < cookieArr.length;j++){
                if(cookieArr[j].id == res[i].id){
                  res[i].num = cookieArr[j].num;
                  newArr.push(res[i]);
                  break;
                }
              }
            }
            //通过newArr，处理数据，将数据插入到页面上
            // var str = '';
            for(var i = 0;i < newArr.length;i++){
               var node = $(`<div class="carGoodsList" id = "${newArr[i].id}">
              <div class="choose" ><i>√</i></div>
              <div class="chooseText">
                <a href="#">
                  <img src="${newArr[i].img}" alt="" />
                  <p>${newArr[i].msg}</p>
                </a>
              </div>
              <div class="goodservice">版本 ： 送货上门</div>
              <div class="goods"><span>￥：${newArr[i].price}.00</span></div>
              <div class="num">
                <div class="desc hand">-</div>
                <div id = "singlenum">${newArr[i].num}</div>
                <div class="add hand">+</div>
              
              <div class="sumPrice sum">￥：<span>${newArr[i].num * newArr[i].price}</span>.00</div>
              </div>
              <div class="handle hand">删除</div></div>`);
              node.appendTo("#car .goodsList")
            }
            // $("#car .goodsList").html(str);
            var sum = shopCar_money();
        
            $("#sumMoney").html(`￥：${sum}.00`);
          },
          error:function(err){
            console.log(err);
          }
        })
      }

      //给购物车里的删除按钮添加功能
      $("#car .goodsList").on('click',".handle",function(){
        var id = $(this).closest(".carGoodsList").remove().attr("id");
        //删除页面上的节点，从cookie中删除数据
        console.log(2332)
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0;i < cookieArr.length;i++){
          if(cookieArr[i].id == id){
            cookieArr.splice(i,1);
            break;
          }
        }
        //如果删除之后cookie数组不为空，重新设置cookie
        if(cookieArr.length){
          $.cookie("goods",JSON.stringify(cookieArr),{
            expires:3,
          })
        }else{
          //如果为空，直接删除cookie即可
          $.cookie("goods",null);
        }
        // alert($.cookie("goods"));
        //删除之后更新数量
        // shopCar_num()
        // // alert($.cookie("goods"))
        // var sum = shopCar_money();
        
        // $("#sumMoney").html(`￥：${sum}.00`);
        ischeck();
      })


      //给购物车里的加减按钮添加功能
      $("#car .goodsList").on("click",".hand",function(){
        var id = $(this).closest(".carGoodsList").attr("id");
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0;i < cookieArr.length;i++){
          if(cookieArr[i].id == id){
            break;
          }
        }
        if($(this).html() == "+"){
          cookieArr[i].num++;
          // var j = cookieArr[i].num;
          // $("#singlenum").html(j)
        }else{
          cookieArr[i].num == 1 ? cookieArr[i].num == 1 : cookieArr[i].num--;
          // var j = cookieArr[i].num;
          // $("#singlenum").html(j)
        }
        $.cookie("goods",JSON.stringify(cookieArr),{
          expires:3,
        });
        // //修改页面上的物品总数量
        $(this).siblings("#singlenum").html(`${cookieArr[i].num}`);
        // // alert(`${cookieArr[i].num}`)
        // // console.log(cookieArr[i])
        $(this).siblings(".sumPrice").html(`￥：<span>${cookieArr[i].num * cookieArr[i].price}</span>.00`);
        // shopCar_num();
        
        ischeck();
        
        // var sum = shopCar_money();
        
        // $("#sumMoney").html(`￥：${sum}.00`);
      })

      //处理物品的数量
      // function shopCar_num(){
      //   var cookieStr = $.cookie("goods");
      //   var sum = 0;
      //   if(cookieStr){
      //     var cookieArr = JSON.parse(cookieStr);
      //     for(var i = 0;i < cookieArr.length;i++){
      //       sum += cookieArr[i].num;
      //     }
      //   }
      //   $("#sumNum").html(sum);
      // }
      //处理购物车商品的总价
      // function shopCar_money(){
      //   var cookieStr = $.cookie("goods");
      //   var sum = 0;
      //   if(cookieStr){
      //     var cookieArr = JSON.parse(cookieStr);
      //     for(var i = 0;i < cookieArr.length;i++){
      //       sum += cookieArr[i].num * cookieArr[i].price;
      //     }
      //   }
      //   return sum;
      // }

      //清空购物车
      $("#clearShopCar").click(function(){
        $("#car .goodsList").html("");
        $.cookie("goods",null);
        ischeck();
      })

      //全选按钮
      function chooseAll(){
        $("#car .carTop .chooseAll i").click(function(){
          //全选
          var all = $("#car .goodsList .carGoodsList").find("i");
          if($(this).hasClass("bg")){
            $(this).add(all).removeClass("bg")
          }else{
            $(this).add(all).addClass("bg");
          }
          ischeck();
        })
        //单选
        $("#car .goodsList").on("click", ".carGoodsList i",function(){
          if($(this).hasClass("bg")){
            $(this).removeClass("bg")
          }else{
            $(this).addClass("bg");
          }
          ischeck();
        })
      }
      //单选全中
      function ischeck(){
        var all = $("#car .goodsList").find(".carGoodsList");
        var isAll = true;
        var total = 0;
        var count = 0;
        all.each(function(index,item){
          if(!$(item).find(".choose i").hasClass("bg")){
            isAll = false;
          }else{
            total +=  parseInt($(item).find(".num .sumPrice span").html());
            console.log(parseInt($(item).find("#singlenum").html()),parseFloat($(item).find(".num .sumPrice span").html()));
            count += parseInt($(item).find("#singlenum").html());
          }
        })
        $("#sumNum").html(count);
        $("#sumMoney").html(`￥：${total}.00`)
        if(isAll){
          $("#car .carTop .chooseAll").find("i").addClass("bg");
        }else{
          $("#car .carTop .chooseAll").find("i").removeClass("bg");
        }
      }
  return {
    shopCar:shopCar,
    chooseAll:chooseAll,
    ischeck:ischeck,
  }
})





