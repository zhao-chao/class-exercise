const path = require('path')
const fpath =
	'C:\\Users\\赵超\\Desktop\\课堂练习\\7   node\\1 天\\code\\files\\4.成绩ok121.txt'
// var fullname = path.basename(fpath)
// console.log(fullname)
var extname = path.basename(fpath, 'txt')
console.log(extname)
