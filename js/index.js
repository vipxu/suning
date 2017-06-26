/*顶部搜索框*/
$(function(){
	$("#site-footer").load("data/footer.php");
	if(sessionStorage['loginUid']){
        $("#header #welcome").parent().html(`欢迎回来，${sessionStorage['loginUname']}`);
	}
})
$(window).scroll(function(){
	var top=parseFloat($("body").scrollTop());
	if(top>=1500){
        $("#search-top").css("display","block");
	}else{
        $("#search-top").css("display","none");
	}
	$().off("mouseup");
	//楼层信息
});
$(function(){
	$.ajax({
		url:'data/floor.php',
		success: function (data) {
			$floor=$(".floor");
			$.each(data.navList, function (i, f) {
				var nList=data.navList[i];
				var html=$floor.eq(nList.fid-1).find("h1>ul").html();
				var html1=$floor.eq(nList.fid-1).find(".prd-activities").html();
				var k=$floor.index($floor.eq(nList.fid-1));
				if(nList.fid==k+1){
					html+=`<li><a href="#">${f.navName}<i></i></a></li>`;
					html1+=`<div class="prd-act2 hide">`;
					$.each(data.productList, function (n,g) {
						var pList=data.productList[n];
						if(pList.cateId==nList.cateId){
							html1+=`
								<dl>
										<dt><img src="${g.pic}"></dt>
										<dd><a href="#">${g.title}</a></dd>
										<dd><p>￥${g.price}</p></dd>
								</dl>`
						}
					})
					html1+=`</div>`;
				}
				$floor.eq(nList.fid-1).find("h1>ul").html(html);
				$floor.eq(nList.fid-1).find(".prd-activities").html(html1);
			})
		},
		error: function () {
			console.log("请求出错")
		}
	})
});
/*公告栏切换*/
$(".sn-news-football>ul>li").on("click","a",function(e){
		e.preventDefault();
		var div=$($(this).attr("href").slice($(this).attr("href").lastIndexOf("#")));
		$(this).addClass("hover").parent().siblings().children("a").removeClass("hover");
		div.addClass("in").siblings("div").removeClass("in");
		
})
/*顶部*/
$("#header-main").on("mouseenter",".detail-nav",function() {
        var $site = $(this).children(".site-nav");
        var $height = parseFloat($site.css("height"));
		$site.css("display","block") ;
            $site.css("height", 0);
            $site.animate({
                height: $height
            }, 200);
            $site.prev().addClass("hover");
    });
$("#header-main").on("mouseleave",".detail-nav",function(){
		 var $site = $(this).children(".site-nav");
		 $site.css("display","none") ;
		$site.prev().removeClass("hover");
	});
/*图片点击切换事件*/
$("div.banner-images>.arrow-right").click(function (){
	var $images1=$(".images-wrap>.page");
	for (var i=0;i<$images1.length ;i++ )
	{
		if (parseFloat($images1.eq(i).css("left"))==0)
		{
			move(1);
		}
	}
});
$("div.banner-images>.arrow-left").click(function (){
	var $images1=$(".images-wrap>.page");
	for (var i=0;i<$images1.length ;i++ )
	{
		if (parseFloat($images1.eq(i).css("left"))==0)
		{
			move(-1);
		}
	}
});
	function move(dir){
	var $images=$(".images-wrap>.page");
	var $width=parseFloat($images.eq(0).css("width"));
	for (var r=0;r<$images.length ;r++ )
		{
			if ($images.eq(r).css("left")==-1*dir*$width+"px")
			{
				$images.eq(r).css("left",($images.size()-1)*dir*$width+"px");
			}
		};
	{
		$images.each(function(i){
		var $left=parseFloat($images.eq(i).css("left"));
		$images.eq(i).animate({
		left:$left-dir*$width,
		},300);
		});
	}
	}
/*淡入淡出轮播*/
var imgs=[
{"i":0,"img":"images/images/banner1.jpg","bg":"#ED335A"},
{"i":1,"img":"images/images/banner2.jpg","bg":"#9720DA"},
{"i":2,"img":"images/images/banner3.jpg","bg":"#41B104"},
{"i":3,"img":"images/images/banner4.jpg","bg":"#DE2342"},
{"i":4,"img":"images/images/banner5.jpg","bg":"#FE0000"}
]
var shuffling={
	$imgs:null,
	$idxs:null,
	WAIT:4000,
	DURATION:300,
	timer:null,
	init(){
		this.$imgs=$("#imgs");
		this.$idxs=$("#indexs");
		this.updateView();
		this.$imgs.children().first().css("opacity",1);
		this.startAuto();
		this.$idxs.on("mouseenter","li",e=>{
			if (!$(e.target).hasClass("hover"))
			{
				clearTimeout(this.timer);
				this.timer=null;
				this.$imgs.stop(true);
				var start=this.$idxs.children(".hover").html();
				var end=$(e.target).html();
				this.move(end-start);
			}
		});
		$("#shuffling>button.arrow-left").click(()=>{
			clearTimeout(this.timer);
				this.timer=null;
				this.$imgs.stop(true);
				this.move(-1);
		});
		$("#shuffling>button.arrow-right").click(()=>{
			clearTimeout(this.timer);
				this.timer=null;
				this.$imgs.stop(true);
				this.move(1);
		});
	},
	updateView(){//根据数组更新页面
		for (var i=0,imgsHTML="",idxsHTML="";i<imgs.length ;i++ )
		{
			imgsHTML+=`<li><a href=\"javascript:;\"><img src=${imgs[i].img}></a></li>`;
			idxsHTML+=`<li>${i+1}</li>`;
		}
			this.$imgs.html(imgsHTML);
			this.$idxs.html(idxsHTML).children(`:eq(${imgs[0].i})`).addClass("hover");
	},
	startAuto(){
		this.timer=setTimeout(this.move.bind(this,1),this.WAIT);
	},	
	move(n){
		if (n>0)
		{
				this.$imgs.children().first().animate({
				opacity:0,
			},this.DURATION,()=>{
				imgs=imgs.concat(imgs.splice(0,n));
				$("#banner").animate({backgroundColor:imgs[0].bg},this.DURATION);
				this.updateView();
				this.$imgs.children().first().animate({opacity:1},this.DURATION);
				})
				this.startAuto();
		}else
		{
			n*=-1;
			this.$imgs.children().first().animate({
				opacity:0,},this.DURATION,()=>{
				imgs=imgs.splice(-n,n).concat(imgs);
				$("#banner").animate({backgroundColor:imgs[0].bg},this.DURATION);
				this.updateView();
				this.$imgs.children().first().animate({
				opacity:1,},this.DURATION);
				});
			this.startAuto();
		}
	}
}
shuffling.init();
//大牌盛宴
$(".main-right a").mouseenter(function(){
	$(this).parent().addClass("hover").siblings(".hover").removeClass("hover");
})
$(".main-right a").mouseleave(function(){
	$(this).parent().parent().children(".hover").removeClass("hover");
})
$("#header").on("click","#welcome",function(e){
	e.preventDefault();
	$(".modal").css("display","block");
})

$(".floor>h1").on("mouseenter","ul>li>a",function(e){
	// e.preventDefault();
	var i=$(this).parent().parent().children().index($(this).parent());
	$(this).parent().addClass("active").siblings().removeClass("active");
	var $div=$(this).parent().parent().parent().siblings(".prd-activities").children().eq(i);
	$div.removeClass("hide").siblings().addClass("hide");
});

//点击登录发起异步请求
$(".modal a#login").click(function(e){
	e.preventDefault();
	var $uname=$(this).siblings("[name='uname']").val();
	var $upwd=$(this).siblings("[name='upwd']").val();
	$.ajax({
		type:'post',
		url:'data/login.php',
		data:{uname:$uname,upwd:$upwd},
		success:function (obj) {
			if(obj.code>0){
				$(".modal").css("display","none");
				$("#header #welcome").parent().html(`欢迎回来，${$uname}`);
				sessionStorage['loginUname']=$uname;
				sessionStorage['loginUid']=obj.uid;
			}else{
				$(".modal .alert").html(obj.msg);
			}
		}
	})
})
//电梯楼层
var elevator={
    FHEIGHT:0,//保存楼层高度
    UPLEVEL:0,//保存亮灯区域的上限
    DOWNLEVEL:0,//保存亮灯区域的下限
    $h1s:null,//保存每个楼层的灯span
    $elevator:null,//保存电梯按钮的div
    DURATION:500,
    init(){
        var me=this;//留住this
        //获得class为floor的元素的高保存在height
        var height=
            parseFloat($(".floor").css("height"));
        //获得class为floor的元素的marginBottom保存在bottom
        var bottom=
            parseFloat($(".floor").css("marginBottom"));
        //计算FHEIGHT: height+bottom
        me.FHEIGHT=height+bottom;
        //计算UPLEVEL: (innerHeight-FHEIGHT)/2
		me.UPLEVEL=50;
        //计算DOWNLEVEL: UPLEVEL+FHEIGHT;
		me.DOWNLEVEL=(me.UPLEVEL+me.FHEIGHT);
        //获得class为floor下的header下的span保存在$h1
        me.$h1s=$(".floor>h1");
        //获得id为elevator的div保存在$elevator中
        me.$elevator=$("#elevator");
        //为当前页面绑定滚动事件
        $(document).scroll(e=>{
            //获得页面滚动过的高度
            var scrollTop=$(e.target).scrollTop();
            //对$h1中每个h1执行相同操作
            me.$h1s.each(i=>{
                //获得$h1s下i位置的h1
                var $h1=me.$h1s.eq(i);
                //获得当前h1距body顶部的offsetTop
                var offsetTop=$h1.offset().top
                //计算innerTop: offsetTop-scrollTop
                var innerTop=offsetTop-scrollTop;
                //如果innerTop<=DOWNLEVEN&&>UPLEVEL
                if(innerTop<me.DOWNLEVEL
                    &&innerTop>=me.UPLEVEL){
                    //为当前h1添加hover class
                    $h1.addClass("hover");
                }else{//否则
                    //为当前h1移除hover class
                    $h1.removeClass("hover");
                }
            });
            //如果有hover的span，
            //为$elevator添加in class
            //否则
            //为$elevator移除in class
            if(me.$h1s.hasClass("hover")){
                me.$elevator.addClass("in");
                //获得当前被选中的h1
                var $h1=me.$h1s.filter(".hover");
                if($h1.size()>0){//如果找到
                    //获得$h1在$h1s中的位置
                    var i=me.$h1s.index($h1);
                    //获得elevator下i位置的li
                    var $li=
                        me.$elevator.find(`li:eq(${i})`);
                    //为其添加CLASS 为ACTIVE并删除其兄弟元素的CLASS
                    $li.addClass("active").siblings(".active").removeClass("active");

                }
            }else
                me.$elevator.removeClass("in");
        });
        //为$elevator添加单击事件代替,只允许ul下的li下的最后一个a响应
        me.$elevator.on("click","ul>li>a",
            function(){
        		$(this).parent().addClass("active").siblings(".active").removeClass("active");
                var i=
                    $(this).index("#elevator a");
                //获得h1s中i位置的h1的offsetTop
                var offsetTop=me.$h1s.eq(i).offset().top;
                //计算scrollTop: offsetTop-UPLEVEL
                var scrollTop=offsetTop-me.UPLEVEL;
                $("body").stop(true);
                $("body").animate({
                    scrollTop:scrollTop
                },me.DURATION);
            });
    }
}
elevator.init();