io.on('connection', async (socket) => {

     console.log('user connected');
      
     socket.on('join', (message)=> {
            console.log(message)
     });
   
     socket.on('disconnect', async () => { 
        console.log('user disconnected')
     });
   
   });
   