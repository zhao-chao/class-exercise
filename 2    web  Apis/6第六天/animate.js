/**
 * @param{*}object 运动对像
 * @param{*}targetPosition 目标位置

 */

function animate(obj, target) {
	clearInterval(obj.timer)
	obj.timer = setInterval(function () {
		if (obj.offsetLeft != target) {
			return clearInterval(obj.timer)
		}
		obj.style.left = obj.offsetLeft + 10 + 'px'
	}, 30)
}
