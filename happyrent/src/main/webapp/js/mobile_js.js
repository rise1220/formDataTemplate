
 function adjustJs(width) {
		if (!$('.btn_triger').length) {
		return;
		}
		if (!$('.btn_detail').length) {
		return;
		}

		checkWidthMain = parseInt(width);
		var $win = $(window);
		if (checkWidthMain <= 960) {
			
			$(".btn_triger").click(function(){
				
			});

			$(".btn_detail").click(function(){
				$('body, html').stop().animate();
			});

		}
		}

		$(function() {
			adjustJs($(this).width());
			$(window).resize(function() {
				adjustJs($(this).width());  return false;
			});
		});

