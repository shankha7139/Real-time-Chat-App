const express = require('express')
const dotenv = require('dotenv')
const {chats} = require ("./Data/Data")
const connectDB = require('./config/db')
const colors = require('colors')  
const {notFound,errorHandler} = require('./midleware/errorMiddleware')


const app = express()
dotenv.config()
app.use(express.json())
connectDB()

const userRoutes = require('./Routes/userRoutes')
const chatRoutes = require('./Routes/chatRoutes')
const messageRoutes = require('./Routes/messageRoutes.js')

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
const server = app.listen(PORT,console.log(`server started at ${PORT} port`.cyan.bold))

const io = require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")

    socket.on('setup',(userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log("user joined room : " + room)
    })

    socket.on('new message' , (newMessageRecieved) => {
        var chat = newMessageRecieved.chat 
        if (!chat.users) return console.log('chat.users not defined')

        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) return

            socket.in(user._id).emit("message recieved" , newMessageRecieved)
        })
    })
})

//20.42(15)

