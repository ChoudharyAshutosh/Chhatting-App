var http = require('http');
var express=require('express');
var app=express();
var server=http.createServer(app);
var io=require('socket.io')(server);
var mqtt=require('mqtt');
var fs=require('fs');
app.engine('ejs',require('ejs').__express);
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    res.render('index');
});

var client=mqtt.connect("mqtt://test.mosquitto.org:1883");
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
        client.publish('message@789',message);
    });
    socket.on('new user',(message)=>{
//        console.log(message);
        fs.writeFile('./data/userlist.txt',message,(err)=>{
            if(err){
                return console.error(err);
            }
        });
        let list=message.toString().split(',');
        fs.writeFile('./data/'+list[list.length-1]+'.txt','',(error)=>{
            if(err)
            console.error(err);
        });
/*         fs.readFile('./data/userlist.txt',(err, data)=>{
            if(err)
            return console.error(err);
            console.log(data.toString().split('$'));
        }); */
    
    });
    socket.on('userlist update',(message)=>{
/*         console.log('request received')
        console.log(message);
 */        fs.readFile('./data/userlist.txt',(err, data)=>{
            if(err)
            return console.error(err);
            socket.emit('user list',data.toString().split('$'));
//            console.log('sendind data to update');
            
//            console.log(data.toString());
        });
    });
    socket.on('chat history',(connection)=>{
//        console.log(connection.toString()+' user')
        fs.readFile('./data/'+connection.toString()+'.txt',(err, data)=>{
            socket.emit('history',data.toString());
//            console.log(data.toString())
        });
    });
    socket.on('user chat',(message)=>{
        message=message.split(':');
        let isnull=false;
        fs.readFile('./data/'+message[0]+'.txt',(err, data)=>{
            if(err)
            console.error(err);
            if(data.toString()=='null')
            {isnull=true;
//                console.log(true);
            }
            else
            isnull=false;
        });
        if(isnull===true){
        fs.writeFile('./data/'+message[0]+'.txt',message[1],(err)=>{
            if(err)
            console.error(err);
        });}
        else{
            fs.appendFile('./data/'+message[0]+'.txt',message[1],(err)=>{
                if(err)
                console.error(err);
            });}
//        console.log(message[1])
    });
    socket.on('disconnect',()=>{
//        console.log("Socket.io disconnected");
    });
});
server.listen(3000,()=>{
//    console.log("Listening on port 3000");
});