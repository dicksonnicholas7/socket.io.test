var socket = io('http://localhost:3000/');

var sendButton = document.getElementById("btnSend");
var joinButton = document.getElementById("btnJoin");

var details = {
  room:'',
  message:''
}

joinButton.addEventListener('click', function (e) {

  

  details.room = document.getElementById("room").value;


    socket.emit('join', details );

    document.getElementById("room").readOnly = true;



  
}, false);




sendButton.addEventListener('click', function (e) {

  details.message = document.getElementById("msg").value;

    socket.emit('message in room', details );

    document.getElementById("msg").value = '';
  
}, false);



socket.on('room message', function(message) {

  display(message);
  
});


socket.on('server_response', function(details) {

  display(details.message);
  
});


socket.on('new_user', function(message) {

  display(message);
  
});



socket.on('disconnect', function() {
  console.log('User Disconnected to server');
});

function display(message) {

  var node = document.createElement('li');
  node.appendChild(document.createTextNode(message));
  
  document.querySelector('ul').appendChild(node);
  
}





