

var checkWidth = function() {
	var browserWidth = $(window).width();
	//alert(browserWidth);
	var $body = jQuery('body');
	setsize('dpi_less layout_web');
	if(browserWidth > 1500) {
		setsize('dpi_over layout_web');
		$("#smartSlip").css("height","100%");
	} else if (browserWidth < 1180 && browserWidth > 900) {		
		$("#smartSlip").css("height","100%");
		$(".m_visual").show();		
		$(".m_visual_mobile").hide();
		if (browserWidth < 1090 && browserWidth > 900)
		{
			$("#m_contents").css({"margin-left" : browserWidth-1110+"px"});
			$("#m_contents h1").css({"left" : 1110 - browserWidth+"px","top" : "10px"});
			$("#m_contents .m_review").css({"left":1110 - browserWidth+"px" , "width" : browserWidth-130+"px"});
			$(".reviewList_block").hide();
			$(".board_view").css("margin-left","0");
		}
		else
		{
			$("#m_contents").css("margin-left" , "0px");
			$("#m_contents h1").css({"left" : "80px","top" : "60px"});
			$("#m_contents .m_review").css({"left" : "0px", "width" : "100%"});			
			$(".reviewList_block").show();
			$(".tblEl_block .board_view").css("margin-left","250px");
		}				
	} else if (browserWidth < 900) {				
		$(".m_visual").hide();
		$(".m_visual_mobile").show();
		setsize('layout_mobile');
		$("#smartSlip").height(480);
	}
	$("body").css("opacity" , 1);
};

jQuery(document).ready(function() {
	checkWidth();
	$(window).resize(checkWidth);
});

var setsize = function(size) {
		var $body = jQuery('body');
		jQuery('body').removeClass('dpi_less dpi_over layout_web layout_mobile').addClass(size);
		
};
