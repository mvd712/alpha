$(function () {
    console.log(LT.getParmas().productId);
   var shopid =LT.getParmas().productId;
     getProductData({id:shopid},function (data) {
         $(".shops").html(template('product',data));
         console.log(data);



         // 尺码选择
         $(".size").on("tap",function () {
             $(this).addClass("now").siblings().removeClass("now");
         })

         // 数量选择
         $(".number span").on("tap",function () {
             var num=$(this).siblings("input").val();
             var max=parseInt($(this).siblings("input").attr("data-max"));
             // console.log(max);
             if($(this).hasClass("cut")){
                 if(num==0){
                     mui.toast("非法数量");
                     return false;
                 }
                 num--;

             }else if($(this).hasClass("add")){
                 if(num>=max){
                     mui.toast("非法数量");
                     return false;
                 }
                 num++
             }
             $(this).siblings("input").val(num)
         })




         // 加入购物车
         $(".btn_addcar").on("tap",function () {
             // 校验数据
             var size1=$(".size.now");
             // console.log(size1);
             if(size1.length==0){
                 mui.toast("请选择尺码");
                 return false
             }
             var num=$(".num3").val();
             if(num<=0){
                 mui.toast("请选择数量");
                 return false
             }



             // 提交数据
             LT.loginAjax({
                 url:"/cart/addCart",
                 type:"post",
                 data:{
                     productId:shopid,
                     size:$(".size.now").html(),
                     num:num
                 },
                 success:function (data) {
                     // console.log(data);
                     if(data.error==400){
                         // location.href="/mobile/user/login.html?returnURL="+location.href
                     }
                     if(data.success==true){
                         console.log("成功")
                         location.href='./user/shoppingCart.html';

                     }
                 }
             })

         })


     })



})








var getProductData=function (id,callback) {
    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        data:id,
        dataType:"json",
        success:function (data) {
            callback&&callback(data);
        }
    })
}