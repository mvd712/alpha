$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators:false,
    });

    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function () {
                    var _this=this;
                    setTimeout(function () {
                        getCartData(function (data) {
                            console.log(data);
                            $(".mui-table-view").html(template("cart",{list:data}));
                            _this.endPulldownToRefresh()
                        })
                    },200)

                }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });


    // 刷新页面
    $(".fa-refresh").on("tap",function () {
        mui('#refreshContainer').pullRefresh().pulldownLoading();

    })
    // 删除商品
    $(".mui-table-view").on("tap",".mui-btn-red",function () {
        var id=$(this).attr("data-id");
        var $that=$(this);
        mui.confirm('是否删除','提示',['是','否'],function (e) {
            // 如果选择是 则调用删除接口 data为删除依据接口参数
            //成功后执行页面删除
            if(e.index==0){
                LT.loginAjax({
                    url:"/cart/deleteCart",
                    type:"get",
                    data:{
                        id:id
                    },
                    dataType:"json",
                    success:function (data) {
                        // console.log(data);
                        if(data.success==true){
                            $that.parent().parent().remove()
                            getprice()
                        }
                    }
                })



            }else {
                mui.swipeoutClose($that.parent().parent()[0])
            }
        })
    })
    // 编辑
    $(".mui-table-view").on("tap",".mui-btn-blue",function () {
        var id=$(this).attr("data-id");
        var $that=$(this);

        var $li=$that.parent().parent()


        var html=template("edit",this.dataset);
        // console.log(html);
        mui.confirm(html.replace(/\n/g,""),'编辑商品',['是','否'],function (e) {
            if(e.index==0){
                var size=$(".size.now").html();
                var num=$(".number input").val();
                console.log(size, num);
                LT.loginAjax({
                    url:"/cart/updateCart",
                    type:"post",
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    dataType:"json",
                    success:function (data) {
                        console.log(data);
                        // callback&&callback(data);
                        if(data.success==true){
                            $li.find(".number1").html(num)
                            $li.find(".size1").html(size)
                            $li.find("input").attr("data-num",num)


                            getprice();
                            mui.swipeoutClose($that.parent().parent()[0])
                        }
                    }
                })
            }else {
                mui.swipeoutClose($that.parent().parent()[0])
            }
        })
    })

    // 尺码选择
    $("body").on("tap",".size",function () {
        $(this).addClass("now").siblings().removeClass("now");
    })

    // 数量选择
    $("body").on("tap",".number span",function () {
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

    // 计算价格
    $(".mui-table-view").on("change",'[type="checkbox"]',function () {
        getprice()
    })

    function getprice() {
        var $checkbox=$("[type=\"checkbox\"]:checked");
        var total=0;
        console.log($checkbox);
        $checkbox.each(function (index,item) {
            var num=$(this).attr("data-num");
            var price=$(this).attr("data-price");

            total+=num*price;
        })
        total=total.toFixed(2);
        $("#caramout").html(total)
    }

   function getCartData(callback) {
        LT.loginAjax({
            url:"/cart/queryCart",
            type:"get",
            data:"",
            dataType:"json",
            success:function (data) {
                console.log(data);
                callback&&callback(data);
            }
        })
    }

})