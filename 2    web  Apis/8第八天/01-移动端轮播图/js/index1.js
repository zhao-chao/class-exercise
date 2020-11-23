window.addEventListener('load', function () {
	// 获取元素
	var focus = document.querySelector('.focus')
	var ul = focus.children[0]
	// 获取focus宽度
	var w = focus.offsetWidth
	var ol = focus.children[1]
	// 利用定时器 自动轮播图片
	var index = 0
	var timer = setInterval(function () {
		index++
		var translatex = -index * w
		ul.style.transition = 'all .3s'
		ul.style.transform = ' translatex(' + translatex + 'px)'
	}, 2000)

	ul.addEventListener('transitionend', function () {
		if (index >= 3) {
			index = 0
			var movep = -index * w
			ul.style.transition = 'none'
			ul.style.transform = `translatex(${movep}px)`
		} else if (index < 0) {
			index = 2
			var movep = -index * w
			ul.style.transition = 'none'
			ul.style.transform = `translatex(${movep}px)`
		}
		ol.querySelector('.current').classList.remove('current')
		ol.children[index].classList.add('current')
	})

	var startx = 0

	var movex = 0
	ul.addEventListener('tuochstart', function (e) {
		startx = e.targetTpuches[0].pageX
		clearInterval(timer)
	})
	ul.addEventListener('touchmove', function (e) {
		movex = e.targetTouches[0].pageX - startx
		var movep = -index * w + movex
		ul.style.transition = 'none'
		ul.style.transform = `translatex(${movep}px)`
		e.preventDefault()
	})
	ul.addEventListener('touchend', function (e) {
		if (Math.abs(movex) > 50) {
			if (movex > 0) {
				index--
			} else {
				index++
			}
			var translatex = -index * w
			ul.style.transition = 'all .3s'
			ul.style.transform = ' translatex(' + translatex + 'px)'
		}
	})
})
