const itheima = require('./banana')

const dtStr = itheima.dateFormat(new Date())
console.log(dtStr)

const htmlstr = '<h1 title= "abc">这是h1标签<span>123&nbsp;</span></h1>'

const str = itheima.htmlEscape(htmlstr)
console.log(str)

const str2 = itheima.htmlUnEscape(str)
console.log(str2)
