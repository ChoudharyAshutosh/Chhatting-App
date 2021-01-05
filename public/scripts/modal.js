(()=>{
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
            users.innerHTML+='<div class="user-chat-link" onclick="move();">'+name+'</div>';
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
            users.innerHTML+='<div class="user-chat-link" onclick="move();">'+name+'</div>';
        }
    });
    
    var signUser=document.getElementById('sign-user-button');
    signUser.addEventListener('click',()=>{
        signModel.style.display='none';
        document.getElementById('show-connections').style.display="flex";
    });
    window.addEventListener('click',(event)=> {
            if (event.target == addConnectionModel) {
                addConnectionModel.style.display = "none";
            }
        });

})();