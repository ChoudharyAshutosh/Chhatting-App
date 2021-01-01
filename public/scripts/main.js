var historyArray=[];
(()=>{
    var socket=io();
   
    var history=document.getElementById('chat-history');
    var inpuText=document.getElementById('input-box');
    var sendButton=document.getElementById('send-button');
    socket.on('mess',(message)=>{
        history.innerHTML="";
        historyArray.push('<div id="left-container"><p id="left">'+message+'</p></div>');
        historyArray.forEach((hist, index)=>{
            history.innerHTML+=hist;   
        });
    });
    sendButton.addEventListener("click",function(){
        var message=inpuText.value;
        inpuText.value="";
        socket.emit('mess',message);
        history.innerHTML="";
        historyArray.push('<div id="right-container"><p id="right">'+message+'</p></div>');
        historyArray.forEach((hist, index)=>{
            history.innerHTML+=hist; 
        });
    });
    
})();