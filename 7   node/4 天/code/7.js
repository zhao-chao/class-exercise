const express = require('express')

const app = express()

const router = require('./8 apiRouter')

app.listen(80, function () {
	console.log('http://127.0.0.1')
})
