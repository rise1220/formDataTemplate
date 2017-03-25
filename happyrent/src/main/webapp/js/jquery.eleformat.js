/*! 
 * jquery.eleformat - v 1.0
 * Copyright (c) 2012 Nettor - http://nettor.com
 * Made by Dawn
 */
jQuery.fn.numbFormat = function() {
  var getData;
  var reg = /(^[+-]?\d+)(\d{3})/;

  return this.each(function(){
    if(jQuery(this).val()) {
		getData=jQuery(this).val().replace(/,/g,'');
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9')&&(getData.length>0))) {
				if(getData.length>1) getData=getData.substr(0,getData.length-1);
				else {jQuery(this).val('');return;}
			}
		}
		while (reg.test(getData)) getData = getData.replace(reg, '$1' + ',' + '$2');
		jQuery(this).val(getData);
	}
  });
};
jQuery.fn.dateFormat = function() {
  var getData;

  return this.each(function(){
    if(jQuery(this).val()) {
		getData=jQuery(this).val().replace(/-/g,'');
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9')&&(getData.length>0))) {
				if(getData.length>1) getData=getData.substr(0,getData.length-1);
				else {jQuery(this).val('');return;}
			}
		}
		if (getData.length>6)
		{
			getData=getData.substr(0,4)+'-'+getData.substr(4,2)+'-'+getData.substr(6,2);
		} else if (getData.length>4&&getData.length<7)
		{
			getData=getData.substr(0,4)+'-'+getData.substr(4,(getData.length-4));
		}
		jQuery(this).val(getData);
	}
  });
};
jQuery.fn.timeFormat = function() {
  var getData;

  return this.each(function(){
    if(jQuery(this).val()) {
		getData=jQuery(this).val().replace(/:/g,'');
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9')&&(getData.length>0))) {
				if(getData.length>1) getData=getData.substr(0,getData.length-1);
				else {jQuery(this).val('');return;}
			}
		}
		if (getData.length>2)
		{
			getData=getData.substr(0,2)+':'+getData.substr(2,(getData.length-2));
		}
		jQuery(this).val(getData);
	}
  });
};
jQuery.fn.mailFormat = function() {
  var getData='';
  var target=0;
  var key;
  var key0;
  var Tstr;
  var eleP=$(this).attr("id");
  var TC_num=['daum.net','gmail.com','hanmail.net','lycos.co.kr','nate.com','naver.com','paran.com'];
  var op_layer='<div id="opl_hp" style="position:absolute;z-index:9999;border:1px solid #aaaaaa;background:#ffffff;"><ul>';
  var i;
  op_layer+='<li style="font-size:11px;font-family:gulim;cursor:pointer;height:16px;background:none;padding:4px 4px 0 3px;vertical-align:middle;">직접입력</li>';
  for(i=0;i<TC_num.length;i++) {
	  op_layer+='<li style="cursor:pointer;height:16px;background:none;padding:4px 4px 0 3px;vertical-align:middle;">'+TC_num[i]+'</li>';
  }
  op_layer+='</ul></div>';

  return this.each(function(){
	getData=jQuery(this).val().replace(/-/g,'');
	
	
	if ($.browser.msie==true) key0 = window.event.keyCode;
	else key=0;

	if ((getData.substr(-1,1)=='@')&&(key0!=13))
	{
		$("#opl_hp").remove();
		$("body").append(op_layer);
		$("#opl_hp").css({left:$(this).offset().left+(getData.length*8), top:$(this).offset().top});
		$("#opl_hp").focus();
		if ($.browser.msie==true) $("#opl_hp ul li:eq(0)").css({background:'#9e9e9e',color:'#ffffff'});
		$("#opl_hp ul li").hover(function(){$(this).css({background:'#9e9e9e',color:'#ffffff'})},function(){$(this).css({background:'none',color:'#656565'});});
		$("#opl_hp").keydown(function(e){
			e.preventDefault();
			key = (e.keyCode ? e.keyCode : e.charCode);
			switch(key){
				case 38:
					target--;
					break;
				case 40:
					target++;
					break;
				case 13:
					if($("#opl_hp ul li:eq("+target+")").text()=='직접입력') {
						$('#'+eleP).focus();
						$("#opl_hp").remove();
						key0=13;
					} else {
						$('#'+eleP).val($('#'+eleP).val()+$("#opl_hp ul li:eq("+target+")").text());
						$("#opl_hp").remove();
						$('#'+eleP).focus();
					}
					break;
			}
			if(target<0) target=0;
			if(target>=TC_num.length) target=TC_num.length;
			for(i=0;i<=TC_num.length;i++) {
				if (i==target) $("#opl_hp ul li:eq("+i+")").css({background:'#9e9e9e',color:'#ffffff'});
				else $("#opl_hp ul li:eq("+i+")").css({background:'none',color:'#656565'});
			}
		});
		$("#opl_hp ul li").bind('click',function(){if($(this).text()=='직접입력') {$("#opl_hp").remove();$('#'+eleP).focus();} else {
			Tstr=$('#'+eleP).val().split('@');
			$('#'+eleP).val(Tstr[0]+'@'+$(this).text());
			$("#opl_hp").remove();
			$('#'+eleP).focus();}});
		return;
	}
  });
};
jQuery.fn.telFormat = function() {
  var getData='';
  var target=0;
  var key;
  var eleP=$(this).attr("id");
  var TC_num=['02','031','032','033','041','042','043','051','052','053','054','055','061','062','063','064','070'];
  var op_layer='<div id="opl_hp" style="position:absolute;width:30px;z-index:9999;border:1px solid #aaaaaa;background:#ffffff;"><ul>';
  var i;
  op_layer+='<li style="font-size:11px;font-family:gulim;cursor:pointer;height:16px;background:none;padding:4px 0 0 3px;vertical-align:middle;">닫기</li>';
  for(i=0;i<TC_num.length;i++) {
	  op_layer+='<li style="cursor:pointer;height:16px;background:none;padding:4px 0 0 3px;vertical-align:middle;">'+TC_num[i]+'</li>';
  }
  op_layer+='</ul></div>';

  return this.each(function(){
	getData=jQuery(this).val().replace(/-/g,'');
	if(getData.substr(0,2)=='02') getData='0'+getData;
	
	if (getData=='')
	{
		$("#opl_hp").remove();
		$("body").append(op_layer);
		$("#opl_hp").css({left:$(this).offset().left, top:$(this).offset().top});
		$("#opl_hp").focus();
		if ($.browser.msie==true) $("#opl_hp ul li:eq(0)").css({background:'#9e9e9e',color:'#ffffff'});
		$("#opl_hp ul li").hover(function(){$(this).css({background:'#9e9e9e',color:'#ffffff'})},function(){$(this).css({background:'none',color:'#656565'});});
		$("#opl_hp").keydown(function(e,event){
			e.preventDefault();
			key = (e.keyCode ? e.keyCode : e.which);
			switch(key){
				case 38:
					target--;
					break;
				case 40:
					target++;
					break;
				case 13:
					if($("#opl_hp ul li:eq("+target+")").text()=='닫기') {
						$("#opl_hp").remove();
					} else {
						$('#'+eleP).val($("#opl_hp ul li:eq("+target+")").text()+'-');
						$("#opl_hp").remove();
						$('#'+eleP).focus();
					}
					break;
			}
			if(target<0) target=0;
			if(target>=TC_num.length) target=TC_num.length;
			for(i=0;i<=TC_num.length;i++) {
				if (i==target) $("#opl_hp ul li:eq("+i+")").css({background:'#9e9e9e',color:'#ffffff'});
				else $("#opl_hp ul li:eq("+i+")").css({background:'none',color:'#656565'});
			}
		});
		$("#opl_hp ul li").bind('click',function(){if($(this).text()=='닫기') {$("#opl_hp").remove();} else {$('#'+eleP).val($(this).text()+'-');$("#opl_hp").remove();$('#'+eleP).focus();}});
		return;
	} else if ((getData.length<7)&&(getData.length>3))
	{
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))) getData=getData.substr(0,getData.length-1);
		}
		getData=getData.substr(0,3)+'-'+getData.substr(3,(getData.length-3));
	} else if ((getData.length<11)&&(getData.length>6))
	{
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))) getData=getData.substr(0,getData.length-1);
		}
		getData=getData.substr(0,3)+'-'+getData.substr(3,3)+'-'+getData.substr(6,(getData.length-6));
	} else if (getData.length>=11)
	{
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))) getData=getData.substr(0,getData.length-1);
		}
		getData=getData.substr(0,3)+'-'+getData.substr(3,4)+'-'+getData.substr(7,4);
	} else {
		return;
	}

	if(getData.substr(0,2)=='00') getData=getData.substr(1,getData.length-1);
	jQuery(this).val(getData);
  });
};
jQuery.fn.phoneFormat = function() {
  var getData='';
  var target=0;
  var key;
  var eleP=$(this).attr("id");
  var TC_num=['010','011','016','017','018','019'];
  var op_layer='<div id="opl_hp" style="position:absolute;width:30px;z-index:9999;border:1px solid #aaaaaa;background:#ffffff;"><ul>';
  var i;
  op_layer+='<li style="font-size:11px;font-family:gulim;cursor:pointer;height:16px;background:none;padding:4px 0 0 3px;vertical-align:middle;">닫기</li>';
  for(i=0;i<TC_num.length;i++) {
	  op_layer+='<li style="cursor:pointer;height:16px;background:none;padding:4px 0 0 3px;vertical-align:middle;">'+TC_num[i]+'</li>';
  }
  op_layer+='</ul></div>';

  return this.each(function(){
	getData=jQuery(this).val().replace(/-/g,'');
	
	if (getData=='')
	{
		$("#opl_hp").remove();
		$("body").append(op_layer);
		$("#opl_hp").css({left:$(this).offset().left, top:$(this).offset().top});
		$("#opl_hp").focus();
		if ($.browser.msie==true) $("#opl_hp ul li:eq(0)").css({background:'#9e9e9e',color:'#ffffff'});
		$("#opl_hp ul li").hover(function(){$("#opl_hp ul li").css({background:'none',color:'#656565'});$(this).css({background:'#9e9e9e',color:'#ffffff'})},function(){$(this).css({background:'none',color:'#656565'});});
		$("#opl_hp").bind("keydown",function(e){
			e.preventDefault();
			key = e.keyCode ? e.keyCode : e.which;
			switch(key){
				case 38:
					target-=1;
					break;
				case 40:
					target+=1;;
					break;
				case 13:
					if($("#opl_hp ul li:eq("+target+")").text()=='닫기') {
						$("#opl_hp").unbind("keydown");
						$("#opl_hp").remove();
					} else {
						$('#'+eleP).val($("#opl_hp ul li:eq("+target+")").text()+'-');
						$("#opl_hp").unbind("keydown");
						$("#opl_hp").remove();
						$('#'+eleP).focus();
					}
					break;
			}
			if(target<0) target=0;
			if(target>=TC_num.length) target=TC_num.length;
			for(i=0;i<=TC_num.length;i++) {
				if (i==target) $("#opl_hp ul li:eq("+i+")").css({background:'#9e9e9e',color:'#ffffff'});
				else $("#opl_hp ul li:eq("+i+")").css({background:'none',color:'#656565'});
			}
		});
		$("#opl_hp ul li").bind('click',function(){if($(this).text()=='닫기') {$("#opl_hp").unbind("keydown");$("#opl_hp").remove();} else {$('#'+eleP).val($(this).text()+'-');$("#opl_hp").unbind("keydown");$("#opl_hp").remove();$('#'+eleP).focus();}});
		return;
	} else if ((getData.length<7)&&(getData.length>3))
	{
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))) getData=getData.substr(0,getData.length-1);
		}
		getData=getData.substr(0,3)+'-'+getData.substr(3,(getData.length-3));
	} else if ((getData.length<11)&&(getData.length>6))
	{
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))) getData=getData.substr(0,getData.length-1);
		}
		getData=getData.substr(0,3)+'-'+getData.substr(3,3)+'-'+getData.substr(6,(getData.length-6));
	} else if (getData.length>=11)
	{
		if(!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))){
			alert('숫자만 입력가능합니다.');
			while (!((getData.substr(-1,1)>='0')&&(getData.substr(-1,1)<='9'))) getData=getData.substr(0,getData.length-1);
		}
		getData=getData.substr(0,3)+'-'+getData.substr(3,4)+'-'+getData.substr(7,4);
	} else {
		return;
	}
	jQuery(this).val(getData);
  });
};