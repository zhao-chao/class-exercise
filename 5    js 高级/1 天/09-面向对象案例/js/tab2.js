class tab {
	// 获取元素
	constructor(id) {
		this.tab = document.querySelector(id)
		// 获取li
		this.lis = this.tab.querySelectorAll('.liactive')
		// 获取下面的内容
		this.sections = this.tab.querySelectorAll('.conactive')
		this.init()
	}
	init() {
		for (var i = 0; i < this.lis.length; i++) {
			this.lis[i].index = i
		}
	}
}
new tab('#tab')
