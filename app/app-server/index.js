const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const cors = require('cors')
// const { writeFile } = require('fs')

app.use(cors())
app.use(express.json())
app.set('port', process.env.PORT || 5555)
app.use(express.urlencoded({extended: true}))

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
})

server.listen(app.get('port'), () => {
    console.log(`localhost:${app.get('port')}`)
})
    
const { HomeRoute } = require('./routes/main')
const { AccessRoute } = require('./routes/access')

app.use('/', HomeRoute)
app.use('/access', AccessRoute)