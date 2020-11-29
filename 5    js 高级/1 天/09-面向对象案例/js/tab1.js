var that
class Tab {
	constructor(id) {
		// 获取元素
		that = this
		// 大盒子
		this.main = document.querySelector(id)

		// 获取加号
		this.add = this.main.querySelector('.tabadd')
		// 获取li 的夫元素
		this.ul = this.main.querySelector('.fisrstnav ul:first-child')
		// section 的父元素
		this.fsection = this.main.querySelector('.tabscon')
		// 调动点击事件
		this.init()
	}
	// init 初始化操作让相关的元素绑定事件
	init() {
		this.updateNode()
		// 给加号添加一个点击事件
		this.add.onclick = this.addTab

		// 点击切换
		for (var i = 0; i < this.lis.length; i++) {
			this.lis[i].index = i
			this.lis[i].onclick = this.toggleTab
			this.remove[i].onclick = this.removeTab

			this.spans[i].ondblclick = this.editTab
			this.sections[i].ondblclick = this.editTab
		}
	}

	// 为了解决新添加元素绑定事件 获取li section icon-guanbi
	updateNode() {
		// 上面的
		this.lis = this.main.querySelectorAll('li')
		// 下面的
		this.sections = this.main.querySelectorAll('section')
		// 删除符号
		this.remove = this.main.querySelectorAll('.icon-guanbi')
		this.spans = this.main.querySelectorAll(
			'.fisrstnav li span:first-child'
		)
	}

	// 1  切换  添加类名
	toggleTab() {
		that.clearClass()
		this.className = 'liactive'
		that.sections[this.index].className = 'conactive'
	}
	// 删除类名
	clearClass() {
		// this的指向永远取决于调用
		// 方法中 this 指向调用者
		for (var i = 0; i < this.lis.length; i++) {
			this.lis[i].className = ''
			this.sections[i].className = ''
		}
	}
	// 2  填加
	addTab() {
		// 排他
		that.clearClass()
		// 随机数
		var random = Math.random()
		// 上面的小li
		var li = `<li class="liactive">
        <span>新添加的小li</span
        ><span class="iconfont icon-guanbi"></span>
    </li>`
		that.ul.insertAdjacentHTML('beforeend', li)
		// 下面的  this.section
		var section = `<section class="conactive">${random}</section>`
		that.fsection.insertAdjacentHTML('beforeend', section)

		that.init()
	}
	// 3  删除
	removeTab(e) {
		e //阻止冒泡[DOM推荐标准(ie678不兼容)]
			//ie678用cancelBubble = true
			//兼容处理快捷键jr-zzmp/jr-stopPropagation
			.stopPropagation()
		var index = this.parentNode.index
		that.lis[index].remove()
		that.sections[index].remove()
		that.init()
		// 当删除后 还有选中状态的时候  不执行后面的代码
		if (document.querySelector('.liactive')) return

		// 当我们删除了选中状态的li 让前一个选中
		index--
		that.lis[index] && that.lis[index].click()
	}
	// 4  修改
	editTab() {
		var str = this.innerHTML
		// 双击禁止选定文字
		window.getSelection
			? window.getSelection().removeAllRanges()
			: document.selection.empty()
		// alert(11);
		this.innerHTML = '<input type="text" />'
		var input = this.children[0]
		input.value = str
		input.select() // 文本框里面的文字处于选定状态
		// 当我们离开文本框就把文本框里面的值给span
		input.onblur = function () {
			this.parentNode.innerHTML = this.value
		}
		// 按下回车也可以把文本框里面的值给span
		input.onkeyup = function (e) {
			if (e.keyCode === 13) {
				// 手动调用表单失去焦点事件  不需要鼠标离开操作
				this.blur()
			}
		}
	}
}

new Tab('#tab')
