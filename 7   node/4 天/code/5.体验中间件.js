const express = require('express')
const app = express()

app.use((req, res, next) => {
	const time = Date.now()
	req.startTime = time
	next()
})

app.get('/', (req, res) => {
	res.send('world' + req.startTime)
})

app.get('/user', (req, res) => {
	res.send('User' + req.startTime)
})
app.listen(80, () => {
	console.log('http://127.0.0.1')
})
