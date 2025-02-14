const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const http = require('http') 
const { Server } = require('socket.io') 

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.use(express.json())
app.use(fileUpload({ createParentPath: true }))

app.get('/', (req, res) => {
    res.send('DCRM DIST SERVER')
})

app.use('/', require('./src/route'))

io.on('connection', (socket) => {
    console.log(`[Socket.IO] User Connected: ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`[Socket.IO] Message received from ${socket.id}:`, data);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log(`[Socket.IO] User Disconnected: ${socket.id}`);
    });
});


const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
