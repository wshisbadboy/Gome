require.config({
  paths:{
    jquery:"jquery-1.11.3",
    "jquery-cookie":"jquery.cookie",
    shopCar:'shopCar',
  },
  shim:{
    //设置依赖关系
    "jquery-cookie":["jquery"],
    //如果某一个模块不遵从AMD规范
    // parabola:{
    //   exports:"_",
    // }
  }
})


//调用首页的代码
require(["shopCar"],function(shopCar){
  shopCar.shopCar();
  shopCar.chooseAll();
  shopCar.ischeck();
})