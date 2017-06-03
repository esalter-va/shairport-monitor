var express = require('express')
var fs = require('fs')
var path = require('path')

var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

var parser = require('./parser')

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

io.on('connection', socket => {
    var buffer = ''
    var re = /<item>.*?<\/item>/
    var stream = fs.createReadStream('/tmp/shairport-sync-metadata', { encoding: 'utf-8' }).on('data', chunk => {
        buffer += chunk
        buffer = buffer.replace(/\n/, '')
        while (buffer.match(re)) {
            match = buffer.match(re)
            if (match) {
                var item = match[0]
                buffer = buffer.substring(match.index)
                buffer = buffer.replace(re, '')

                var metadata = parser(item)
                io.emit('metadata', metadata)
            }
        }
    })
})

http.listen(3000, () => {
    console.log('listening on port 3000')
})