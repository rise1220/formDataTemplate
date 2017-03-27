 
        
        function reserv_check(){
        	var flag_date = $('#datepicker_reserv1').val();	

        	var flag_time = new Date(flag_date.substr(0,4), flag_date.substr(5,2)-1, flag_date.substr(8,2),0,0,0,0); 
        	var mktime = flag_time.getTime() + (24 * 60 * 60 * 1000 * 1); 
        	var str_date= new Date(); 
        	str_date.setTime(mktime); 

        	var year  = str_date.getFullYear(); 
        	var month = str_date.getMonth()+1; 
        	var day  = str_date.getDate(); 

        	if(month < 10) month = "0" + month; 
        	if(day < 10) day = "0" + day; 

        	var result_date = year.toString() + '-' + month.toString() + '-' + day.toString(); 
        	$("#datepicker_reserv2").val(result_date);
        	totalRentalTime();
        }

        function reserv_hour_check(){
        	if ( $("#stime").val()+$("#sminute").val() == '800' ) {
        		alert('대여시간은 08:30부터 가능합니다.');
        		$("#sminute").val("30");
        		$("#eminute").val("30");
        	}
        	if ( $("#stime").val()+$("#sminute").val() == '2230' ) {
        		alert('대여시간은 22:00까지 가능합니다.');
        		$("#sminute").val("00");
        	}
        	var flag_date = $('#datepicker_reserv1').val();	
        	var flag_hour = $('#stime').val();		
        	if ( flag_hour > 21 || $("#stime").val()+$("#sminute").val() == '2100' ) {
        		var flag_time = new Date(flag_date.substr(0,4), flag_date.substr(5,2)-1, flag_date.substr(8,2),0,0,0,0); 
        		var mktime = flag_time.getTime() + (47 * 60 * 60 * 1000 * 1); 
        		var str_date= new Date(); 
        		str_date.setTime(mktime); 

        		var year  = str_date.getFullYear(); 
        		var month = str_date.getMonth()+1; 
        		var day  = str_date.getDate(); 

        		if(month < 10) month = "0" + month; 
        		if(day < 10) day = "0" + day; 

        		var result_date = year.toString() + '-' + month.toString() + '-' + day.toString(); 		
        		$("#datepicker_reserv2").val(result_date);
        		$("#etime").val(9);
        	} else {
        		$("#etime").val(flag_hour);
        	}
        	totalRentalTime();
        }
        function reserv_minute_check(){	
        	if ( $("#stime").val()+$("#sminute").val() == '800' ) {
        		alert('대여시간은 08:30부터 가능합니다.');
        		$("#sminute").val("30");
        	}
        	if ($("#stime").val() + $("#sminute").val() == '2230') {
        	    alert('대여시간은 22:00까지 가능합니다.');
        	    $("#sminute").val("00");
        	}

        	var flag_minute = $('#sminute').val();		
        	$("#eminute").val(flag_minute);	
        	totalRentalTime();
        }
        function totalRentalTime(){
        	var frm=document.carForm;
        	var Stime = new Date(frm.sdate.value.substr(0,4), String(Number(frm.sdate.value.substr(5, 2)) -1 ), frm.sdate.value.substr(8,2),frm.stime.value,frm.sminute.value);	
        	var Etime = new Date(frm.edate.value.substr(0, 4), String(Number(frm.edate.value.substr(5, 2)) -1 ), frm.edate.value.substr(8, 2), frm.etime.value,frm.eminute.value );
        	var Tmin=(Etime-Stime)/60000;	
        	$('.rental_time strong').text(Math.ceil(Tmin/60));
        }
        function ChangDateA(type)
        {	
        	if ( !searchFlag ) {
        		if ( type == 'hour' ) {
        			reserv_hour_check();
        			return;
        		} else if ( type == 'minute' ) {
        			reserv_minute_check();		
        			return;
        		}
        	}
        	
        	if ( $("#stime").val()+$("#sminute").val() == '800' ) {
        		alert('대여시간은 08:30부터 가능합니다.');
        		$("#sminute").val("30");
        	}
        	if ($("#stime").val() + $("#sminute").val() == '2230') {
        	    alert('대여시간은 22:00까지 가능합니다.');
        	    $("#sminute").val("00");
        	}

        	totalRentalTime();	

        	if ( searchFlag )
        		carSearch();
        }
        function techbug(){	
            if (IsMobile()) {
                $("#smartSlip").height(30);
            }
        }
        function SmartView(){

                if ($("#smartSlip").height() == 480) {
                    $("#smartSlip").height(30);
                }
                else {
                    $("#smartSlip").height(480);
                }
        }
        function IsMobile() {
            var isMobile = {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            }
            if (isMobile.any()) {
                return true;
            }
            else {
                return false;
            }
        }
        
        
        //Start carSearch()
        function carSearch() {	
        	console.log("carSearch start............... ");
        	var stringData = $("#newCarForm").serialize();
        	var stringData = decodeURIComponent((stringData + '').replace(/\+/g, '%20'));   

        	//ajaxData(stringData);
        	console.log("stringData: ", stringData);
        	
        	$("#contents").load("rentalsearch.do #body",stringData);
        }//End carSearch()
        
        
        function ajaxData(data){
        	//Start Ajax
        	$.ajax({
        			type:	"GET",
        			url:	"rentalsearch.do",
        			data:	data,
        			dataType:	'html',
        			success: function(result, jqXHR) {
        				
        				//console.log(result);
        				var htmlResult = $(result).find("#body").text();
        				//var htmlResult = jQuery.parseHTML(result).find("body").text();
        				
        				console.log(htmlResult);
    					console.log(typeof htmlResult);
        				$("#contents").html(htmlResult);
        				
        			},
        			error: function(xhr, status, error){
        				/*alert("rentalsearch.do error status:", xhr.status);*/
        			}

        		});//End Ajax
        	
        }
        
        //이전, 다음 페이지 생성
        function prevNext(paginationInfo){
        	
        	var lastPageNoOnPageList = paginationInfo.firstPageNoOnPageList + paginationInfo.pageSize - 1;
        	var obj = {};
        	
			if (lastPageNoOnPageList > paginationInfo.totalPageCount) {
				lastPageNoOnPageList = paginationInfo.totalPageCount;
				obj.next=false;
			}else{
				obj.next=true;
			}
			
			if(paginationInfo.firstPageNoOnPageList !== 1){
				obj.prev=true;
			}else{
				obj.prev=false;
			}
			
			return obj;
        }
        
        //페이징 함수
        function pagination(paginationInfo){
        	console.log("paginationInfo: ", paginationInfo);
        	
        	var str = "";
        	var $pageAppend = $('#pagination');
        	
        	//console.log("in pagination paginationInfo: ", paginationInfo);
        	
        	
        	$pageAppend.empty();
        	
        	if(paginationInfo.prevNext.prev){
        		var prev = "\
	    			<li class=\"pageList\"><a href=\"#\" data-pageIndex=\""+	Number(paginationInfo.firstPageNoOnPageList - 1)	+"\">[prev]</a></li>";
        		$pageAppend.append(prev);
        		//console.log("true start.............");
        	}
        	
        	var firstPageNo = paginationInfo.firstPageNoOnPageList;
        	var pageLoop = Number(paginationInfo.lastPageNoOnPageList - firstPageNo	+	1);
        	
        	for(var i=0; i<pageLoop;i++){
        		str+="\
        			<li class=\"pageList\"><a href=\"#\" data-pageIndex=\""+	firstPageNo	+"\">["+	firstPageNo	+"]</a></li>";
        		firstPageNo++;
        	}
        	
        		$pageAppend.append(str);
        	
        	if(paginationInfo.prevNext.next){
        		var next = "\
	    			<li class=\"pageList\"><a href=\"#\" data-pageIndex=\""+	Number(paginationInfo.lastPageNoOnPageList + 1)	+"\">[next]</a></li>";
        		$pageAppend.append(next);
        	}
        	
        	$(".pageList")	.css("display", "inline")
        					.css("font","bold 12px Dotum")
        					.css("padding","0 10px !important");
        	
        	
        	/*console.log("prev data-pageIndex: ", paginationInfo.firstPageNoOnPageList - 1);
        	console.log("next data-pageIndex: ", paginationInfo.lastPageNoOnPageList + 1);
        	console.log("pageLoop", pageLoop);
        	console.log("str: ", str);*/
        }
        
        
        
        
        
        function mTypeChg(v){
        	$("#car_type").val(v);
        }

        function DateChange1() {
            var date1 = new Date();
            var date2 = new Date(2015, 10, 01);
            var interval = date2 - date1;
            var day = 1000 * 60 * 60 * 24;
            var mi = (parseInt(interval / day));
            if (mi <= 0) {
                //console.log('바꿈');
                $("#stime").append("<option value=\"22\">22시</option>");
            }
            else {
                //console.log('이전');
            }
        }