var historyArray=[];
var chattingWith='';
function updateChange(){
    let sendbutton=document.getElementById('send-button');
    let searchbutton=document.getElementById('search-button');
//    console.log(screen.width, window.outerWidth);
    if(screen.width<820 || window.outerWidth<820)
    sendbutton.innerHTML="&#8605";
    else
    sendbutton.innerHTML="Send";
    if(screen.width<930 || window.outerWidth<930)
    searchbutton.innerHTML="<i class='fa fa-search'></i>";
    else
    searchbutton.innerHTML="Search";
};
 function update(){
    var socket=io();
     document.getElementsByTagName('body')[0].style.backgroundColor="green";
    document.getElementById('show-chat').style.display="none";
//    console.log('sending request to index')
}
function move(value){
    var socket=io();
    let chatHistory=document.getElementById('chat-history');
    document.getElementById('show-connections').style.display="none";
        document.getElementById('show-chat').style.display="";
        document.getElementsByTagName('body')[0].style.backgroundColor="rgb(42, 42, 184)";
        document.getElementById('input-box').focus();
        chattingWith=value;
        socket.emit('chat history',chattingWith);
        socket.on('history',(data)=>{
            data=data.toString();
//            console.log(data)
            if(data=='null')
            {document.getElementById('chat-history').innerHTML='';
            return;}
        chatHistory.innerHTML=data;            
        chatHistory.scrollTo(0, chatHistory.scrollHeight);
    });
//        console.log(chattingWith);
} 
(()=>{
    var socket=io();
   
    var history=document.getElementById('chat-history');
    var inputText=document.getElementById('input-box');
    var sendButton=document.getElementById('send-button');
    var backButton=document.getElementById('back-button');
    socket.on('mess',(message)=>{
        socket.emit('user chat',chattingWith+':'+'<div id="left-container"><p id="left">'+message+'</p></div>');
        history.innerHTML+='<div id="left-container"><p id="left">'+message+'</p></div>';
        history.scrollTo(0, history.scrollHeight);
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
        socket.emit('user chat',chattingWith+':'+'<div id="right-container"><p id="right">'+message+'</p></div>');
        history.innerHTML+='<div id="right-container"><p id="right">'+message+'</p></div>';
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
            socket.emit('user chat',chattingWith+':'+'<div id="right-container"><p id="right">'+message+'</p></div>');
            history.innerHTML+='<div id="right-container"><p id="right">'+message+'</p></div>';
            history.scrollTo(0, history.scrollHeight);
        }
    });
    backButton.addEventListener('click',()=>{
        document.getElementById('show-chat').style.display="none";
        document.getElementById('show-connections').style.display="flex";
        document.getElementsByTagName('body')[0].style.backgroundColor="darkgreen";
        document.getElementById('search-box').focus();
    });
    var addButton=document.getElementById('add-connection');
    addButton.addEventListener('click',()=>{
        document.getElementById('add-modal').style.display='block';
        document.getElementById('new-user-name').focus();
    });
    var searchButton=document.getElementById('search-button');
    searchButton.addEventListener('click',()=>{
    });
          
})();