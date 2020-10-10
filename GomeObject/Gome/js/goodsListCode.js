require.config({
  paths:{
    jquery:"jquery-1.11.3",
    "jquery-cookie":"jquery.cookie",
    goodsList:'goodsList',
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
require(["goodsList"],function(goodsList){
  goodsList.goodsList();
})