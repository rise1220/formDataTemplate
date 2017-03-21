<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>happyrentList</title>
<meta name="viewport"
	content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/css/egovframework/layout.css'/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/css/egovframework/mStyle.css'/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/css/egovframework/rent.css'/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/css/egovframework/jquery.tools.dateinput.css'/>" />
<link rel="stylesheet" type="text/css"
	href="<c:url value='/css/egovframework/jquery-ui-1.7.2.custom.css'/>" />
<script type="text/javascript"
	src="<c:url value='/js/jquery.min.1.7.2.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/mobile_js.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/js/jquery.easing.1.3.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/js/jquery.tools.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/lib.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/borwerDpi.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/front_js.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/js/jquery.eleformat.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/js/ui.datepicker.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/functions.js'/>"></script>
</head>

<body style="opacity:0;">
	<div id="body">
	<form name="newCarForm" action="rentalsearch.do" id="newCarForm"
		method="GET">
		<!-- <input type="hidden" name="typeCode" id="car_type" value="" /> <input
			type="hidden" name="mileageCode" id="car_mileage" value="" /> <input
			type="hidden" name="fuelCode" id="car_fuel" value="" />  -->
			<input type="hidden" name="pageIndex" id="pageIndex" value="1" />
			<%-- <input type="hidden" id="modelAttr" name="modelAttr" value="${paginationInfo}"/> --%>
	</form>

	<!-- contents S -->
	<div id="contentsWrap">

		<!-- dBody S -->
		<div id="" class="smartS_none ">
			<div id="contents">
				<h2>
					<img
						src="<c:url value='/images/egovframework/example/title/titH2_rent.png'/>"
						alt="차량대여">
				</h2>
				<p class="rent_titComent">
					고객님께서 선택하신 기간은 <strong>실시간예약</strong>이 가능한 구간 입니다. <br>실시간 예약을
					원하지 않으시거나 예약 가능한 차량이 없을 경우 <strong>예약상담</strong>으로 접수 하시기 바랍니다.
				</p>

				<ul class="rent_listShort">
					<li><span>보기방식</span> <a href="#" class="btn_short "
						data-type="view_type" data-val="1"><span>이미지</span></a> <a
						href="#" class="btn_short on" data-type="view_type" data-val="2"><span>텍스트</span></a>
					</li>
					<li><span>실시간예약</span> <a href="#" class="btn_short on"
						data-type="canUse" data-val="0"><span>전체차량</span></a> <a href="#"
						class="btn_short " data-type="canUse" data-val="1"><span>가능차량</span></a>
					</li>
					<li id="view_type_charge" style="display: none;"><span>요금제</span>
						<a href="#" class="btn_short " data-type="car_charge" data-val="1"><span>전체요금</span></a>
						<a href="#" class="btn_short on" data-type="car_charge"
						data-val="2"><span>현재요금</span></a></li>
				</ul>

				<!-- List -->
				<form:form commandName="searchVO" id="listForm">
					<table class="data_tableW" id="view_type_text" cellpadding="0"
						cellspacing="0" style="display:;">
						<caption>차량 서치 결과표</caption>
						<colgroup>
							<col width="" />
							<col width="" />
							<col width="" />
							<col width="" />
							<col width="" />
						</colgroup>
						<tr>
							<th scope="col">NO.</th>
							<th scope="col">차종</th>
							<th scope="col">차량명</th>
							<th scope="col">연료</th>
							<th scope="col">연비</th>
						</tr>
						<c:forEach var="result" items="${rentList}" varStatus="status">
							<tr>
								<td align="center" class="listtd"><c:out
										value="${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageSize + status.count)}" /></td>
								<td align="center" class="listtd"><c:out
										value="${result.type}" /></a></td>
								<td align="left" class="listtd"><c:out
										value="${result.name}" />&nbsp;</td>
								<td align="center" class="listtd"><c:out
										value="${result.fuel}" />&nbsp;</td>
								<td align="center" class="listtd"><c:out
										value="${result.mileage}" />&nbsp;</td>
							</tr>
						</c:forEach>
					</table>
					<!-- /List -->
					<div id="">
						<ul id="pagination">
						</ul>
					</div>
				</form:form>
			</div>
		</div>
	</div>
	
	<script>
		$(function() {
			
			//paging($("#pageIndex").val(1));
			
			 var obj = $("#modelAttr").val();
				
			console.log("obj: ", typeof obj);
			console.log("obj: ", obj);
				paging(obj); 
			
		})
		
		function paging(data) {
			var paginationInfo = {};
			paginationInfo = data;
			console.log("typeof data: ", typeof data);
			console.log("typeof data: ", data);
			paginationInfo.prevNext = prevNext(paginationInfo);
			pagination(paginationInfo);
		}
		
	</script>
	</div>
</body>
</html>