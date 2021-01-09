var userList=[];
(()=>{
    var socket=io();
     socket.emit('userlist update','vcxv');
     socket.on('user list',(message)=>{
        userList=message.toString().split(',');
        if(userList!='')
        userList.forEach(user => {
        if(user!='')
         document.getElementById('users').innerHTML+='<div class="user-chat-link-container"><div class="user-chat-link" onclick="move(innerHTML);">'+user+'</div><button class="button delete-button" onclick="deleteConnection(value)" value='+user+'><i class="fa fa-trash"></button></div>';
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
            if(name==='')
            {newUser.focus();
                return;}
            for(va of name){
                if((va.charCodeAt()<64 || va.charCodeAt()>90) && (va.charCodeAt()<97 || va.charCodeAt()>122)&&(va.charCodeAt()<48 || va.charCodeAt()>57))
                    { newUser.focus();
                    return;}
                
            } 
            addConnectionModel.style.display='none';
            let users=document.getElementById('users');
            users.innerHTML+='<div class="user-chat-link-container"><div class="user-chat-link" onclick="move(innerHTML);">'+name+'</div><button class="button delete-button" onclick="deleteConnection(value)" value='+name+'><i class="fa fa-trash"></button></div>';
                userList.push(name);
            socket.emit('new user',userList);
    });
    var newUser=document.getElementById('new-user-name');
    newUser.addEventListener('keyup',(event)=>{
        if(event.keyCode==13){
        var name=newUser.value;
            newUser.value="";
            if(name==='')
            {newUser.focus();return;}
            let i=0;
            for(va of name){
                if((va.charCodeAt()<64 || va.charCodeAt()>90) && (va.charCodeAt()<97 || va.charCodeAt()>122)&&(va.charCodeAt()<48 || va.charCodeAt()>57))
                    {return;}
                
            }
            addConnectionModel.style.display='none'; 
            let users=document.getElementById('users');
            users.innerHTML+='<div class="user-chat-link-container"><div class="user-chat-link" onclick="move(innerHTML);">'+name+'</div><button class="button delete-button" onclick="deleteConnection(value)" value='+name+'><i class="fa fa-trash"></button></div>';
            userList.push(name);
            socket.emit('new user',userList);
        }
    });
    var loginName=document.getElementById('login-user-name');
    var loginPassword=document.getElementById('login-user-password');
    var uniqueId=document.getElementById('unique-id');
    var loggingUserName="";
    var loggingUserPassword="";
    var loggingUserid='';    
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
                    if(id=='')
                    {uniqueId.focus();
                        return;
            
                    }       
                    for(va of id){
                        if((va.charCodeAt()<64 || va.charCodeAt()>90) && (va.charCodeAt()<97 || va.charCodeAt()>122)&&(va.charCodeAt()<48 || va.charCodeAt()>57))
                            { uniqueId.value='';
                            uniqueId.focus();
                            return;}
                        }
                    socket.emit('unique-id',id);
                    loggingUserid=id;
                       loginPassword.focus();
                    }
        });
    loginPassword.addEventListener('keyup',()=>{
        if(event.keyCode==13){
            let password=loginPassword.value;
            loggingUserName=loginName.value;
            loggingUserid=uniqueId.value;
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
                if(loggingUserid=='')
        {uniqueId.focus();
            return;}       
        for(va of loggingUserid){
            if((va.charCodeAt()<64 || va.charCodeAt()>90) && (va.charCodeAt()<97 || va.charCodeAt()>122)&&(va.charCodeAt()<48 || va.charCodeAt()>57))
                { uniqueId.value='';
                uniqueId.focus();
                return;}
            }
                if(loggingUserName === 'administrator' && loggingUserPassword === 'administrator')
                   {
                    signModel.style.display='none';
                    document.getElementById('show-connections').style.display='flex';
                    document.getElementById('welcome-heading').innerHTML+= ' '+loggingUserid;   
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
        let loggingUserid=uniqueId.value;
        if(loggingUserid=='')
        {uniqueId.focus();
            return;

        }       
        for(va of loggingUserid){
            if((va.charCodeAt()<64 || va.charCodeAt()>90) && (va.charCodeAt()<97 || va.charCodeAt()>122)&&(va.charCodeAt()<48 || va.charCodeAt()>57))
                { uniqueId.value='';
                uniqueId.focus();
                return;}
            }
        
        if(loggingUserName === 'administrator' && loggingUserPassword === 'administrator')
               {     signModel.style.display='none';
                    document.getElementById('show-connections').style.display='flex';
                    document.getElementById('welcome-heading').innerHTML+= ' '+loggingUserid;
                }
        else{
            alert('Please enter valid user name & password.');
            loginName.value="";
            loginPassword.value="";
            uniqueId.value='';
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
                    document.getElementById('users').innerHTML+='<div class="user-chat-link-container"><div class="user-chat-link" onclick="move(innerHTML);">'+user+'</div><button class="button delete-button" onclick="deleteConnection(value)" value='+user+'><i class="fa fa-trash"></button></div>';
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
                    document.getElementById('users').innerHTML+='<div class="user-chat-link-container"><div class="user-chat-link" onclick="move(innerHTML);">'+user+'</div><button class="button delete-button" onclick="deleteConnection(value)" value='+user+'><i class="fa fa-trash"></button></div>';
                    });          
                socket.emit('new user',userList);            
            }
            else
            alert('Not found')
        }
    });
})();