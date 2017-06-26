/**
 * Created by wangpan on 2017/1/8.
 */
/*页面加载*/
// if(!sessionStorage['loginUid']){
//     location.href="login.html";
// }
$(function(){
    $("#site-header").load("data/header.php",function () {
        $("#site-header #welcome").parent().html(`欢迎回来，${sessionStorage['loginUname']}`);
    });
    $("#site-footer").load("data/footer.php");
    $.ajax({
        url:"data/cart_detail_list.php?uid="+sessionStorage['loginUid'],
        success:function (obj) {
            var html=``;
            $.each(obj,function(i,p){
                html+=` <div class="prd-list">
                    <ul>
                        <li class="sel"><input type="checkbox" class="selprd"></li>
                        <li class="prd-detail">
                            <img src="${p.pic}">
                            <p><a href="#">${p.title}
                            </a></p>
                        </li>
                        <li class="price">￥<span>${p.price}</span></li>
                        <li class="count">
                            <div>
                                <button class="minus" data-did="${p.did}">-</button>
                                <input type="text" class="prd-count" value="${p.count}">
                                <button class="plus" data-did="${p.did}">+</button>
                            </div>
                        </li>
                        <li class="subPrice">
                            <span>${(p.price*p.count).toFixed(2)}</span>
                        </li>
                        <li class="control">
                            <a class="btnDel" href="">删除</a>
                        </li>
                    </ul>
                </div>`
            })
            $('#cart-list').html(html);
        }
    })
})
/*顶部*/
$("#site-header").on("mouseenter",".detail-nav",function() {
    var $site = $(this).children(".site-nav");
    var $height = parseFloat($site.css("height"));
    $site.css("display","block") ;
    $site.css("height", 0);
    $site.animate({
        height: $height
    }, 200);
    $site.prev().addClass("hover");
});
$("#site-header").on("mouseleave",".detail-nav",function(){
    var $site = $(this).children(".site-nav");
    $site.css("display","none") ;
    $site.prev().removeClass("hover");
});

/*全选*/
$("#cart").on("change","input[type='checkbox']",function () {
    var chks=$("#cart input[type='checkbox']");
    if($(this).is(".selAll")){
        if($(this).prop("checked")){
            chks.prop("checked",true);
        }else if(!$(this).prop("checked")){
            chks.removeProp("checked");
        }
    }else{
        if(!$(this).prop("checked")){
            $("#cart input.selAll").prop("checked",false);
        }
    }
    var num=$("#cart-list input:checked");
    if(num.size()==chks.size()-2){
        $("#cart input.selAll").prop("checked",true);
    }
    sum();
});
$("#cart-list").on("click","li.count button",function(){
    var count=parseInt($(this).siblings("input").val());
    var price=$(this).parent().parent().siblings(".price").children("span").html();
    var did=$(this).data("did");
    if($(this).is(".plus")){
        count++;
        $(this).siblings('input').val(count);
        $.ajax({
            url:"data/cart_detail_update.php",
            data:{did:did,count:count},
            success: function (obj) {
                return;
            }
        })
    }else if($(this).is(".minus")&&count>1){
       count--;
       $(this).siblings('input').val(count);
        $.ajax({
            url:"data/cart_detail_update.php",
            data:{did:did,count:count},
            success: function (obj) {
                return;
            }
        })
    }
    $(this).parent().parent().siblings(".subPrice").children("span").html((count*price).toFixed(2));
    sum();
})
/*计算总价*/
function sum(){//计算总价
    var chk=$("#cart-list input:checked");//所有被选择的商品行;
    var subPriceList=$("#cart-list li.subPrice");//小计LI
    var subCountList=$("#cart-list li.count input");
    var totalPrice=0;
    var totalCount=0;
    for(var i=0;i<chk.size();i++){
        var subPrice=parseFloat(chk.eq(i).parent().siblings(".subPrice").children("span").html());
        totalPrice+=subPrice;
        var subCount=parseInt(chk.eq(i).parent().siblings(".count").find("input").val());
        totalCount+=subCount;
    }
    $("#cart-settle .totalPrice>p>span").html("￥"+totalPrice.toFixed(2));
    $("#cart-settle>.totalCount>div>span").html(totalCount);
}


