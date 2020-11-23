// 获取元素
var preview_img = document.querySelector('.preview_img')
var mask = document.querySelector('.mask')
var big = document.querySelector('.big')
// 鼠标经过 让其他盒子露出来
preview_img.addEventListener('mouseover', function () {
	mask.style.display = 'block'
	big.style.display = 'block'
})
// 鼠标离开 让其他俩盒子隐藏
preview_img.addEventListener('mouseout', function () {
	mask.style.display = 'none'
	big.style.display = 'none'
})
// 让遮盖层 跟着鼠标移动
//获得 鼠标的坐标
preview_img.addEventListener('mousemove', function (e) {
	// 获得鼠标在盒子内的坐标
	var x = e.pageX - preview_img.offsetLeft
	var y = e.pageY - preview_img.offsetTop
	// 把鼠标搞到遮盖层的中间
	var x1 = x - mask.offsetWidth / 2
	var y1 = y - mask.offsetWidth / 2

	// 获取 遮盖层移动的最大值
	var x2 = preview_img.offsetWidth - mask.offsetWidth
	var y2 = preview_img.offsetWidth - mask.offsetWidth
	// 判断x
	if (x1 < 0) {
		x1 = 0
	} else if (x1 > x2) {
		x1 = x2
	}
	// 判断x
	if (y1 < 0) {
		y1 = 0
	} else if (y1 > y2) {
		y1 = y2
	}
	// 把得到的值 给遮盖层
	mask.style.left = x1 + 'px'
	mask.style.top = y1 + 'px'
	// 获取右边图片元素
	var img = document.querySelector('.bigImg')
	// 获取右边图片的宽度
	var imgw = img.offsetWidth
	// 获取右边图片的最大移动位置
	var imgww = big.offsetWidth - imgw
	var imghh = big.offsetHeight - imgw
	// 获取图片的移动位置
	var bigw = (x1 * imgww) / x2
	var bigh = (y1 * imghh) / y2
	// 大图片的移动位置
	img.style.left = bigw + 'px'
	img.style.top = bigh + 'px'
})
