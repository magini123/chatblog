const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')

const app = express();

// konfigurerer cors for å tillate requests fra port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'], 
  credentials: true
}));

// lager http server
const server = http.createServer(app)

// setter opp socket.io med cors config
const io = socketio(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

app.use(express.static(path.join(__dirname, 'public')))

// sett med sockets som er tilkoblet
let socketsConnected = new Set()

// lytter etter ny connection
io.on('connection', onConnected)

// funksjon for å håndtere ny connection
function onConnected(socket) {
    // legger til ny socket connection i settet
    console.log(`Client connected with id: ${socket.id}`);
    socketsConnected.add(socket.id)
    
    // oppdaterer total connections
    io.emit('total-connected', socketsConnected.size)
    console.log(`Total clients connected: ${socketsConnected.size}`)

    // fjerner og oppdaterer total connection når frakobles
    socket.on('disconnect', () => {
        console.log(`Client disconnected with id: ${socket.id}`);
        socketsConnected.delete(socket.id)
        io.emit('total-connected', socketsConnected.size)
        console.log(`Total clients connected: ${socketsConnected.size}`)
    });

    // håndterer ny melding
    socket.on('message', (messageData) => {
        socket.broadcast.emit('chat-message', messageData)
        console.log("id: ", socket.id, "melding: ", messageData)
    })
}

// port
const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`server on port ${PORT}`))