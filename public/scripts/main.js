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
    searchbutton.innerHTML="<i class='fa fa-search'></i>";
    else
    searchbutton.innerHTML="Search";
}
function move(){
    document.getElementById('show-connections').style.display="none";
        document.getElementById('show-chat').style.display="";
        document.getElementsByTagName('body')[0].style.backgroundColor="rgb(42, 42, 184)";
        inputText.focus();
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
        inputText.focus();
    });
    var addButton=document.getElementById('add-connection');
    addButton.addEventListener('click',()=>{
        document.getElementById('add-modal').style.display='block';
        document.getElementById('new-user-name').focus();
    });
    var searchButton=document.getElementById('search-button');
    searchButton.addEventListener('click',()=>{
       
    });
    var modal=document.getElementById('add-modal');
    var close=document.getElementsByClassName('close')[0];
        close.addEventListener('click',()=>{
            modal.style.display='none';
        });
    var cancel=document.getElementsByClassName('cancel')[0];
        cancel.addEventListener('click',()=>{
            modal.style.display='none';
        });
    var addUser=document.getElementById('add-user-button');
    addUser.addEventListener('click',()=>{
           var name=document.getElementById('new-user-name').value;
            document.getElementById('new-user-name').value="";
            modal.style.display='none';
            if(name==='')
            return;
            let i=0;
            for(va of name){
                if(va===' ')
                    i=i+1;
            } 
            if(i===name.length)
               return;
            let users=document.getElementById('users');
            users.innerHTML+='<div class="user-chat-link" onclick="move();">'+name+'</div>';
    });
    var newUser=document.getElementById('new-user-name');
    newUser.addEventListener('keyup',(event)=>{
        if(event.keyCode==13){
        var name=newUser.value;
            newUser.value="";
            modal.style.display='none';
            if(name==='')
            return;
            let i=0;
            for(va of name){
                if(va===' ')
                    i=i+1;
            } 
            if(i===name.length)
               return;
            let users=document.getElementById('users');
            users.innerHTML+='<div class="user-chat-link" onclick="move();">'+name+'</div>';
        }
    });
    window.addEventListener('click',(event)=> {
            if (event.target == document.getElementById('add-modal')) {
              document.getElementById('add-modal').style.display = "none";
            }});
          
})();