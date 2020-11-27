$(function () {
	// 1. 全选 全不选功能模块
	// --------------------------------------------------全选，单选模块
	// 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
	// 事件可以使用change
	console.log($('.checkall'))
	console.log($('.j-checkbox, .checkall'))
	$('.checkall').change(function () {
		// console.log($(this).prop("checked"));
		$('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
		if ($(this).prop('checked')) {
			// 让所有的商品添加 check-cart-item 类名
			$('.cart-item').addClass('check-cart-item')
		} else {
			// check-cart-item 移除
			$('.cart-item').removeClass('check-cart-item')
		}
	})
	// 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
	// 这里有个隐式迭代的过程， 相当于给了3个li都添加了一个change事件，
	console.log($('.j-checkbox'))
	console.log($('.j-checkbox:checked'))
	$('.j-checkbox').change(function () {
		// if(被选中的小的复选框的个数 === 3) {
		//     就要选中全选按钮
		// } else {
		//     不要选中全选按钮
		// }
		// console.log($(".j-checkbox:checked").length);
		// $(".j-checkbox").length 这个是所有的小复选框的个数
		if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
			$('.checkall').prop('checked', true)
		} else {
			$('.checkall').prop('checked', false)
		}
		if ($(this).prop('checked')) {
			// 让当前的商品添加 check-cart-item 类名 parents parent
			$(this).parents('.cart-item').addClass('check-cart-item')
		} else {
			// check-cart-item 移除
			$(this).parents('.cart-item').removeClass('check-cart-item')
		}
	})

	// 增加商品
	$('.increment').click(function () {
		var num = $(this).siblings('.itxt').val()
		num++
		$(this).siblings('.itxt').val(num)
	})
})
