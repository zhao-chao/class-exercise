$(function () {
	$('#title').on('keydown', function (e) {
		var keycode = e.keycode
		if (keycode === 13) {
			var date = $(this).val()
			if (date.trim().length === 0) return alert('在输入一遍 听到没')
			var localData = getData()
		}
	})
	function getData() {
		var storageData = window.localStorage.getItem('todolist')
		if (storageData === null) {
			return []
		} else {
			return JSON.parse(data)
		}
	}
})
