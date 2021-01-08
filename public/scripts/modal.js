var userList=[];
(()=>{
    var socket=io();
     socket.emit('userlist update','vcxv');
     socket.on('user list',(message)=>{
        userList=message.toString().split(',');
        if(userList!='')
        userList.forEach(user => {
        if(user!='')
         document.getElementById('users').innerHTML+='<div class="user-chat-link" onclick="move(innerHTML);">'+user+'</div>'
        });
    });
    var addConnectionModel=document.getElementById('add-modal');
    var signModel=document.getElementById('sign-modal');
        var closeAddconnectionModal=document.getElementsByClassName('close')[0];
        closeAddconnectionModal.addEventListener('click',()=>{
            addConnectionModel.style.display='none';
        });
    var cancelAddconnectionModal=document.getElementsByClassName('cancel')[0];
        cancelAddconnectionModal.addEventListener('click',()=>{
            addConnectionModel.style.display='none';
        });    
    var addUser=document.getElementById('add-user-button');
    addUser.addEventListener('click',()=>{
           var name=document.getElementById('new-user-name').value;
            document.getElementById('new-user-name').value="";
            addConnectionModel.style.display='none';
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
            users.innerHTML+='<div class="user-chat-link" onclick="move(innerHTML);">'+name+'</div>';
                userList.push(name);
            socket.emit('new user',userList);
    });
    var newUser=document.getElementById('new-user-name');
    newUser.addEventListener('keyup',(event)=>{
        if(event.keyCode==13){
        var name=newUser.value;
            newUser.value="";
            addConnectionModel.style.display='none';
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
            users.innerHTML+='<div class="user-chat-link" onclick="move(innerHTML);">'+name+'</div>';
            userList.push(name);
            socket.emit('new user',userList);
        }
    });
    var loginName=document.getElementById('login-user-name');
    var loginPassword=document.getElementById('login-user-password');
    var uniqueId=document.getElementById('unique-id');
    var loggingUserName="";
    var loggingUserPassword="";    
    loginName.addEventListener('keyup',()=>{
            if(event.keyCode==13){
                let name=loginName.value;
                    if(name==='')
                    return;
                    let i=0;
                    for(va of name){
                        if(va===' ')
                            i=i+1;
                    } 
                    if(i===name.length)
                       return;
                    loggingUserName=name;
                    uniqueId.focus();
                    }
        });
        uniqueId.addEventListener('keyup',()=>{
            if(event.keyCode==13){
                let id=uniqueId.value;
                    if(id==='')
                    return;
                    let i=0;
                    for(va of id){
                        if(va===' ')
                            i=i+1;
                    } 
                    if(i===id.length)
                       return;
                    socket.emit('unique-id',id);
                       loginPassword.focus();
                    }
        });
    loginPassword.addEventListener('keyup',()=>{
        if(event.keyCode==13){
            let password=loginPassword.value;
                if(password==='')
                return;
                let i=0;
                for(va of password){
                    if(va===' ')
                        i=i+1;
                } 
                if(i===password.length)
                   return;
                loggingUserPassword=password;
                if(loggingUserName === 'administrator' && loggingUserPassword === 'administrator')
                   {
                    signModel.style.display='none';
                    document.getElementById('show-connections').style.display='flex';
                   }
                else{
                    alert('Please enter valid user name & password.');
                    loginName.value="";
                    loginPassword.value="";
                    uniqueId.value="";
                    loginName.focus();
                }
                
                }
    });
    var signUser=document.getElementById('sign-user-button');
    signUser.addEventListener('click',()=>{
        let loggingUserName=loginName.value;
        let loggingUserPassword=loginPassword.value;
        if(loggingUserName === 'administrator' && loggingUserPassword === 'administrator')
               {     signModel.style.display='none';
                    document.getElementById('show-connections').style.display='flex';
                }
        else{
            alert('Please enter valid user name & password.');
            loginName.value="";
            loginPassword.value="";
            uniqueId='';
            loginName.focus();
        }
    });
    window.addEventListener('click',(event)=> {
            if (event.target == addConnectionModel) {
                addConnectionModel.style.display = "none";
            }
        });
        var searchButton=document.getElementById('search-button');
        var searchBar=document.getElementById('search-box');
        searchButton.addEventListener('click',()=>{
            let searched=searchBar.value;
            let deleteIndex=-1;
            searchBar.value='';
            userList.forEach((value, index)=>{
                if(value==searched)
                deleteIndex=index;
            });
            if(deleteIndex != -1){
                userList.splice(deleteIndex,1);
                userList.push(searched);
                document.getElementById('users').innerHTML='';
                userList.forEach(user => {
                    if(user!='')
                     document.getElementById('users').innerHTML+='<div class="user-chat-link" onclick="move(innerHTML);">'+user+'</div>'
                    });          
                socket.emit('new user',userList);            
            }
            else
            alert('Not found')
        });
    searchBar.addEventListener('keyup',(event)=>{
        if(event.keyCode===13){
            let searched=searchBar.value;
            let deleteIndex=-1;
            searchBar.value='';
            userList.forEach((value, index)=>{
                if(value==searched)
                deleteIndex=index;
            });
            if(deleteIndex != -1){
                userList.splice(deleteIndex,1);
                userList.push(searched);
                document.getElementById('users').innerHTML='';
                userList.forEach(user => {
                    if(user!='')
                     document.getElementById('users').innerHTML+='<div class="user-chat-link" onclick="move(innerHTML);">'+user+'</div>'
                    });          
                socket.emit('new user',userList);            
            }
            else
            alert('Not found')
        }
    });
})();