$(function () {
    grtAddressData(function (data) {
        $(".mui-table-view").html(template("addressList",{list:data}))
    })


    $(".mui-table-view").on("tap",".mui-btn-red",function () {
        var id=$(this).attr("data-num");
       deleteAddressData(id,function (data) {
          if(data.success){
              grtAddressData(function (data) {
                  $(".mui-table-view").html(template("addressList",{list:data}))
              })
          }
       })

    })


    // 删除收货地址接口
    function deleteAddressData(id,callback) {
        LT.loginAjax({
            url:"/address/deleteAddress",
            type:"post",
            data:{id:id},
            dataType:"json",
            success:function (data) {
                callback&&callback(data)
            }

        })
    }





    // 后端获取收货地址接口
    function grtAddressData(callback) {
        LT.loginAjax({
            url:"/address/queryAddress",
            type:"get",
            data:"",
            dataType:"json",
            success:function (data) {
                console.log(data);
                callback&&callback(data)
            }

        })
    }
    
    
    
    
    
    
    
    
})