$(function () {
	function getNewsList() {
		template.defaults.imports.dateFormat = function (data) {
			let date = new Date(data)
			let y = date.getFullYear()

			let m = date.getMonth() + 1
			m = m > 10 ? m : '0' + m

			let d = date.getDate()
			d = d > 10 ? d : '0' + d

			let h = date.getHours()
			h = h > 10 ? h : '0' + h

			let min = date.getMinutes()
			min = min > 10 ? min : '0' + min

			let s = date.getSeconds()
			s = s > 10 ? s : '0' + s

			return `${y}-${m}-${d}  ${h}:${min}:${s} `
		}

		$.ajax({
			type: 'get',
			url: 'http://www.liulongbin.top:3006/api/news',
			success: function (res) {
				if (res.status !== 200) {
					return alert('获取新闻列表数据失败！')
				}
				// console.log(res)

				res.data.forEach((item) => (item.tags = item.tags.split(',')))
				$('#news-list').html(template('tpl-news', res))
			},
		})
	}
	getNewsList()

	// 过滤器
})
