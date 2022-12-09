const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Authroute = require("./routes/Authroute");
const UserRoute = require("./routes/UserRoute");
const postRoute = require("./routes/postRoute");
const ChatRoute = require("./routes/ChatRoute");
const CommentRoute = require('./routes/commentRoute')
const MessageRoute = require("./routes/MessageRoute");
const cors = require("cors");
var http = require("https");

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Usage of Routes
app.use(Authroute);
app.use(UserRoute);
app.use(postRoute);
app.use(ChatRoute);
app.use(MessageRoute);
app.use(CommentRoute);

setInterval(function() {
    http.get("https://chatapp-api-server.onrender.com");
    console.log("Wakeup");
}, 840000);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => {
    throw new Error(err.code);
  });
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log("listining to port" + PORT);
});


const io = require('socket.io')(server,{
  cors:{
    origin:process.env.ORIGIN
  }
})
let activeUsers = []
io.on("connection",(socket) =>{
  // add new user 
  socket.on('new-user-add', (newUserId) =>{
    if(!activeUsers.some((user) => user.userId === newUserId)){
      activeUsers.push({
        userId:newUserId,
        socketId: socket.id
      })
    }

    // console.log("connected",activeUsers);
    io.emit('get-user', activeUsers)
    // SEND MESSAGE 
socket.on('send-message', (data) =>{
  const {receiverId} = data;
  const user = activeUsers.find((user)=> user.userId === receiverId)
  // console.log("Sending message to" + receiverId);
  // console.log("Data",data);
  if(user){
    io.to(user.socketId).emit('receive-message',data)
  }
})

  })
  socket.on('disconnect',()=>{
    activeUsers= activeUsers.filter((user) => user.socketId !== socket.id)
    // console.log("user Disconnected",activeUsers);
    io.emit('get-user', activeUsers)
})
})