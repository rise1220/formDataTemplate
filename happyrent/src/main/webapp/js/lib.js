//############### Menu Script Start ####################
function menu(gval) 
{
	var menu = '/index.php?WS=';
	window.location = menu+gval;
}
//############### Menu Script End ####################

//############### Form Script Start ####################
// 자동 포커스
function next_focus(v, len, next){
	var tmp = $('#' +v);

	if (tmp.val().length >= len)
	{
		$('#'  + next ).focus();
		return;
	}
}

 function content_print()
 {
     var initBody = document.body.innerHTML;
     
     //인쇄 할 영역을 body에 담은 후에 인쇄하고
     window.onbeforeprint = function(){
        document.body.innerHTML = document.getElementById("contents").innerHTML;
     };
         
    //인쇄가 끝나면 body의 내용을 원복
    window.onafterprint = function(){
        document.body.innerHTML = initBody;
    };
        
    window.print();     
} 

function content_print2(id)
 {
     var initBody = document.body.innerHTML;
     
     //인쇄 할 영역을 body에 담은 후에 인쇄하고
     window.onbeforeprint = function(){
        document.body.innerHTML = document.getElementById(id).innerHTML;
     };
         
    //인쇄가 끝나면 body의 내용을 원복
    window.onafterprint = function(){
        document.body.innerHTML = initBody;
    };
        
    window.print();     
} 

// 쿠키 입력
function set_cookie(name, value, expirehours, domain) 
{
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*expirehours));
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}
function nowDate()
{
	var time = new Date();
	var Month = time.getMonth();		
	var Day = time.getDate();		
	var Hours = time.getHours();		
	var Minutes = time.getMinutes();		
	if((""+ Month).length==1) Month = "0"+Month;
	if((""+ Day).length==1) Day = "0"+Day;
	if((""+ Hours).length==1) Hours = "0"+Hours;
	if((""+ Minutes).length==1) Minutes = "0"+Minutes;
	var date = time.getYear()+'-'+Month+'-'+Day+' '+Hours+':'+Minutes;
	return date;
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
function Form_chkVal(Fid,msg)
{
	var frm=document.getElementById(Fid);
	if(!frm.value) {alert(msg);frm.focus();return false;}
	else {return true;}
}

function Form_chkVal2(Fid,msg)
{
	var frm=document.getElementById(Fid);
	if(!frm.value) {alert(msg);return false;}
	else {return true;}
}

function Form_chkVal3(Fid,msg)
{
	var frm=document.getElementById(Fid);
	if(!frm.value || frm.value == "&nbsp;" ) {alert(msg);return false;}
	else {return true;}
}

function Form_chkCheckbox(form,name,msg)
{
	var chk;
	var gid;
	
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==name)
		{
			if(!gid) gid=i;
			if(form.elements[i].checked) chk=true;
		}
	}

	if(chk==true)
	{
		return true;
	}
	else
	{
		if(msg) alert(msg);
		form.elements[gid].focus();
		return false;
	}
}

function Form_valCheckbox(form,name)
{
	var val = "";
	var first = true;
	
	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==name)
		{			
			if(form.elements[i].checked) {
				if (first)	 {
					val += form.elements[i].value ;	
					first = false;
				} else {
					val += "," + form.elements[i].value ;	
				}				
			}	
		}
	}	
	return val;
}

function Form_checkAll(form,name)
{
	if(document.getElementById(name).checked==true) var a=false;
	else var a=true;

	for(i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name==name)
		{
			form.elements[i].checked=a;
		}
	}
}

function number_cashing( cost ) {
	if( cost != "undefined" ) {
		if( typeof(cost) != "string" ) cost = cost.toString();
		var roopMod = cost.length % 3;
		var roopCnt = ( cost.length - roopMod ) / 3 ;
		var remainStr = cost.substring( 0 , roopMod );
		var ii = 0;
		
		for( ii = 0 ; ii < roopCnt ; ii++ ) {
			if( !( ii == 0 && roopMod == 0 ) ){
				remainStr += ",";
			}
			if( ii != roopCnt-1 ) {
				remainStr += cost.substring( ( ii * 3 ) + roopMod , ( ii + 1 ) * 3 + roopMod );
			} else {
				remainStr += cost.substring( cost.length-3 , cost.length );
			}
		}

	}
	return remainStr;

}

//영문 숫자만 허용
function Lib_isCode(val) 
{ 
	for(var i=0;i<val.length;i++) 
	{ 
		var chr=val.substr(i,1); 
		if((chr<'0' || chr>'9') && (chr<'a' || chr>'z') && (chr<'A' || chr>'Z') && chr!='-' && chr!='_' && chr!='.') 
		{ 
			return false; 
		} 
	} 
	return true; 
}

function Lib_isKorean(val) 
{ 
	var code=0; 
	for(var i=0;i<val.length;i++) 
	{ 
		var code=val.charCodeAt(i); 
		var chr=val.substr(i,1).toUpperCase(); 
		code=parseInt(code); 
		if((chr<'0' || chr>'9') && (chr<'A' || chr>'Z') && (code>255 || code<0)) 
		{ 
			return false; 
		} 
	} 
	return true; 
}

// URL 정규식
function collectURL(text) {
    var rUrlRegex = /(?:(?:(https?|ftp|telnet):\/\/|[\s\t\r\n\[\]\`\<\>\"\'])((?:[\w$\-_\.+!*\'\(\),]|%[0-9a-f][0-9a-f])*\:(?:[\w$\-_\.+!*\'\(\),;\?&=]|%[0-9a-f][0-9a-f])+\@)?(?:((?:(?:[a-z0-9\-가-힣]+\.)+[a-z0-9\-]{2,})|(?:[\d]{1,3}\.){3}[\d]{1,3})|localhost)(?:\:([0-9]+))?((?:\/(?:[\w$\-_\.+!*\'\(\),;:@&=ㄱ-ㅎㅏ-ㅣ가-힣]|%[0-9a-f][0-9a-f])+)*)(?:\/([^\s\/\?\.:<>|#]*(?:\.[^\s\/\?:<>|#]+)*))?(\/?[\?;](?:[a-z0-9\-]+(?:=[^\s:&<>]*)?\&)*[a-z0-9\-]+(?:=[^\s:&<>]*)?)?(#[\w\-]+)?)/gmi;
    return rUrlRegex.match(text);
}
//############### Form Script End ####################

//############### Window Script Start ####################
function ScrollMenu(layerID){ 
	var bNetscape4plus = (navigator.appName == "Netscape" && navigator.appVersion.substring(0,1) >= "4"); 
	var bExplorer4plus = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.substring(0,1) >= "4"); 
	var menuFrom, menuTo, timerCheck, offset; 
	var iMenu; 
	
	if ( bNetscape4plus ) { 
		iMenu = document.getElementById(layerID); 
	} else if ( bExplorer4plus ) { 
		iMenu = document.getElementById(layerID); 
	} 
	menuFrom = parseInt (iMenu.style.top, 10); 
	menuTo = document.body.scrollTop + 166; 
	timerCheck = 500; 
	
	if ( menuFrom != menuTo ) { 
		offset = Math.ceil( Math.abs( menuTo - menuFrom ) / 10 ); 
		if ( menuTo < menuFrom ) offset = -offset; 
		iMenu.style.top = parseInt (iMenu.style.top, 10) + offset; 
		timerCheck = 10; 
	} 
	setTimeout ("ScrollMenu()", timerCheck); 
} 

// 스크롤 싸이즈 변경 가능 / 화면 중앙에... 
function Lib_newWin(url,name,wid,hei,option) 
{ 
	var x=screen.width/2-wid/2; 
	var y=screen.height/2-hei/2; 
	
	var option_='left='+x+',top='+y+',width='+wid+',height='+hei+',scrollbars=1,resizable=1'; 
	if(option) option_+=','+option; 
	
	newwindow=window.open(url,name,option_); 
	newwindow.focus(); 
} 

// 싸이즈 스크롤 안됨 // 띄워보면 암 
function Lib_newModal(url,name,wid,hei,option) 
{ 
	var x, y; 
	x=(document.layers) ? loc.pageX : event.clientX; 
	y=(document.layers) ? loc.pageY : event.clientY; 
	
	var rand=Math.random()*4; 
	
	option_='dialogLeft='+x+'px;dialogTop='+y+'px;dialogWidth='+wid+'px;dialogHeight='+hei+'px;scrollbars=0;resizable=0;'; 
	if(option) option_+=option; 
	
	window.showModalDialog(url+'?rand='+rand,name,option_); 
}

// Layer 숨김
function LayerClose(id){
	document.getElementById(""+id+"").innerHTML="";
	document.getElementById(""+id+"").style.display="none";
}
//############### Window Script End ####################

//############### jQuery Script Start ####################
function jQ_chkCheckbox(name,msg) {
	var cnt = $("input:checkbox[name='"+name+"']:checked").length;	
	if (cnt < 1)
	{
		if(msg) alert(msg);
		return true;
	}
	else
	{
		return false;
	}	
}

function jQ_checkAll(id,child) {
	if ($("#" + id).is(":checked"))
	{
		$("input[name='"+child+"']").attr("checked" , true);
	}
	else
	{		
		$("input[name='"+child+"']").attr("checked" , false);
	}
}

function jQ_valCheckbox(name)
{
	var val = "";
	var first = true;
	
	for(i=0;i<$("input:checkbox[name='"+name+"']:checked").length;i++)
	{
		if (first)	 {
			val += $("input:checkbox[name='"+name+"']:checked:eq("+i+")").val();	
			first = false;
		} else {
			val += "," + $("input:checkbox[name='"+name+"']:checked:eq("+i+")").val();	
		}						
	}	
	return val;
}

// 이메일 선택 변경
function emailChg(v,id)
{
	if ( v != "" ) {		
		$("#"+id).attr("readonly", true);
	} else {
		$("#"+id).attr("readonly", false);
	}
	$("#"+id).val(v);
}

function jQueryFocus(id)
{
	$("#"+id).focus();
}

// 내 스크랩
function myScrap(id,title,link,code)
{
	if ( !id )
	{
		alert("로그인 후 가능합니다."); return;
	}
	
	if ( !confirm("해당 게시물을 스크랩하시겠습니까?"))
	{
		return;
	}		

	$.ajax({
		type:"post",
		dataType:"html",
		url:"index_ajaxproc.php?WS=00",		
		data:"&scrap=Y&id="+id+"&title="+title+"&link="+encodeURIComponent(link)+"&code="+code,
		success:function(data)
		{		
			if (data == "N")
			{
				alert("이미 스크랩 되었습니다.");
				return;
			}
			if ( confirm("스크랩 되었습니다. 스크랩 페이지로 이동하시겠습니까?"))
			{
				location.href="?WS=91";
			}			
		}
	});
}

// SNS 연동
function send_sns(dest, text, url)
{
	switch(dest)
	{
		case 1: // twitter
			href = "http://twitter.com/home?status=" + encodeURI(text) + " " + encodeURI(url);
			break;
		case 2: // facebook
			href = "http://www.facebook.com/sharer.php?t=" + encodeURI(text) + "&u=" + encodeURI(url);
			break;
	}

	window.open(href, 'sns', '');
	return false;
}

function dateClick(id)
{
	$("#" + id ).click();
}

$(function(){
// 숫자만 입력
	$('.numerical').keypress(function(event){
		if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)) {
		} else {	
			alert('숫자만 입력 가능합니다.');
			$(this).val("");			
			event.preventDefault(); 
		}
	});

	$('.numerical2').keypress(function(event){
		if (event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)) {
		} else if (event.which && (event.which  == 13)) {
			dateGo();
		}else {	
			alert('숫자만 입력 가능합니다.');
			$(this).val("");			
			event.preventDefault(); 
		}
	});
});
//############### jQuery Script End ####################
