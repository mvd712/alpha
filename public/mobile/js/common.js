window.LT={};


//获取地址栏？后的ID信息
// decodeuri为中文解码的方法
LT.getParmas=function () {
    var search=decodeURI(location.search);
    if(search){
        search=search.replace("?","");
        var arr=search.split("&");

        var parmas={};
        arr.forEach(function (item,index) {
            var newArr=item.split("=");
            parmas[newArr[0]]=newArr[1];
        })
        return parmas;
    }
};

// 将用户名和密码发送至后台然后跳转回当前页面的公共方法
LT.loginAjax=function (obj) {
    $.ajax({
        url:obj.url||"#",
        type:obj.type||"get",
        data:obj.data||"",
        dataType:obj.dataType||"json",
        success:function (data) {
            if(data.error===400){
                location.href="/mobile/user/login.html?returnURL="+location.href;
                return false;
            }else {
                obj.success && obj.success(data);
            }

        }
    })
}

// 分隔str字符串
LT.strObj=function (str) {
    var obj={};
    if(str){
        var arr=str.split("&");
        arr.forEach(function (item,index) {
            var newarr=item.split("=");
            obj[newarr[0]]=newarr[1]

        })
        return obj;
    }
}
