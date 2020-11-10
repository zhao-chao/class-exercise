const express = require('express')
const app = express()

const md = (req, res, next) => {
	console.log('hello')
	next()
}
app.use(md)
app.get('/', (req, res) => {
	console.log('world')
})
