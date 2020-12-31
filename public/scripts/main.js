var historyArray=[];
(()=>{
    var socket=io();
   
    var history=document.getElementById('chat-history');
    var inpuText=document.getElementById('input-box');
    var sendButton=document.getElementById('send-button');
    socket.on('mess',(message)=>{
        history.innerHTML="";
        historyArray.unshift('<p id="left">'+message+'</p>');
        historyArray.forEach((hist, index)=>{
            history.innerHTML+=hist;   
        });
    });
    sendButton.addEventListener("click",function(){
        var messgae=inpuText.value;
        inpuText.value="";
        socket.emit('mess',messgae);
        historyArray.shift('<p id="right">'+message+'</p>');
        historyArray.forEach((hist, index)=>{
                history.innerHTML+=hist;
        });
    });
    
})();