$(function () {
  // 获取新闻列表的函数
  function getNewsList() {
    template.defaults.imports.formatDate = function (data) {
      let date = new Date(data)
      let year = date.getFullYear()
      
      let month = date.getMonth() + 1
      month = ('' + month).padStart(2, 0)

      let day = date.getDate()
      day = day.toString().padStart(2, 0)

      let hours = date.getHours()
      hours = hours.toString().padStart(2, 0)

      let minutes = date.getMinutes()
      minutes = minutes.toString().padStart(2, 0)

      let seconds = date.getSeconds()
      seconds = seconds.toString().padStart(2, 0)
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
    $.get('http://www.liulongbin.top:3006/api/news', function (res) {
      if (res.status !== 200) {
        return alert('获取新闻列表数据失败！')
      }
      // console.log(res)

      res.data.forEach(item => item.tags = item.tags.split(','))

      console.log(res)

      $('#news-list').html(template('news-tmp', res))
    })
  }

  getNewsList()

})
