var app = require('express')()
var http = require('http').createServer(app)

app.get('/', (req, res) => {
    res.send('Hello World')
})

http.listen(3000, () => {
    console.log('listening on port 3000')
})