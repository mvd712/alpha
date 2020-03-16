$(function () {

    getFirstData(function (data) {
// 渲染页面
// 使用模板引擎
        var firsthtml=template("first",data);
        $(".cate_left ul").html(firsthtml);

        var categortId= $(".cate_left ul").find("a").attr("data-id");//获取ID值
        $(".cate_left li").removeClass("now")
        $(".cate_left li").parent().addClass("now")
        getSecondData({id:categortId},function (data) {//根据左边的ID值将数据渲染在右边ul上
            $(".cate_right ul").html(template("second",data));

        })
    })
})

   var getFirstData=function (callback) {
       $.ajax({
           url:"/category/queryTopCategory",
           type:"get",
           dataType:"json",
           success:function (data) {
            callback&&callback(data)
           }
       })
    }
    //parmas{id:1}
var getSecondData=function (id,callback) {
    $.ajax({
        url:"/category/querySecondCategory",
        type:"get",
        data:id,
        dataType:"json",
        success:function (data) {
            callback&&callback(data)
        }
    })
}

$(".cate_left").on('tap',"a",function(){//点击左边事件
    if($(this).parent().hasClass("now"))return;
        var categortId= $(this).attr("data-id");//获取ID值
      $(".cate_left li").removeClass("now")
    $(this).parent().addClass("now")
        getSecondData({id:categortId},function (data) {//根据左边的ID值将数据渲染在右边ul上
            $(".cate_right ul").html(template("second",data));

        })

})


