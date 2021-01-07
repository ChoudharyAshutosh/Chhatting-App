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
var uniqueKey;
var client=mqtt.connect("mqtt:localhost:1883");
client.on('connect',()=>{
 });
io.on('connection',(socket)=>{
//    console.log("Socket.io connected");
    client.on('message',(topic, mess)=>{
        mess=mess.toString().split('$');
        if(mess[1]!=uniqueKey)
        socket.emit('mess',mess[0].toString());
    });
    socket.on('mess',(message)=>{
        message=message.split(':');
        client.publish(message[0],message[0]+':'+message[1]+'$'+uniqueKey,(err)=>{
            if(err)
            console.error(err)
        });
    });
    socket.on('unique-key',(key)=>{
        uniqueKey=key;
    });
    socket.on('new user',(message)=>{
        fs.writeFile('./data/userlist.txt',message,(err)=>{
            if(err){
                return console.error(err);
            }
        });
        let list=message.toString().split(',');
        client.subscribe(list[list.length-1],err=>{
            if(err)
            console.error(err);
        });
        fs.writeFile('./data/'+list[list.length-1]+'.txt','',(err)=>{
            if(err)
            console.error(err);
        });    
    });
    socket.on('userlist update',(message)=>{
        fs.readFile('./data/userlist.txt',(err, data)=>{
            if(err)
            return console.error(err);
            let users=data.toString().split(',');
            users.forEach(user=>{
                if(user!='')
                client.subscribe(user,(err)=>{
                    if(err)
                    console.error(err)
                });
            });
            socket.emit('user list',data.toString());
        });
    });
    socket.on('chat history',(connection)=>{
        fs.readFile('./data/'+connection.toString()+'.txt',(err, data)=>{
            socket.emit('history',data.toString());
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
    });
    socket.on('disconnect',()=>{
    });
});
server.listen(3000,()=>{
//    console.log("Listening on port 3000");
});