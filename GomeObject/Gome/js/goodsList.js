
define(["jquery","jquery-cookie"],function($){
  
  function goodsList(){
    $(function(){
    
       $("#phoneList").click(function(){
        window.location.href = "http://localhost:8848/html/goodsdetail.html#";
        console.log(232323)
      
     })
      
    })
  }

return {
  goodsList:goodsList,
}
})