const qs = require('querystring')

module.exports = {
	urlencoded: (obj) => (req, res, next) => {
		let str = ''
		req.on('data', (chunk) => {
			str += chunk
		})
		req.on('end', () => {
			if (!obj.extended) {
				const body = queueMicrotask.parse(str)
				req.body = body
				next()
			} else {
			}
		})
	},
}
