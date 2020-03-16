$(function () {
mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: true
    });



//关键子显示在搜索框

 var inputKey=LT.getParmas().key;
$(".search_input").val(inputKey);

//显示对应商品
//  getlistdata({
//      proName:LT.getParmas().key,
//      page:1,
//      pageSize:4
//  },function (data) {
//      $("#box").html(template("list",data))
//  })
    // $(".click").on("tap",function () {
    //     location.href = "shop.html?productId=1";
    //     // console.log(data);
    // })


$(".search_bth").on("tap",function () {
    var key=$.trim($(".search_input").val());
    if(!key){
        mui.toast("请输入关键字");
        return false;
    }
    getlistdata({
        proName:key,
        page:1,
        pageSize:4
    },function (data) {
        $("#box").html(template("list",data))
        console.log(data);

    })


})





//显示对应信息
function getlistdata(parmas,callback) {
     $.ajax({
         url:"/product/queryProduct",
         type:"get",
         data:parmas,
         dataType:"json",
         success:function (data) {
             callback&&callback(data)
         }
     })
 }


    // 下拉刷新
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function () {
                    var key=$.trim($(".search_input").val());
                    if(!key){
                        mui.toast("请输入关键字");
                        return false;
                    }
                    var _this=this;
                    getlistdata({
                        proName:key,
                        page:1,
                        pageSize:4
                    },function (data) {
                        $("#box").html(template("list",data));
                        _this.endPulldownToRefresh();
                    })
                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });





})


