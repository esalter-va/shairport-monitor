var express = require('express')
var io = require('socket.io')(http)
var path = require('path')

var app = express()
var http = require('http').createServer(app)

app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

io.on('connection', socket => {
    console.log('a user connected')
})

http.listen(3000, () => {
    console.log('listening on port 3000')
})