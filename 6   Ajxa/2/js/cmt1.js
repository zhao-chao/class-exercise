// 渲染页面
function hx() {
	$.ajax({
		type: 'get',
		url: 'http://www.liulongbin.top:3006/api/cmtlist',
		success(res) {
			if (res.status !== 200) return alert('获取失败')

			var rows = []
			$.each(res.data, function (i, item) {
				var str =
					'<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间：' +
					item.time +
					'</span><span class="badge" style="background-color: #5BC0DE;">评论人：' +
					item.username +
					'</span>' +
					item.content +
					'</li>'
				rows.push(str)
			})
			$('#cmt-list').empty().append(rows)
		},
	})
}
hx()
$(function () {
	$('#formAddCmt').on('submit', function () {
		// 获取表单信息
		var data = $(this).serialize()
		$.ajax({
			type: 'post',
			url: 'http://www.liulongbin.top:3006/api/addcmt',
			data,
			success(res) {
				if (res.status !== 201) return alert('发表失败')
				hx()
				$('#formAddCmt')[0].reset()
			},
		})

		return false
	})
})
