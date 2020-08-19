const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const http = require('http');
const route = require('./routes/routes');
const userRoute = require('./routes/users');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ahk_test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
mongoose.connection.on('connected',(connect) => {
  console.log('connected to DB')
})
mongoose.connection.on('error',(error)=>{
  if(error){
    console.log('error : ' + error)
  }
});


const whitelist = ['http://localhost', 'http://127.0.0.1'];


var corsOptionsDelegate = function (req, callback) {

  const corsOptions = {
      methods: "GET",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
  };

  const myIpAddress = req.connection.remoteAddress; 



  if (whitelist.indexOf(myIpAddress) !== -1) {
      corsOptions.origin = true
  } else {
      corsOptions.origin = false
  }
  callback(null, corsOptions);
}


const app = express();
var port = 3000 || process.env.PORT;
var server = http.createServer(app);

var io = require('socket.io').listen(server);

io.on('connection', async (socket) => {

    console.log('user connected');
     
    socket.on('join', (details)=> {
      console.log(details.room)
           socket.join(details.room);

           socket.broadcast.to(details.room).emit('room message', `new user joined room ${details.room}`);
    });



    socket.on('message in room', (details)=> {
      socket.broadcast.to(details.room).emit('server_response', details);
      console.log(details.message);
});




    socket.on('message', (message)=> {
        socket.broadcast.emit('server_response', message);
        console.log(message);
 });
  
    socket.on('disconnect', async () => { 
       console.log('user disconnected');
    });
  
  });


app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', cors(corsOptionsDelegate), route);
app.use('/api/users', userRoute);


server.listen(port, ()=>{
    console.log(`server running on port${port}`);
})