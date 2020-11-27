// 入口函数
$(function () {
	// 全选功能  change事件与click事件 它们只在文件上传的时候有区别
	$('.checkall').click(function () {
		// 得到它的选中状态  将它状态给下面的三个复选框
		$('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'))
		getSum()
	})

	// 如果下面的三个都打上勾了 那么上面的那个全选框 也要跟着打上勾
	// 需要给下面的三个复选框 注册点击事件
	$('.j-checkbox').click(function () {
		// console.log("ok");
		// 选中的长度
		var jCheckBoxCheckedLength = $('.j-checkbox:checked').length
		// 下面的三个复选框的长度
		var jCheckBoxLength = $('.j-checkbox').length
		// 上面的复选框的状态要看这两个变量的值是否相等
		$('.checkall').prop(
			'checked',
			jCheckBoxCheckedLength === jCheckBoxLength
		)
		getSum()
	})

	// 增加商品
	$('.increment').click(function () {
		// 先获取输入框里面的值
		var num = $(this).siblings('.itxt').val()
		// 将num 变量的值进行加1
		num++
		$(this).siblings('.itxt').val(num)
		// 获取商品的价格  parents() 找祖先元素   substr() 用于截取字符串
		var p = $(this).parents('.p-num').siblings('.p-price').text().substr(1)
		// toFixed(参数) 保存多少位小数
		var res = (p * num).toFixed(2)
		$(this).parents('.p-num').siblings('.p-sum').text(`￥${res}`)
		getSum()
	})
	// 减减商品
	$('.decrement').click(function () {
		// 先获取输入框里面的值
		var num = $(this).siblings('.itxt').val()
		if (num == 1) return
		// 将num 变量的值进行减1
		num--
		$(this).siblings('.itxt').val(num)
		var p = $(this).parents('.p-num').siblings('.p-price').text().substr(1)
		var res = (p * num).toFixed(2)
		$(this).parents('.p-num').siblings('.p-sum').text(`￥${res}`)
		getSum()
	})

	// 当用户直接修改输入框的内容时
	$('.itxt').change(function () {
		var num = $(this).val()
		var p = $(this).parents('.p-num').siblings('.p-price').text().substr(1)
		var res = (p * num).toFixed(2)
		$(this).parents('.p-num').siblings('.p-sum').text(`￥${res}`)
		getSum()
	})

	// 声明一个函数 用于统计商品的总数量与价格
	function getSum() {
		// console.log("ok");
		var count = 0 // 用于统计商品的总数量
		var sum = 0 // 用于统计商品的总价格
		// 看看用户是否勾选了这个商品 如果已经勾选才去统计它的商品数量
		// 获取到所有的 cart-item这个类名
		var $cartItem = $('.cart-item')
		// 通过jQuery给我们的each方法来进行遍历这个jQuery对象
		$cartItem.each(function (index, dom) {
			// dom这个变量它是 DOM对象 需要转换为jQuery对象 然后才可以调用jQuery的方法  需要判断是否打勾
			if ($(dom).find('.j-checkbox').prop('checked')) {
				count += parseInt($(dom).find('.itxt').val())
				sum += parseFloat($(dom).find('.p-sum').text().substr(1))
			}
		})
		// console.log(count);
		// 把这个结果写入到对应的标签中
		$('.amount-sum em').text(count)
		$('.price-sum em').text(`￥${sum.toFixed(2)}`)
	}
	getSum()

	//   删除商品
	$('.p-action > a').click(function () {
		if (window.confirm('你确定吗')) {
			$(this).parents('.cart-item').remove()
			getSum()
		}
	})
})
