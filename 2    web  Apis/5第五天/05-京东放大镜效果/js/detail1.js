// 1.获取元素

var preview_img = document.querySelector('.preview_img')
var mask = document.querySelector('.mask')
var big = document.querySelector('.big')
// 2 . 当鼠标经过  preview_img 这个盒子里面 把其他两个显示出来
preview_img.addEventListener('mouseover', function () {
	mask.style.display = 'block'
	big.style.display = 'block'
})
// 2 . 当鼠标离开  preview_img 这个盒子里面 把其他两个隐藏起来

preview_img.addEventListener('mouseout', function () {
	mask.style.display = 'none'
	big.style.display = 'none'
})
// 4.给preview_img 这个盒子添加鼠标移动事件
preview_img.addEventListener('mousemove', function (e) {
	// 获取鼠标在盒子内部的坐标
	var x = e.pageX - preview_img.offsetLeft
	var y = e.pageY - preview_img.offsetTop
	// 获取遮盖层的宽度
	var maskWidth = mask.offsetWidth
	// 把鼠标移动到遮盖层的中间
	var maskMoveX = x - maskWidth / 2
	var maskMoveY = y - maskWidth / 2
	// 得到遮盖层盒子的 向右边移动的最大位置
	var mmmX = preview_img.offsetWidth - maskWidth
	var mmmY = preview_img.offsetWidth - maskWidth

	// 判断遮盖层是否超出外部盒子
	// X 控制左右
	if (maskMoveX < 0) {
		maskMoveX = 0
	} else if (maskMoveX > mmmX) {
		maskMoveX = mmmX
	}
	// X 控制上下
	if (maskMoveY < 0) {
		maskMoveY = 0
	} else if (maskMoveY > mmmY) {
		maskMoveY = mmmY
	}
	// 移动遮盖层这个盒子 给这个盒子样式定位的值
	mask.style.left = maskMoveX + 'px'
	mask.style.top = maskMoveY + 'px'

	// 获取元素
	var img = document.querySelector('.bigImg')
	// 获取图片的宽度
	var imgw = img.offsetWidth
	// 求出图片的最大移动位置
	var bigMaxX = big.offsetWidth - imgw
	var bigMaxY = big.offsetHeight - imgw
	// 求出图片的移动距离
	var bigmoveX = (maskMoveX * bigMaxX) / mmmX
	var bigmoveY = (maskMoveY * bigMaxY) / mmmY
	// 给大图片这个盒子样式定位的值
	img.style.left = bigmoveX + 'px'
	img.style.top = bigmoveY + 'px'
})
