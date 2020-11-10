const express = require('express')
const app = express()

app.use('/api', require('./2.router'))
app.listen(80, () => {
	console.log('http://127.0.0.1')
})
