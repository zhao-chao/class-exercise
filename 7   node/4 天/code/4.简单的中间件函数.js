const express = require('express')
const app = express()

// const md = (req, res, next) => {
// 	console.log('hello')
// 	next()
// }
// app.use(md)

app.use((req, res, next) => {
	console.log('hello')
	next()
})

app.get('/', (req, res) => {
	res.send('world')
})

app.get('/user', (req, res) => {
	res.send('User')
})
app.listen(80, () => {
	console.log('http://127.0.0.1')
})
