$(function () {
	var flag = true
	var toolTop = $('.recommend').offset().top
	toggleTool()
	function toggleTool() {
		$(window).scroll(function () {
			if ($(document).scrollTop() >= toolTop) {
				$('.fixedtool').fadeIn()
			} else {
				$('.fixedtool').fadeOut()
			}
		})
	}
	$(window).scroll(function () {
		toggleTool()

		if (flag) {
			$('.floor .w').each(function (i, ele) {
				if ($(document).scrollTop() >= $(ele).offset().top) {
					$('.fixedtool li ')
						.eq(i)
						.addClass('current')
						.siblings()
						.removeClass()
				}
			})
		}
	})
})
