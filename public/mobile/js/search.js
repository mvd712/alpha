$(function () {
    var historyList=getHistory();


    $(".lt_history").html(template("history",{list:historyList}));

    $(".search_bth").on("tap",function () {
        var key=$(".search_input").val();
        if (!key){
            mui.toast('请输入关键字');
            return false;
        }

        $(historyList).each(function (index,item) {
            if(item==key){
                historyList.splice(index,1)
            }
        })

        if(historyList.length>=10){
            historyList.shift();
        }
        historyList.push(key);
        localStorage.setItem("lt_history",JSON.stringify(historyList))
        $(".lt_history").html(template("history",{list:historyList}));
        location.href="searchlist.html?key="+key;
        $(".search_input").val("")
    })

    $(".lt_history").on("tap",".fa-close",function () {
        var index=$(this).attr("data-index");
        historyList.splice(index,1);
        localStorage.setItem("lt_history",JSON.stringify(historyList))
        $(".lt_history").html(template("history",{list:historyList}));
        console.log("aa");
    });


    $(".lt_history").on("tap",".fa-trash",function () {
       historyList=[];
        localStorage.setItem("lt_history",JSON.stringify(historyList))
        $(".lt_history").html(template("history",{list:historyList}));

    })







    function getHistory() {
        var str=localStorage.getItem("lt_history")||"[]";
        var obj=JSON.parse(str);
        return obj
    }
})