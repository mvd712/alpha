$(function () {

    getData(function (data) {
        console.log(data);
        $(".mui-table-view").html(template("ck",data))

    })




    function getData(callback){
        LT.loginAjax({
            url:"/user/queryUserMessage",
            type:"get",
            data:"",
            dataType:"json",
            success:function (data) {
                console.log(data);
                callback&&callback(data)
            }
        })
    }
    var $out=$(".userout").parent().parent();
    console.log($out);

    $("body").on("tap",".userout",function () {

        LT.loginAjax({
            url:"/user/logout",
            type:"get",
            data:"",
            dataType:"json",
            success:function (data) {
                console.log(data);
                if(data.success==true){
                    location.href="../index.html"
                }
            }
        })
    })




})