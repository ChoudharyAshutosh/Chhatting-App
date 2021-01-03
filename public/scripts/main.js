var historyArray=[];
 function update(){
    document.getElementsByTagName('body')[0].style.backgroundColor="green";
    document.getElementById('show-chat').style.display="none";
    document.getElementById('show-connections').style.display="flex";
    let sendbutton=document.getElementById('send-button');
    let searchbutton=document.getElementById('search-button');
    console.log(screen.width, window.outerWidth);
    if(screen.width<820 || window.outerWidth<820)
    sendbutton.innerHTML="&#8605";
    else
    sendbutton.innerHTML="Send";
    if(screen.width<930 || window.outerWidth<930)
    searchbutton.innerHTML="&#8605";
    else
    searchbutton.innerHTML="Search";
} 
(()=>{
    var socket=io();
   
    var history=document.getElementById('chat-history');
    var inputText=document.getElementById('input-box');
    var sendButton=document.getElementById('send-button');
    var backButton=document.getElementById('back-button');
    socket.on('mess',(message)=>{
        history.innerHTML="";
        historyArray.push('<div id="left-container"><p id="left">'+message+'</p></div>');
        historyArray.forEach((hist, index)=>{
            history.innerHTML+=hist;   
        });
    });
    sendButton.addEventListener("click",function(){
        var message=inputText.value;
        inputText.value="";
        if(message==="")
        return;
        let i=0;
        for(va of message){
            if(va===' ')
                i=i+1;
        } 
        if(i===message.length)
           return;
        
        socket.emit('mess',message);
        history.innerHTML="";
        historyArray.push('<div id="right-container"><p id="right">'+message+'</p></div>');
        historyArray.forEach((hist, index)=>{
            history.innerHTML+=hist; 
        });
        history.scrollTo(0, history.scrollHeight);
        inputText.focus();
    });
    inputText.addEventListener('keyup',(event)=>{
        if(event.keyCode===13){
            var message=inputText.value;
            
            inputText.value="";
            if(message==="")
            return;
              let i=0;
        for(va of message){
            if(va===' ')
                i=i+1;
        } 
        if(i===message.length)
           return;
        
            socket.emit('mess',message);
            history.innerHTML="";
            historyArray.push('<div id="right-container"><p id="right">'+message+'</p></div>');
            historyArray.forEach((hist, index)=>{
                history.innerHTML+=hist; 
            }); 
        }
        history.scrollTo(0, history.scrollHeight);
    });
    backButton.addEventListener('click',()=>{
        document.getElementById('show-chat').style.display="none";
        document.getElementById('show-connections').style.display="flex";
        document.getElementsByTagName('body')[0].style.backgroundColor="darkgreen";
        document.getElementById('search-box').focus();
    });
    var userChat=document.getElementsByClassName('user-chat-link')[0];
    userChat.addEventListener('click',()=>{
        document.getElementById('show-connections').style.display="none";
        document.getElementById('show-chat').style.display="";
        document.getElementsByTagName('body')[0].style.backgroundColor="rgb(42, 42, 184)";
    });
})();