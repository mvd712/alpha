$(function () {
    $(".mui-btn-primary").on("tap",function () {
        // console.log("11");
        // console.log($("#form").serialize());获取表单序列化的数据 必须要有form表单标签 必须要有name属性


        // 前台验证
        var dataobj=LT.strObj($("#form").serialize());
        // console.log(dataobj);
        if(!dataobj.username){
            mui.toast("用户名错误");
            return false;
        }
        if(!dataobj.password){
            mui.toast("密码错误");
            return false;
        }

        // 后台验证
        $.ajax({
            url:"/user/login",
            type:"post",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (data) {
                // console.log(data);
                if(data.success==true){
                    // 获取传过来的地址在调回去
                    var returnurl=location.search.replace("?returnURL=","");
                    if(returnurl){
                        location.href=returnurl;
                        e.preventDefault();
                    }else {
                        location.href="../index.html";
                    }

                }else if(data.error==403){
                    mui.toast(data.message)
                }


            }
        })
    })
})