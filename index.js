var http = require('http');
var express=require('express');
var app=express();
var server=http.createServer(app);
var io=require('socket.io')(server);
var mqtt=require('mqtt');
app.engine('ejs',require('ejs').__express);
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    res.render('index');
});

var client=mqtt.connect([{host:'mqtt.fluux.io',port:1883}]);
client.on('connect',()=>{
    client.subscribe('communicate',(err)=>{
        if(!err)
        client.publish('communicate','MQTT Hello');
    });
    client.unsubscribe('communicate');
});
io.on('connection',(socket)=>{
//    console.log("Socket.io connected");
    client.subscribe('message@456');
   
    client.on('message',(topic, mess)=>{
        socket.emit('mess',mess.toString());
    });
    socket.on('mess',(message)=>{
        console.log('red')
        client.publish('message@789',message);
    });
    socket.on('disconnect',()=>{
//        console.log("Socket.io disconnected");
    });
});
server.listen(3000,()=>{
//    console.log("Listening on port 3000");
});