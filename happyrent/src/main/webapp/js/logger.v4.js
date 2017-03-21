var _TRK_DOMAIN="logger.co.kr";
var _trk_bMSIE=(document.all)?true:false;
var _trk_bJS12=(window.screen)?true:false;

function _trk_escape(_str) {
    var str, ch;
    var bEncURI = "N"; try{bEncURI=encodeURI('Y');}catch(_e){}
    if( bEncURI == "Y" ) str=encodeURI(_str); else str = escape(_str);
    str=str.split("+").join("%2B");
    str=str.split("/").join("%2F");
    str=str.split("&").join("%26");
    str=str.split("?").join("%3F");
    str=str.split(":").join("%3A");
    str=str.split("#").join("%23");
    return str;
}
function _trk_setCookie(name,value,expire) {
    var today=new Date();
    today.setTime(today.getTime() + expire);

	var domainStr = "";
	if((typeof _TRK_CDMN)!="undefined" && _TRK_CDMN!="") domainStr = "domain="+_TRK_CDMN+";";
    document.cookie=name+"="+value+"; path=/; "+domainStr+" expires="+today.toGMTString()+";";
}
function _trk_getCookie(name) {
    var cookieName=name+"=";
    var x=0;
    while(x<=document.cookie.length) {
        var y=(x+cookieName.length);
        if(document.cookie.substring(x,y)==cookieName) {
            if((endOfCookie=document.cookie.indexOf(";",y))==-1) endOfCookie=document.cookie.length;
            return unescape(document.cookie.substring(y,endOfCookie));
        }
        x=document.cookie.indexOf(" ",x)+1;
        if(x == 0) break;
    }
    return "";
}
function _trk_getParameter(name) {
    var paraName=name+"=";
    var URL=""+self.document.location.search;
    var tURL=""; try{ tURL=top.document.location.search; }catch(_e){}
    URL=URL+"&"+tURL;
    if(URL.indexOf(paraName)!=-1) {
        var x=URL.indexOf(paraName)+paraName.length;
        var y=URL.substr(x).indexOf("&");
        if(y!=-1) return URL.substring(x,x+y); else return URL.substr(x);
    }
    return "";
}

function getNewSID(len) {
	var str="01234567890abcdef";
	var ret="";
	for(var i=0; i<len; i++) {
		ret=ret+(str.substr(Math.floor(Math.random()*str.length),1));
	}
	return ret;
}

function _trk_make_code(_TRK_SERVER,_TRK_U) {
    var dt=document.title.toString();
    dt=dt.substr(0,128);
    var dr=self.document.referrer;
    var tdr=""; try{ tdr=top.document.referrer; }catch(_e){}
    var tdu=""; try{ tdu=top.document.location.href; }catch(_e){}
    var bFrm=false;
    if(dr==tdu) { dr=tdr; bFrm=true; }
    if(dr=="undefined") dr="";

    var du=self.document.location.href;
    if(du.substr(0,4)=="file") return "";

    var adKeyVal = "";
    if(bFrm) {
		var adParams = new Array("OVKEY", "OVRAW", "netpia", "logger_kw", "source", "keywd", "NVADID", "NVAR", "NVADKWD", "NVKWD", "DMCOL", "DMKW", "DMSKW", "DWIT", "DWIC", "gad", "gclid", "gkw", "rcsite", "rctype", "rc_code", "_C_", "_G_");
    	for(var i=0; i<adParams.length; i++) {
        	adKeyVal=_trk_getParameter(adParams[i]);
			if(adKeyVal!="" && du.indexOf(adParams[i]+"=")<0 )
				if(du.indexOf("?")!=-1) du=du+"&"+adParams[i]+"="+adKeyVal; 
				else du=du+"?"+adParams[i]+"="+adKeyVal;
    	}
    }

    var ce=navigator.cookieEnabled?"Y":"N";
    var je=navigator.javaEnabled()?"Y":"N";
    var ss=""; var cd = "";
    if(_trk_bJS12) {
        ss=screen.width+"x"+screen.height;
        cd=screen.colorDepth;
    }
    if(!dt) dt=""; if(!dr) dr=""; if(!du) du=""; if(!ce) ce=""; if(!je) je="";

    var t = new Date;
    var tye=(_trk_bMSIE)?(t.getYear()):(t.getFullYear()); var tmo=t.getMonth()+1; var tda=t.getDate();
    var tho=t.getHours(); var tmi=t.getMinutes(); var tse=t.getSeconds();
    var tzo=t.getTimezoneOffset();

    var tc = "";
    var prtcl=document.location.protocol.indexOf("https")!=-1?"https://":"http://";
    if(prtcl=="https://") _TRK_SERVER="ssl."+_TRK_DOMAIN;
    tc=tc+prtcl+_TRK_SERVER;

    var bPNF=((typeof _TRK_PI)!="undefined" && _TRK_PI=="PNF")?true:false;
    if(bPNF) tc=tc+"/tracker_click.tsp"; else tc=tc+"/tracker.tsp";
    tc=tc+"?u="+_TRK_U+"&XU=&EXEN="+_EXEN;

    if(bPNF) {
        tc=tc+"&rnd="+Math.random()+"&CKFL="+_TRK_PI+"&CKDATA="+_trk_escape(du);
    } else {
        tc=tc+"&dr="+_trk_escape(dr)+"&XDR="+"&dt="+_trk_escape(dt)+"&du="+_trk_escape(du);
        if((typeof _TRK_CP)!="undefined" && _TRK_CP!="") tc=tc+"&CP="+_trk_escape(_TRK_CP)+"&XCP=";
        if((typeof _TRK_PI)!="undefined" && _TRK_PI!="") tc=tc+"&PI="+_TRK_PI;
        if((typeof _TRK_PN)!="undefined" && _TRK_PN!="") tc=tc+"&PN="+_trk_escape(_TRK_PN);
        if((typeof _TRK_PND)!="undefined" && _TRK_PND!="") tc=tc+"&PND="+_trk_escape(_TRK_PND);
        if((typeof _TRK_MF)!="undefined" && _TRK_MF!="") tc=tc+"&MF="+_trk_escape(_TRK_MF);
        if((typeof _TRK_OA)!="undefined" && _TRK_OA!="") tc=tc+"&OA="+_TRK_OA;
        if((typeof _TRK_OP)!="undefined" && _TRK_OP!="") tc=tc+"&OP="+_trk_escape(_TRK_OP);
        if((typeof _TRK_OE)!="undefined" && _TRK_OE!="") tc=tc+"&OE="+_TRK_OE;
		if((typeof _TRK_ODN)!="undefined" && _TRK_ODN!="") tc=tc+"&ODN="+_TRK_ODN;
        if((typeof _TRK_CC)!="undefined" && _TRK_CC!="") tc=tc+"&CC="+_TRK_CC;
        if((typeof _TRK_RK)!="undefined" && _TRK_RK!="") tc=tc+"&RK="+_trk_escape(_TRK_RK);
        if((typeof _TRK_SX)!="undefined" && _TRK_SX!="") tc=tc+"&SX="+_TRK_SX;
        if((typeof _TRK_AG)!="undefined" && _TRK_AG!="") tc=tc+"&AG="+_TRK_AG;
        if((typeof _TRK_IK)!="undefined" && _TRK_IK!="") tc=tc+"&IK="+_trk_escape(_TRK_IK);
        if((typeof _TRK_CN)!="undefined" && _TRK_CN!="") tc=tc+"&CN="+_trk_escape(_TRK_CN);
		if((typeof _TRK_VC)!="undefined" && _TRK_VC!="") tc=tc+"&VC="+_trk_escape(_TRK_VC);
        tc=tc+"&js=Y"+"&ss="+escape(ss)+"&cd="+cd+"&ce="+ce+"&je="+je+"&tzo="+tzo+"&tye="+tye+"&tmo="+tmo+"&tda="+tda+"&tho="+tho+"&tmi="+tmi+"&tse="+tse;
    }
    return tc;
}
function _trk_flashEnvView() {
     var _trk_code_flash=_trk_code_base;
     for (var envCnt=0; envCnt<arguments.length; envCnt++){


        if(typeof arguments[envCnt] !=  "undefined" && arguments[envCnt] != ""){
            var trk_str = arguments[envCnt];
            if(trk_str.indexOf("_TRK_CP")>=0){
                var trk_cp = trk_str.split('=');
                var _TRK_CP = trk_cp[1];
                _trk_code_flash=_trk_code_flash.replace(/&CP=.*&XCP=/g,"&XCP=");
                _trk_code_flash=_trk_code_flash.replace(/&dr=.*&XDR=/g,"&XDR=");
                _trk_code_flash=_trk_code_flash+"&dr=&CP="+_trk_escape(_TRK_CP)+"&rnd="+Math.random();
            }
            if((trk_str.indexOf("_TRK_PN")>=0) || (trk_str.indexOf("_TRK_PND")>=0) || (trk_str.indexOf("_TRK_MF")>=0) || (trk_str.indexOf("_TRK_RK")>=0) || (trk_str.indexOf("_TRK_OP")>=0) || (trk_str.indexOf("_TRK_IK")>=0) || (trk_str.indexOf("_TRK_CN")>=0)){
                var trk_env = trk_str.split('=');
                var _TRK_ENV = _trk_escape(trk_env[1]);
                var tkr_env_name = trk_str.substring(trk_str.indexOf('_',1)+1,trk_str.lastIndexOf('='));
                var _trk_envs = "&"+tkr_env_name+"="+ _TRK_ENV;
                if( _trk_code_flash.indexOf("&"+tkr_env_name+"=") > 0) {
                    var regVal = "\&"+tkr_env_name+"\=(.*)(\&PN\=|\&PND\=|\&MF\=|\&OA\=|\&OP\=|\&OE\=|\&CC\=|\&RK\=|\&SX\=|\&AG\=|\&IK\=|\&js\=|\&CN\=|\&VC\=)";
                    var envReg = new RegExp(regVal, 'gi');
                    var envRst = _trk_code_flash.match(envReg);
                    var envRst = envRst.toString();
                    var envArr = envRst.split('&');
                    var envVar = envArr[1];
                    _trk_code_flash=_trk_code_flash.replace("&"+envVar, _trk_envs);
                }else{
                    _trk_code_flash = _trk_code_flash+"&"+tkr_env_name+"="+_TRK_ENV;
                }
            }
            if((trk_str.indexOf("_TRK_PI")>=0) || (trk_str.indexOf("_TRK_OA")>=0) || (trk_str.indexOf("_TRK_OE")>=0) || (trk_str.indexOf("_TRK_CC")>=0) || (trk_str.indexOf("_TRK_SX")>=0) || (trk_str.indexOf("_TRK_AG")>=0) || (trk_str.indexOf("_TRK_VC")>=0)){
                var trk_env = trk_str.split('=');
                var _TRK_ENV = trk_env[1];
                var tkr_env_name = trk_str.substring(trk_str.indexOf('_',1)+1,trk_str.lastIndexOf('='));
                var _trk_envs = "&"+tkr_env_name+"="+_TRK_ENV+"&";
                if( _trk_code_flash.indexOf("&"+tkr_env_name+"=") > 0) {
                    var regVal = "\&"+tkr_env_name+"\=(.*)(\&PN\=|\&PND\=|\&MF\=|\&OA\=|\&OP\=|\&OE\=|\&CC\=|\&RK\=|\&SX\=|\&AG\=|\&IK\=|\&js\=|\&CN\=|\&VC\=)";
                    var envReg = new RegExp(regVal, 'gi');
                    var envRst = _trk_code_flash.match(envReg);
                    var envRst = envRst.toString();
                    var envArr = envRst.split('&');
                    var envVar = envArr[1];
                        _trk_code_flash=_trk_code_flash.replace("&"+envVar, _trk_envs);
                }else{
                        _trk_code_flash = _trk_code_flash+"&"+tkr_env_name+"="+_TRK_ENV;
                }
            }
        }
    }
    _trk_img_base_click.src=_trk_code_flash ;

	if(_TRK_U!="") {
			_trk_img_chan_click.src=_trk_code_flash.replace(/\?u=[0-9A-z]+&XU=/g,"?u="+_TRK_U+"&XU=");
	}
}
function _trk_flashContentsView(_TRK_PI, _TRK_CP) {
    var _trk_code_flash=_trk_code_base;
    var _trk_piv = "&PI="+_TRK_PI+"&";
    _trk_code_flash=_trk_code_flash.replace(/&CP=.*&XCP=/g,"&XCP=");
    _trk_code_flash=_trk_code_flash.replace(/&dr=.*&XDR=/g,"&XDR=");
    if( _trk_code_flash.indexOf("&PI=") > 0) {
        var regVal = "\&PI\=(.*)(\&PN\=|\&PND\=|\&MF\=|\&OA\=|\&OP\=|\&OE\=|\&CC\=|\&RK\=|\&SX\=|\&AG\=|\&IK\=|\&js\=|\&VC\=)";
        var envReg = new RegExp(regVal, 'gi');
        var envRst = _trk_code_flash.match(envReg);
        var envRst = envRst.toString();
        var envArr = envRst.split('&');
        var envVar = envArr[1];

        _trk_code_flash=_trk_code_flash.replace("&"+envVar+"&", _trk_piv );
    }else{
        _trk_code_flash = _trk_code_flash+"&PI="+_TRK_PI;
    }
    _trk_img_base_click.src=_trk_code_flash+"&dr=&CP="+_trk_escape(_TRK_CP)+"&rnd="+Math.random();
    if(_TRK_U!="") {
        _trk_code_flash=_trk_code_flash.replace(/\?u=[0-9A-z]+&XU=/g,"?u="+_TRK_U+"&XU=");
        _trk_img_chan_click.src=_trk_code_flash+"&dr=&CP="+_trk_escape(_TRK_CP)+"&rnd="+Math.random();
    }
}
function _trk_clickTrace(_TRK_CKFL,_TRK_CKDATA) {
    var _trk_code_click=_trk_code_base.substr(0,_trk_code_base.indexOf("tracker.tsp"));
    _trk_code_click=_trk_code_click+"tracker_click.tsp?rnd="+Math.random()+"&CKFL="+_TRK_CKFL+"&CKDATA="+_trk_escape(_TRK_CKDATA);
    _trk_img_base_click.src=_trk_code_click+"&u="+_TRK_LID;
    if(_TRK_U!="") _trk_img_chan_click.src=_trk_code_click+"&u="+_TRK_U;
}
function _trk_adClick( adSvr, svcCode, adCode ) {
    var ac = "";
    var prtcl=document.location.protocol.indexOf("https")!=-1?"https://":"http://";
    if(prtcl=="https://") adSvr="ssl."+_TRK_DOMAIN;
    ac=ac+prtcl+adSvr;
    _trk_img_base_click.src=ac+"/tracker_ad.tsp?u="+svcCode+"&mode=C&adCode="+adCode+"&rnd="+getNewSID(10);
}
function _trk_adClickImpress( adSvr, svcCode, adCode ) {
    var ac = "";
    var prtcl=document.location.protocol.indexOf("https")!=-1?"https://":"http://";
    if(prtcl=="https://") adSvr="ssl."+_TRK_DOMAIN;
    ac=ac+prtcl+adSvr;
    _trk_img_base_click.src=ac+"/tracker_ad.tsp?u="+svcCode+"&mode=I&adCode="+adCode;
}


var _TRK_LIFE=_trk_getParameter("_L_");
if(_TRK_LIFE=="") _TRK_LIFE=14;
_TRK_LIFE = parseInt(_TRK_LIFE)*24*60*60*1000;

if ((typeof _TRK_U) != "undefined" && _TRK_U != "") { _TRK_U = _TRK_U; } else { var _TRK_U = ""; }
var _TRK_U_P=_trk_getParameter("_U_");
var _TRK_U_C= _trk_getCookie("_TRK_U");
if(_TRK_U_C!="") _TRK_U=_TRK_U_C;
if(_TRK_U_P!="") _TRK_U=_TRK_U_P;
if(_TRK_U!="" && _TRK_U_P!="") _trk_setCookie("_TRK_U",_TRK_U,_TRK_LIFE);

var _TRK_CC_C=_trk_getCookie("_TRK_CC");
var _TRK_CC_P=_trk_getParameter("_C_");
if((typeof _TRK_CC)!="undefined" && _TRK_CC!="") _TRK_CC_P=_TRK_CC;
if(_TRK_CC_C!="") _TRK_CC=_TRK_CC_C;
if(_TRK_CC_P!="") _TRK_CC=_TRK_CC_P;
if((typeof _TRK_CC)!="undefined" && _TRK_CC!="" && _TRK_CC_P!="") _trk_setCookie("_TRK_CC",_TRK_CC,_TRK_LIFE);

var _TRK_VC_C=_trk_getCookie("_TRK_VC");
var _TRK_VC_P=_trk_getParameter("_VC_");
if((typeof _TRK_VC)!="undefined" && _TRK_VC!="") _TRK_VC_P=_TRK_VC;
if(_TRK_VC_C!="") _TRK_VC=_TRK_VC_C;
if(_TRK_VC_P!="") _TRK_VC=_TRK_VC_P;
if((typeof _TRK_VC)!="undefined" && _TRK_VC!="" && _TRK_VC_P!="") _trk_setCookie("_TRK_VC",_TRK_VC,_TRK_LIFE);

var _TRK_RK_C=_trk_getCookie("_TRK_RK");
var _TRK_RK_P=_trk_getParameter("_R_");
if((typeof _TRK_RK)!="undefined" && _TRK_RK!="") _TRK_RK_P=_TRK_RK;
if(_TRK_RK_C!="") _TRK_RK=_TRK_RK_C;
if(_TRK_RK_P!="") _TRK_RK=_TRK_RK_P;
if((typeof _TRK_RK)!="undefined" && _TRK_RK!="" && _TRK_RK_P!="") _trk_setCookie("_TRK_RK",_TRK_RK,_TRK_LIFE);

var _SS_LIFE = 30*60*1000;
var _EXEN = _trk_getCookie("_EXEN");
if( _EXEN == "" ) _EXEN = 0; _EXEN ++;
_trk_setCookie("_EXEN",_EXEN,_SS_LIFE);

var _trk_code_base=_trk_make_code(_L_TD,_TRK_LID);
var _trk_code_chan="";
if(_TRK_U!="") _trk_code_chan=_trk_code_base.replace(/\?u=[0-9A-z]+&XU=/g,"?u="+_TRK_U+"&XU=");
var _trk_img_base=new Image();
var _trk_img_chan=new Image();
var _trk_img_base_click=new Image();
var _trk_img_chan_click=new Image();

if(_trk_bJS12==true) {
    if(_trk_bMSIE) {
        _trk_img_base.src=_trk_code_base;
        if(_TRK_U!="") _trk_img_chan.src=_trk_code_chan;
    } else {
        setTimeout("_trk_img_base.src=_trk_code_base;",1);
        if(_TRK_U!="") setTimeout("_trk_img_chan.src=_trk_code_chan;",1);
    }
} else {
    if(_trk_bMSIE) document.write('<div style=\"display: none\">');
    document.write('<img src=\"'+_trk_code_base+'\" height=\"0\" width=\"0\">');
    if(_TRK_U!="") document.write('<img src=\"'+_trk_code_chan+'\" height=\"0\" width=\"0\">');
    if(_trk_bMSIE) document.write('<\/div>');
}