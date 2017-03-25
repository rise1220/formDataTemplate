<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<title>HappyRent</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/layout.css'/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/mStyle.css'/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/rent.css'/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/jquery.tools.dateinput.css'/>" />
	<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/jquery-ui-1.7.2.custom.css'/>" />
	
</head>


<body style="opacity:0;">

	
	<div id="docContainer">	
	
		<!-- BODY -->
		
		<div class="smart_search" id="smartSlip">
			<p class="btn_smartOpen"><a href="#열기" onclick="javascript: SmartView();">검색 열기</a></p>
			<h2><img src="<c:url value='/images/egovframework/example/contents/txt_smart.png'/>" alt="스마트 서치" /></h2>
			<p class="smart_coment">원하시는 차량을 조건으로 찾아보세요!</p>
			
			<form name="newCarForm" id="newCarForm" method="post" >
				<input type="hidden" name="typeCode" id="car_type" value = "" />
				<input type="hidden" name="mileageCode" id="car_mileage" value = "" />
				<input type="hidden" name="fuelCode" id="car_fuel" value = "" />
			</form>
			
			<form name="carForm" id="carForm" method="post">
				<input type="hidden" name="view_type" id="view_type" value="1" />
				<input type="hidden" name="canUse" id="canUse" value="0" />
				<input type="hidden" name="car_charge" id="car_charge" value="2" />
				<ul class="smart_list">
					<li><span>대여장소</span> 
						<span class="white">제주공항</span>
					</li>
					<li class="mDpi_el"><span>차종</span> 
						<select class="input_size02" onchange="mTypeChg(this.value);">
							<option value="">전체</option><option value="2" >경차</option><option value="4" >소형</option><option value="3" >중형</option><option value="5" >쿠페</option><option value="6" >고급</option><option value="7" >SUV</option><option value="8" >승합</option><option value="9" >수입</option>			</select>
					</li>
					<li><span>대여일</span> 
						<span>
							<input type="text" title="" name="sdate" class="input_text input_size02" id="datepicker_reserv1" readonly="readonly" value="2016-03-18" onchange="reserv_check();" size="16" />
							<a href="#date" class="reserv1_img"><img src="<c:url value='/images/egovframework/example/btn/btn_cha.png'/>" alt="달력보기" /></a><br />
							<select class="sel_size01" name="stime" id="stime" onchange="ChangDateA('hour');">
								<option value="8">08시</option>
								<option value="9">09시</option>
								<option value="10">10시</option>
								<option value="11">11시</option>
								<option value="12">12시</option>
								<option value="13">13시</option>
								<option value="14">14시</option>
								<option value="15">15시</option>
								<option value="16">16시</option>
								<option value="17">17시</option>
								<option value="18">18시</option>
								<option value="19">19시</option>
								<option value="20">20시</option>
								<option value="21">21시</option>
			                    <option value="22">22시</option>
							</select>
							<select class="sel_size01" name="sminute" id="sminute" onchange="ChangDateA('minute');">
								<option value="00">00분</option>
								<option value="30" selected="selected">30분</option>
							</select>
						</span>
					</li>
					<li><span>반납일</span> 
						<span>
							<input type="text" title="" name="edate" class="input_text input_size02" id="datepicker_reserv2" readonly="readonly" value="2016-03-19" size="16" />
							<a href="#date" class="reserv2_img"><img src="<c:url value='/images/egovframework/example/btn/btn_cha.png'/>" alt="달력보기" /></a><br />
							<select class="sel_size01" name="etime" id="etime" onchange="ChangDateA();">
								<option value="7" selected>07시</option>
								<option value="8">08시</option>
								<option value="9">09시</option>
								<option value="10">10시</option>
								<option value="11">11시</option>
								<option value="12">12시</option>
								<option value="13">13시</option>
								<option value="14">14시</option>
								<option value="15">15시</option>
								<option value="16">16시</option>
								<option value="17">17시</option>
								<option value="18">18시</option>
								<option value="19">19시</option>
							</select>
							<select class="sel_size01" name="eminute" id="eminute" onchange="ChangDateA();">
								<option value="00" selected="selected">00분</option>
								<option value="30">30분</option>
							</select>
						</span>
					</li>
					<li><span>대여시간</span> 
						<span class="rental_time"><strong>24</strong>시간</span>
					</li>
				</ul>
			</form>
			
			
			<p class="btn_smart"><a href="#">검색하기</a></p>
			
			<h3>차종선택</h3>
			<div class="smart_list02 car_type">
				<span class="bin01"><img src="<c:url value='/images/egovframework/example/contents/bg_roundLt.png'/>" alt="" /></span>
				<span class="bin02"><img src="<c:url value='/images/egovframework/example/contents/bg_roundLr.png'/>" alt="" /></span>
				<ul>
					<li class="item01"><a href="#" class="on" data-car="">전체</a></li>
					<li><a href='#' data-car='2'>경차</a></li><li><a href='#' data-car='4'>소형</a></li><li class='item01'><a href='#' data-car='3'>중형</a></li><li><a href='#' data-car='5'>쿠페</a></li><li><a href='#' data-car='6'>고급</a></li><li class='item01'><a href='#' data-car='7'>SUV</a></li><li><a href='#' data-car='8'>승합</a></li><li><a href='#' data-car='9'>수입</a></li>			
				</ul>
			</div>
			<h3>연비</h3>
			<div class="smart_list02 car_mileage">
				<span class="bin01"><img src="<c:url value='/images/egovframework/example/contents/bg_roundLt.png'/>" alt="" /></span>
				<span class="bin02"><img src="<c:url value='/images/egovframework/example/contents/bg_roundLr.png'/>" alt="" /></span>
				<ul class="type01">
					<li class="item01"><a href="#" class="on" data-car="">전체</a></li>
					<li><a href="#" data-car="A">A</a></li>
					<li><a href="#" data-car="B">B</a></li>
					<li><a href="#" data-car="C">C</a></li>
					<li><a href="#" data-car="D">D</a></li>
					<li><a href="#" data-car="E">E</a></li>
				</ul>
			</div>
			<h3>연료</h3>
			<div class="smart_list02 car_fuel">
				<span class="bin01"><img src="<c:url value='/images/egovframework/example/contents/bg_roundLt.png'/>" alt="" /></span>
				<span class="bin02"><img src="<c:url value='/images/egovframework/example/contents/bg_roundLr.png'/>" alt="" /></span>
				<ul>
					<li class="item01"><a href="#" class="on" data-car=''>전체</a></li>
					<li><a href='#' data-car='10'>휘발유</a></li><li><a href='#' data-car='11'>경유</a></li><li class='item01'><a href='#' data-car='12'>LPG</a></li><li><a href='#' data-car='70'>경유/LPG</a></li><li><a href='#' data-car='71'>휘발유/LPG</a></li>		
				</ul>
			</div>	
			<div class="smart_mbTxt">
				<p>제주에서의 행복한 여행과 추억! <br />쉽고 빠른 온라인예약으로 즐겁고 편안한 여행 되세요!</p>
				<ul>
					<li>01 차량대여 조건 : 운전경력 만 1년 이상 운전자만 가능</li>
					<li>02 차량 인수 및 반납 장소 : 제주공항 렌터카 하우스</li>
					<!--<li>03 실시간 예약은 현재일 기준 30일 이후 출발건만 예약이 가능합니다.</li>-->
				</ul>
			</div>
		</div>
		<!--  //smart search e -->
		
		
		
		<!-- contents S -->
		<div id="contentsWrap">
		
			<!-- dBody S -->
			<div id="dBody" class="smartS_none ">
				<div id="contents">
				
				</div>
				
			</div>
			<!-- dBody E -->
		
		</div>
		<!-- contents E -->
	</div>
	
	
	
	<script type="text/javascript" src="<c:url value='/js/jquery.min.1.7.2.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/mobile_js.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery.easing.1.3.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery.tools.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/borwerDpi.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/front_js.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery.eleformat.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/ui.datepicker.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/functions.js'/>"></script>
	
	<script type="text/javascript">
	
	$(function() {	
		
		//$('#contents').load('test.jsp body');
		
		carSearch();
		
		console.log($(document).contens().find("#pageIndex").val());
		$(window).on("load", "#pageIndex", function() {
			console.log("#pageIndex", $(this).val());
		})
		
		console.log("$(window).scrollTop(): ", $(window).scrollTop());
		console.log("$(document).height(): ", $(document).height());
		console.log("$(window).height()", $(window).height());
		
		$(".car_type a").click(function(e){
			e.preventDefault();
			$("#car_type").val($(this).attr("data-car"));
			$(this).parent().parent().find("a").removeClass("on");
			$(this).addClass("on");
			carSearch();
		});
		$(".car_mileage a").click(function(e){
			e.preventDefault();
			$("#car_mileage").val($(this).attr("data-car"));
			$(this).parent().parent().find("a").removeClass("on");
			$(this).addClass("on");
			carSearch();
		});
		$(".car_fuel a").click(function(e){
			e.preventDefault();
			$("#car_fuel").val($(this).attr("data-car"));
			$(this).parent().parent().find("a").removeClass("on");
			$(this).addClass("on");
			carSearch();
		});
		$("#pagination").on("click","li a",function(e){
			e.preventDefault();
			$("#pageIndex").val($(this).attr("data-pageIndex"));
			carSearch();
		});
		
		
		$(document).on("click","tbody td", function() {
			console.log($(this).text());
		})
		
		
	});
	
	</script>
    
    
</body>    
    
</html>
