var is_login_chk = true;

/* gnbMenu */
function initNavigation(seq) {
	jQuery(seq).addClass('on');
	jQuery('#gnbMenu > li').hover(
		function () {
			if ( jQuery('#gnbMenu').hasClass('m_gnbMenu') )
			{				
				jQuery('.m_gnbMenu').addClass('on');
			}
			jQuery('#gnbMenu > li').removeClass('on');
		},
		function () {			
			if ( jQuery('#gnbMenu').hasClass('m_gnbMenu') )
			{
				jQuery('.m_gnbMenu').removeClass('on');
			}
			jQuery(seq).addClass('on');
		}
	);
};

/* tol tip */
$(document).ready(function(){	
	$(".toltip_block a").live("mouseover",function() {
		$(this).next(".toltip").animate({opacity: "show", top: "5%"}, "fast");
	}).live("mouseout", function() {
		$(this).next(".toltip").animate({opacity: "hide", top: "5%"}, "fast");
	});
});

/* aside */
$(document).ready(function(){
	$(".openSide").click(function(){
			$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#dHead')) ) }, "past",setScrollFlagTrue);
		});

	$(".btn_sOpen_dpi").toggle(function(){				
		  $( "#aSide" ).animate({width:960}, {duration: 1500, easing: 'easeOutQuart'}).css("overflow","visible");
		  $(".happyServ_list").animate({opacity:0.3}, 1000);
		  $(".happyServ_list").animate({opacity:1}, 1000);
		  $(this).addClass("active"); return false;
	 }, function(){
		  $( "#aSide" ).animate({width:375}, {duration: 1500, easing: 'easeOutQuart'});
		  $(".happyServ_list").animate({marginLeft: 0}, {opacity:1}, 1000);
		  $( "#aSide" ).css("overflow","visible");
		  $(this).removeClass(""); return false;
	 });

	  $(".btn_sOpen").toggle(function(){		  
		  $( "#aSide" ).animate({width:960}, {duration: 1500, easing: 'easeOutQuart'}).css("overflow","visible");
		  $(".happyServ_list").animate({marginLeft: -15});
		  $(this).addClass("active"); return false;		 
	 }, function(){
		  $( "#aSide" ).animate({width:55}, {duration: 1500, easing: 'easeOutQuart'}).css("overflow","visible");
		  $(".happyServ_list").animate({marginLeft: 0});
		  $(this).removeClass("active"); return false;
	 });

});

/* browser scroll */ 
$(window).scroll(function () {  	
	   var offset = $(document).scrollTop()+ "px";  
	   $(".openSide").animate({top:offset},{duration:300,queue:false});  
	  /* $(".btn_pageTop").animate({top:offset},{duration:300,queue:false});  */
		   
	 }); 


/* page scroll */
 $(document).ready(function() {
	 // 차량 예약 > 편의장비 연동
	 $(".premiumActive").live("click", function(){		 
		$("#popContainer").width(240);
		$('#popContainer div').remove();
		$("#premiumInfo .premium_title").html( $(this).attr("data-name") );
		
		
		
		$("#premiumInfo .premium_pic").html("<img src='/images/egovframework/example/goods/option/"+$(this).attr("data")+"/list.png' />");
		$("#premiumInfo .premium_price_data").html( $(this).attr("data-price") );
		$("#popContainer").append( $("#premiumInfo").html() ).height( $("#premiumInfo").height() );
		modal_window();
		$('#mask').show();
		var h = Number($('#popContainer').css("top").split('px')[0])+200;
		$('#popContainer').show();
	 });
		/*
		if (!$(".btn_triger").length) {
			return;
		}
		*/
	
	// 차량 검색 > 차량 예약
	$(".reservActive").live("click",function(){		
		is_login_chk = true;
		var type = this.href.split('#')[1];
		// 로그인 확인
		if( !isLogin())
			return false;

		// 48시간 이하 체크
		var frm=document.carForm;
		var Stime = new Date(frm.sdate.value.substr(0,4),String(Number(frm.sdate.value.substr(5, 2)) -1 ),frm.sdate.value.substr(8,2),frm.stime.value,frm.sminute.value);
		var Etime = new Date(frm.edate.value.substr(0,4),String(Number(frm.edate.value.substr(5, 2)) -1 ),frm.edate.value.substr(8,2),frm.etime.value,frm.eminute.value);
		var Tmin=(Etime-Stime)/60000;	
		if ( Math.ceil(Tmin/60) <  48 ) {
			alert("대여시간이 48시간 미만인 경우 실시간예약은 이용하실 수 없습니다. 예약상담 또는 고객센터(1644-7935)로 문의주세요.");		
			return false;
		}

		var el = $('#' + this.href.split('#')[1]);
		var targetEl = el;
		var anotherEl = $('.page_conEl');
		anotherEl.addClass('hide');

		if(targetEl.hasClass('hide')){
			anotherEl.addClass('hide').removeClass('show'); 
			anotherEl.slideUp(1);
			targetEl.removeClass('hide').addClass('show');
			targetEl.slideDown(1);
			$(".page_detail").slideUp(1); //이용후기 안보이게
		} else {
			targetEl.removeClass('show').addClass('hide');
			targetEl.slideUp(1);
		}

		
		var stringData = $("#carForm").serialize();
		$('#reservPage').empty();
		$('#advicePage').empty();
		$.ajax(
			{
				type:"post",
				dataType:"html",
				url: "/rental_reserv/"+$(this).parent().attr("data-car"),
				data: stringData,
				success: function(data) {
					$('#reservPage').append(data);	
					if (type == 'reservView')
					{						
						$("#itemPage").addClass('hide').removeClass('show'); 
						$("#itemPage").slideUp(1);
						$('#reservPage').removeClass('hide').addClass('show');
						$('#reservPage').slideDown(1);
						$(".page_detail").slideUp(1); //이용후기 안보이게
					}

					scorllflag = false;
					$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#layerNavi')) ) }, "slow",setScrollFlagTrue);
					$('.btn_triger').removeClass("active");
					$(this).addClass("active");
					return false;					
				}
			}
		);
	});
	// 차량 검색 > 차량 상세 > 이용후기 보기
	$(".detailreviewActive").live("click",function(){
		var type = this.href.split('#')[1];
		$('#reviewPage').empty();
		var Rdata = "&MNO="+$(this).attr("data-car");
		if ($(this).attr("data-page"))
		{
			Rdata +="&page="+$(this).attr("data-page");
		}
		if ( $("body").hasClass("layout_mobile") )
		{
			location.href='/data/review/'+$(this).attr("data-bno");
		}
		$.ajax(
			{
				type:"post",
				dataType:"html",
				url: "/rental_review/"+$(this).attr("data-bno"),
				data: Rdata,
				success: function(data) {
					$('#reviewPage').append(data);		
					if (type == 'reviewPage')
					{					
						$(".page_detail").addClass('hide').removeClass('show'); 
						$(".page_detail").slideUp(300);
						$('#reviewPage').removeClass('hide').addClass('show');
						$('#reviewPage').slideDown(400);
					}
					return;
				}
			}
		);
	});	
	// 프리미엄 검색 > 이용후기 보기
	$(".detailPreviewActive").live("click",function(){		
		var type = this.href.split('#')[1];
		if (type == 'reviewPage' || type == 'reviewView')
		{	
			$('#reviewPage').empty();
			var Rdata = "&UNO="+$(this).attr("data-car");
			if ($(this).attr("data-page"))
			{
				Rdata +="&page="+$(this).attr("data-page");
			}		
			var url_ = "/Premium_review/"+$(this).attr("data-bno");
		}
		else if (type == 'itemPge')
		{
			$('#premium_view').empty();
			showLoading2("premium_view");
			var url_ = "/Premium/view/"+$(this).attr("data-premium");
			var Rdata;
		}
		$.ajax(
			{
				type:"post",
				dataType:"html",
				url: url_,
				data: Rdata,
				success: function(data) {						
					if (type == 'reviewPage' )
					{	
						$('#reviewPage').append(data);
						$(".page_detail").addClass('hide').removeClass('show'); 
						$(".page_detail").slideUp(300);
						$('#reviewPage').removeClass('hide').addClass('show');
						$('#reviewPage').slideDown(400);
					}
					else if (type == 'reviewView')
					{
						$('#reviewPage').append(data);
					}
					else if (type == 'itemPge')
					{						
						$('#premium_view').empty();
						$('#premium_view').append(data);	
						$(".premium_view .gallery p img").attr("src" , $(".premium_view .gallery ul li:eq(0) img").attr("src"));
						$(".premium_view .gallery ul li:eq(0) a").addClass("on");
						$('.flexslider').flexslider({
							animation: "slide"
						});
					}
					return;
				}
			}
		);
	});	
	// 차량 검색 >  예약상담
	$(".adviceActive").live("click",function(){				
		is_login_chk = true;
		var type = this.href.split('#')[1];
		// 로그인 확인
		if( !isLogin())
			return false;

		// 24시간 이하 체크
		var frm=document.carForm;
		var Stime = new Date(frm.sdate.value.substr(0,4),String(Number(frm.sdate.value.substr(5, 2)) -1 ),frm.sdate.value.substr(8,2),frm.stime.value,frm.sminute.value);
		var Etime = new Date(frm.edate.value.substr(0,4),String(Number(frm.edate.value.substr(5, 2)) -1 ),frm.edate.value.substr(8,2),frm.etime.value,frm.eminute.value);
		var Tmin=(Etime-Stime)/60000;	
		if ( Math.ceil(Tmin/60) <  25 ) {
			alert("대여시간이 24시간 이하인 경우 홈페이지 상담을 이용하실 수 없습니다. 고객센터(1644-7935)로 문의주세요.");		
			return false;
		}

		var el = $('#' + this.href.split('#')[1]);
		var targetEl = el;
		var anotherEl = $('.page_conEl');
		anotherEl.addClass('hide');

		if(targetEl.hasClass('hide')){
			anotherEl.addClass('hide').removeClass('show'); 
			anotherEl.slideUp(1);
			targetEl.removeClass('hide').addClass('show');
			targetEl.slideDown(1);
			$(".page_detail").slideUp(1); //이용후기 안보이게
		} else {
			targetEl.removeClass('show').addClass('hide');
			targetEl.slideUp(1);
		}

		var stringData = $("#carForm").serialize();
		$('#reservPage').empty();
		$('#advicePage').empty();
		$.ajax(
			{
				type:"post",
				dataType:"html",
				data: stringData,
				url: "/rental_advice/"+$(this).parent().attr("data-car"),
				success: function(data) {
					$('#advicePage').append(data);					
					if (type == 'adviceView')
					{
						$("#itemPage").addClass('hide').removeClass('show'); 
						$("#itemPage").slideUp(1);
						$('#advicePage').removeClass('hide').addClass('show');
						$('#advicePage').slideDown(1);
						$(".page_detail").slideUp(1); //이용후기 안보이게
					}
					scorllflag = false;
					$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#layerNavi')) ) }, "slow",setScrollFlagTrue);
					$('.btn_triger').removeClass("active");
					$(this).addClass("active");
					return false;
				}
			}
		);
	});
	// 차량 상세
	$(".detailActive").live("click",function(){
		is_login_chk = true;
		$('#itemPage').empty();
		showLoading2("itemPage");
		var stringData = $("#carForm").serialize();
		$.ajax(
			{
				type:"post",
				dataType:"html",
				data: stringData,
				url: "/rental_detail/"+$(this).parent().attr("data-car"),
				success: function(data) {	
					$('#itemPage').empty();
					$('#itemPage').append(data);	
					$(".rentCar_view .gallery p img").attr("src" , $(".rentCar_view .gallery ul li:eq(0) img").attr("src"));
					$(".rentCar_view .gallery ul li:eq(0) a").addClass("on");
					return;
				}
			}
		);
	});
	// 차량 상세 > 이미지 오버시
	$(".rentCar_view .gallery ul li a").live("mouseover" , function(){
		$(".rentCar_view .gallery ul li a").removeClass("on");
		$(this).addClass("on");
		$(".rentCar_view .gallery p img").attr("src" , $(this).find("img").attr("src"));
	});


	$(".btn_triger").live("click", function(){
		if (is_login_chk)
		{			
			var el = $('#' + this.href.split('#')[1]);
			var targetEl = el;
			var anotherEl = $('.page_conEl');
			anotherEl.addClass('hide');

			if(targetEl.hasClass('hide')){
				anotherEl.addClass('hide').removeClass('show'); 
				anotherEl.slideUp(1);
				targetEl.removeClass('hide').addClass('show');
				targetEl.slideDown(1);
				$(".page_detail").slideUp(1); //이용후기 안보이게
			} else {
				targetEl.removeClass('show').addClass('hide');
				targetEl.slideUp(1);
			}
		}
	});

	// 마이페이지 > 예약내역 보기
	$(".reserveAskActive").live("click",function(){
		$('#reservInfor').empty();		
		$.ajax(
			{
				type:"post",
				dataType:"html",				
				url: "/mypage/reserve/"+$(this).attr("data-reserve"),
				success: function(data) {	
					$('#reservInfor').empty();
					$('#reservInfor').append(data);						
					return;
				}
			}
		);
	});

	$(".btn_pageClose,.btn_pageClose02").live("click", function(){						
		var el = $('#' + this.href.split('#')[1]);			
		$(el).slideUp(200);
		$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#dBody')) ) }, "slow",setScrollFlagTrue);
		$(".page_detail").slideUp(1); //이용후기 안보이게
		$('.btn_triger').removeClass("active");  return false;					
	});
});

	$(function() {
		$(".btn_triger").live("click", function(){			
			scorllflag = false;
			$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#layerNavi')) ) }, "slow",setScrollFlagTrue);
			$('.btn_triger').removeClass("active");
			$(this).addClass("active");
			return false;
		});	

	});

	var scorllflag = true;
	function getpageConOffsetTop(pageCon) {		
		if($(pageCon).offset() == null) {
			return 0;
		} else {
			return $(pageCon).offset().top;
		}
	}
	
	function setScrollFlagTrue() {
		scorllflag = true;
	}


/* page scroll02 */
 $(document).ready(function() {	 
		/*
		if (!$(".btn_detail").length) {
			return;
		}
		*/
		$(".btn_detail").live("click", function(){									
			var el = $('#' + this.href.split('#')[1]);
			var targetEl = el;
			var anotherEl = $('.page_detail');
			anotherEl.addClass('hide');

			if(targetEl.hasClass('hide')){				
				anotherEl.addClass('hide').removeClass('show'); 
				anotherEl.slideUp(300);
				targetEl.removeClass('hide').addClass('show');
				targetEl.slideDown(200);
			} else {				
				targetEl.removeClass('show').addClass('hide');
				targetEl.slideUp(100);
			}
		});

		$(".btn_detailClose").live("click", function(){			
			var el = $('#' + this.href.split('#')[1]);
			$(el).slideUp(500);
			$('.btn_detail').removeClass("active");  return false;
		});
	});

	$(function() {		
		/*
		$('.btn_detail').live("click", function(){									
			scorllflag = false;
			$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#layerNavi')) ) }, "slow",setScrollFlagTrue);
			$('.btn_detail').removeClass("active");
			$(this).addClass("active");
			return false;
		});	
		*/
	});


/* contents scroll */
 $(document).ready(function() {
		if (!$(".btn_conTriger").length) {
			return;
		}

			var anotherEl = $('.page_navEl');
			anotherEl.addClass('hide');

		$(".btn_conTriger").live("click", function(){			
			var el = $('#' + this.href.split('#')[1]);var el = $('#' + this.href.split('#')[1]);
			var targetEl = el;

			if(targetEl.hasClass('hide')){
				anotherEl.addClass('hide').removeClass('show'); 
				anotherEl.slideUp(10);
				targetEl.removeClass('hide').addClass('show');
				targetEl.slideDown(10);
				$('.btn_conTriger').removeClass("active");
				$(this).addClass("active");

			} else {
				targetEl.removeClass('show').addClass('hide');
				targetEl.slideUp(50);
				$(this).removeClass("active");
			}


		});

		$(".btn_conClose").live("click", function(){			
			var el = $('#' + this.href.split('#')[1]);
			$(el).slideUp(50);
			$('.btn_conTriger').removeClass("active");  return false;
		});
	});

	$(function() {
		$('.btn_conTriger').live("click", function(){			
			scorllflag = false;
			$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#layerDot')) ) }, "slow",setScrollFlagTrue);
			return false;
		});	

	});
	


/* footer scroll */
 $(document).ready(function() {
		if (!$(".btn_footTriger").length) {
			return;
		}

			var anotherEl = $('.page_footEl');
			anotherEl.addClass('hide');

		$(".btn_footTriger").click(function(){
			var el = $('#' + this.href.split('#')[1]);
			var targetEl = el;

			if(targetEl.hasClass('hide')){
				anotherEl.addClass('hide').removeClass('show'); 
				anotherEl.slideUp(10);
				targetEl.removeClass('hide').addClass('show');
				targetEl.slideDown(10);
				$('.btn_footTriger').removeClass("active");
				$(this).addClass("active");

			} else {
				targetEl.removeClass('show').addClass('hide');
				targetEl.slideUp(50);
				$(this).removeClass("active");
			}			
			if (this.href.split('#')[1] == "footM02")
			{				
				if ( !$(this).hasClass("viewOn") )
				{				
					$(this).addClass("viewOn");
					$.ajax(
						{
							type:"post",
							dataType:"html",
							url: "/company",						
							success: function(data) {
								$('#footM02').append(data);	
								return;
							}
						}
					);
				}
			}

		});

		$(".btn_footClose").click(function(){
			var el = $('#' + this.href.split('#')[1]);
			var targetEl = el;
			targetEl.removeClass('show').addClass('hide');			
			targetEl.slideUp(50);
			$('.btn_footTriger').removeClass("active");  return false;
		});
	});

	
	$(function() {
		$('.btn_footTriger').click(function() {
			scorllflag = false;
			$('body, html').animate({ scrollTop: (getpageConOffsetTop($('#footMenu')) ) }, "slow",setScrollFlagTrue);
			return false;
		});	

	});

	

/* table layer */
function show(tableEl01, tableEl02) {
	var tableEl01 = document.getElementById(tableEl01);
	var tableEl02 = document.getElementById(tableEl02);
	tableEl01.style.display='none';
	tableEl02.style.display='block';
	}

// Tab Content
function initTabMenu(tabContainerID) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;

	for(i=0; i<tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tabclick")
			thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		thismenu.onclick = function tabMenuClick() {
			currentmenu = this.container.current;
			if (currentmenu == this)
				return false;

			if (currentmenu) {
				currentmenu.targetEl.style.display = "none";
				if (currentmenu.imgEl) {
					currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.png", ".png");
				} else {
					currentmenu.className = currentmenu.className.replace(" on", "");
				}
			}
			this.targetEl.style.display = "";
			if (this.imgEl) {
				this.imgEl.src = this.imgEl.src.replace(".png", "_on.png");
			} else {
				this.className += " on";
			}
			this.container.current = this;

			return false;
		};
		
		if (!thismenu.container.first)
			thismenu.container.first = thismenu;
	}
	if (tabContainerID == 'footM02')
	{
		if (tabContainer.first)
			tabContainer.first.onclick();
	}
	
}

function showLoading() {
	var screenWidth=$(window).width();
	var loaderPadding = 0;

	if (screenWidth > 720) {
		loaderPadding = (($('#contents').innerHeight() - 56) / 2) - 56;
	} else {
		loaderPadding = 150;
	}
	
	var loadingImg = $("<img/>").attr('src', '/images/egovframework/example/common/loading.gif');
	var tmp = $("<div style='width:100%; height:; text-align:center; padding:" + loaderPadding + "px 0;'/>").attr("id", "temp").html(loadingImg);

	$('#contents').css('background', 'none');
	$('#contents').html(tmp);	
}

function showLoading2(id) {
	var screenWidth=$(window).width();
	var loaderPadding = 0;

	loaderPadding = 150;
		
	var loadingImg = $("<img/>").attr('src', '/images/egovframework/example/common/loading.gif');
	var tmp = $("<div style='width:100%; height:; text-align:center; padding:" + loaderPadding + "px 0;'/>").attr("id", "temp").html(loadingImg);

	$('#'+id).css('background', 'none');
	$('#'+id).html(tmp);	
}

function isLogin(){
	if (!is_login) {
		if(confirm("로그인 후 예약이 가능합니다.\n로그인 페이지로 이동하시겠습니까?")) 
			location.href='/login/url=/rental';
		else {
			is_login_chk = false;
			return false;
		}
	}
	else
		return true;
}
// 자동으로 row 정렬
function tableRowSpanning(Table, spanning_row_index)
 {
 var RowspanTd = false;
 var RowspanText = false;
 var RowspanCount = 0;
 var Rows = $('tbody tr', Table);
 
$.each(Rows, function() {
 var This = $('td', this)[spanning_row_index];
 var text = $(This).text();
 
if(RowspanTd == false)
 {
 RowspanTd = This;
 RowspanText = text;
 RowspanCount = 1;
 }
 else if(RowspanText != text)
 {
 $(RowspanTd)
 .attr('rowSpan', RowspanCount);
 
RowspanTd = This;
 RowspanText = text;
 RowspanCount = 1;
 }
 else
 {
 $(This)
 .remove();
 RowspanCount++;
 }
 });
 
// 반복 종료 후 마지막 rowspan 적용
$(RowspanTd)
 .attr('rowSpan', RowspanCount);
 }
 
// 예약(상담) > 프리미엄 장비 선택시
function premiumActive(){
	var add_html='';
	var add_uno='';
	var total=Number('');
	var ar_total='';
	var isFirst=true;
	for(var i=0; i<$(":checkbox[name='u_title']:checked").length; i++){
		var el = $(":checkbox[name='u_title']:checked:eq("+i+")");
		var price = el.attr('data-price')*el.parents('tr').find('.selectActive').val();
		add_html +='<li>'+el.attr('data-name')+' '+el.parents('tr').find('.selectActive').val()+'개 <span>'+number_format(price)+'원</span></li>';				
		total+= price;
		if (isFirst)
		{
			add_uno+=el.val()+'*'+el.parents('tr').find('.selectActive').val()+'*'+el.attr('data-cprice');
			ar_total+=price;
			isFirst=false;
		}
		else
		{
			add_uno+='|'+el.val()+'*'+el.parents('tr').find('.selectActive').val()+'*'+el.attr('data-cprice');
			ar_total+='|'+price;
		}
	}
	$("#us_pay").val(total);	
	$('#p_price ul').empty().html(add_html);
	$("#UNO").empty().val(add_uno);
	$("#u_pay").empty().val(ar_total);
	reserveTotalPrice();
}

// 예약(상담) > 전체 가격 계산
function reserveTotalPrice(){
	var total = Number($("#cp_pay").val())+Number($("#hd_pay").val())+Number($("#sc_pay").val())+Number($("#us_pay").val());
	$("#reserve_total").html(number_format(total)+'원');	
}

// 실시간 예약 단계 체크
function reserv_depth_check(depth,popEl,popEl02){
	if (depth==3)	{
		if ( $(":radio[name='agree01']:checked").length == 0 || $(":radio[name='agree01']:checked").val() != 1) {
		alert('계약조건 및 특약사항에 동의하셔야 합니다.'); return false;
		}	
		if ( $(":radio[name='agree02']:checked").length == 0 || $(":radio[name='agree02']:checked").val() != 1) {
		alert('차량손해면책제도 안내를 확인하셔야 합니다.'); return false;
		}	
		if ( $(":radio[name='agree03']:checked").length == 0 || $(":radio[name='agree03']:checked").val() != 1) {
		alert('자동차 대여 약관에 동의하셔야 합니다.'); return false;
		}	
		if ( $(":radio[name='agree04']:checked").length == 0 || $(":radio[name='agree04']:checked").val() != 1) {
			alert('개인정보 수집에 동의하셔야 합니다.'); return false;
		}	
		if ( !confirm("등록하신 내용으로 예약하시겠습니까?") )
			return false;
	}
	//실시간 차량 체크
	var stringData = $("#carForm").serialize()+'&MNO='+$("#MNO").val();		
	$.ajax(
		{
			type:"post",
			dataType:"html",
			url: "/rental_realtime",
			data: stringData,
			success: function(data) {
				if ( data == "login" ) {
					alert("로그인이 해제되었습니다. 다시 로그인후 예약하시기 바랍니다.");
					location.href='/login/url=/rental';
				} else if ( data > 0 ) {
					showDepth(popEl, popEl02);
					if (depth == 1)	{
						$("#depth02_price").html($("#depth01_price").html());
					} else if (depth==3) {
						reserveConfirm();
					}
				} else {
					alert("대여하실 차량이 다른 고객에 의해 먼저 예약이 되었습니다.\n다른 차량으로 예약 해주시기 바랍니다.");
					return false;
				}
			}
		}
	);	
}
// 예약 단계 show/block
function showDepth(popEl, popEl02) {
	var popEl = document.getElementById(popEl);
	var popEl02 = document.getElementById(popEl02);
	popEl.style.display='block';
	popEl02.style.display='none';
}
// 예약 상담 단계 체크
function advice_depth_check(depth,popEl,popEl02){
	if (depth==3)	{
		if ( $(":radio[name='agree01']:checked").length == 0 || $(":radio[name='agree01']:checked").val() != 1) {
		alert('계약조건 및 특약사항에 동의하셔야 합니다.'); return false;
		}	
		if ( $(":radio[name='agree02']:checked").length == 0 || $(":radio[name='agree02']:checked").val() != 1) {
		alert('차량손해면책제도 안내를 확인하셔야 합니다.'); return false;
		}	
		if ( $(":radio[name='agree03']:checked").length == 0 || $(":radio[name='agree03']:checked").val() != 1) {
		alert('자동차 대여 약관에 동의하셔야 합니다.'); return false;
		}	
		if ( $(":radio[name='agree04']:checked").length == 0 || $(":radio[name='agree04']:checked").val() != 1) {
			alert('개인정보 수집에 동의하셔야 합니다.'); return false;
		}	
		if ( !confirm("등록하신 내용으로 예약상담하시겠습니까?") )
			return false;
	}
	
	$.ajax(
		{
			type:"post",
			dataType:"html",
			url: "/rental_realtime",
			data: '&type=advice',
			success: function(data) {
				if ( data == "login" ) {
					alert("로그인이 해제되었습니다. 다시 로그인후 예약하시기 바랍니다.");
					location.href='/login/url=/rental';
				} 
				showDepth(popEl, popEl02);
				if (depth == 1)	{
					$("#depth02_price").html($("#depth01_price").html());
				} else if (depth==3) {
					reserveConfirm();
				}
			}
		}
	);	
}

// 예약(상담) > 완료
function reserveConfirm(){
	var stringData = $("#reserveForm").serialize();		
	$.ajax(
		{
			type:"post",
			dataType:"html",
			url: "/rental_proc",
			data: stringData,
			success: function(data) {
				//alert(data);
			}
		}
	);
}
// 숫자 콤마
function number_format(num){
	var num_str = num.toString();
    var result = "";

	for(var i=0; i<num_str.length; i++){
		var tmp = num_str.length - (i+1);
		if(((i%3)==0) && (i!=0))    result = ',' + result;
		result = num_str.charAt(tmp) + result;
	}
	return result;
}

// SNS 연동
function send_sns(dest, url, text)
{
	//var text = encodeURIComponent($(".page_title").text());
	var summary = encodeURIComponent($(".page_summary").text());	
	var imgurl = "/images/egovframework/example/common/logo.png";
	switch(dest)
	{
		case 1: // twitter
			href = "http://twitter.com/home?status=" + encodeURI(text) + " " + encodeURI(url);
			break;
		case 2: // facebook
			href = "http://www.facebook.com/sharer.php?s=100&p[title]="+encodeURI(text)+"&p[url]="+encodeURI(url)+"&p[summary]="+summary+"&p[images][0]="+imgurl;
			break;
		case 3: // me2day
			href = "http://me2day.net/posts/new?new_post[body]=\"" + encodeURI(text) + "\":" + url;
			break;
	}

	window.open(href, 'sns', '');
	return false;
}

function clipboard(text)
{
	var IE=(document.all)?true:false;
	if (IE)
	{
		window.clipboardData.setData('Text',text);
		alert("클립보드에 복사되었습니다.");
	}	
	else
	{
		temp = prompt("Ctrl+C를 눌러 복사하세요", text);
	}
}

function printAction() {
 window.open("/print_hidden.php", "hiddenFrame");
 window.frames['hiddenFrame'].focus();
}

var is_mask_run =false; 

//$(window).resize(function() {if(is_mask_run){modal_window();}}); 
//$(window).scroll(function() {if(is_mask_run){modal_window();}}); 

function modal_window() {
	// 활성화    
	is_mask_run = true;         
	
	// 마스크 사이즈    
	var maskHeight = $(document).height();    
	var maskWidth = $(window).width();    
	$('#mask').css({'width':maskWidth,'height':maskHeight});     
	
	// 마스크 effect      
	$('#mask').fadeTo("slow",0.8);      
	
	// 윈도우 화면 사이즈 구하기    
	var winH = $(window).height();    
	var winW = $(window).width();     
	
	// 스크롤 높이 구하기    
	var _y =(window.pageYOffset) ? window.pageYOffset   
	: (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop   
	: (document.body) ? document.body.scrollTop : 0;     
	
	if(_y<1) var h = winH/2;   
	else var h = winH/2+_y;   
	
	// dialog창 리사이즈    
	var dial_width =$('#popContainer').width();    
	var dial_height = $('#popContainer').height();    
	
	$('#popContainer').css({'width':dial_width,'height':dial_height});    
	$('#popContainer').css('top', h-dial_height/1.2);   
	$('#popContainer').css('left', winW/2-dial_width/2);      
	
	// dialog창  effect    
	$('#dialog').fadeIn(2000);
}

function Pclose()
{
	$('#mask').hide();
	$('#popContainer').hide();
	is_mask_run= false;
}