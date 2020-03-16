$(function () {

    // 三级联动
    // 通过new mui.poppicker()初始化选择列表
    var picker = new mui.PopPicker({
        // 显示的列数
        layer:3
    });
    // 之后给picker加数据  setdata支持数据格式为 数组
    picker.setData(cityData);
    // 点击地址框 弹出
    $(".addresss").on("tap",function () {
        picker.show(function (items) {
            if(items[0].text==items[1].text){
                $(".addresss").val(items[0].text+items[2].text)
            }else {
                $(".addresss").val(items[0].text+items[1].text+items[2].text)
            }
        })
    })



    // 判断地址栏是否传参 传参了就是跳转修改收货地址页面 没有就跳转至添加收货地址页面
    var addressId=location.search;
    addressId=addressId&&addressId.split('=');
    addressId=addressId&&addressId[1];
    if (addressId){
        $(".lt_header h3").html("修改地址");
        grtAddressData(function (data) {
            var obj={};
          data.forEach(function (item) {
              if(item.id==addressId){
                  obj=item;

              }
          })
            $("[name=\"recipients\"]").val(obj.recipients);
            $("[name=\"postcode\"]").val(obj.postCode);
            $("[name=\"address\"]").val(obj.address);
            $("[name=\"addressDetail\"]").val(obj.addressDetail);


        })


    }else {
        $(".lt_header h3").html("添加地址");
    }






    // 点击确认传入后台
    $(".btn_register").on("tap",function () {
        console.log(decodeURI($("form").serialize()));
        var str=decodeURI($("form").serialize());
        var data=LT.strObj(str);
        console.log(data);


        var myUrl="/address/addAddress";
        var tip="添加";
        // 如果addressID存在说明在修改地址页面
        if(addressId){
            myUrl="/address/updateAddress";
            data.id=addressId;
            tip:"修改";
        }
        editAddressData(myUrl,data,function (data) {
            mui.toast(tip+"成功");
            location.href="address.html"
        })
    })



//从后台获取
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

    // 在同一个页面面对修改地址或添加地址要调用不同接口情况下 封装一个方法
    function editAddressData(editUrl,parmas,callback) {
        LT.loginAjax({
            url:editUrl,
            type:"post",
            data:parmas,
            dataType:"json",
            success:function (data) {
                callback&&callback(data)
            }

        })
    }


})