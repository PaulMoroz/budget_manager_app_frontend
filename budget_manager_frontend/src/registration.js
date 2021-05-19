import { checkField, checkPassword, checkConfirmationPassword}  from './functions';
import {login} from "./login";


try{
    document.getElementById('registration-name').addEventListener('input',()=>{
        checkField( RegExp(/^[A-Za-z]+$/),'registration-name','registration-name-error');
    });
    document.getElementById('registration-email').addEventListener('input',()=>{
        checkField(RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),'registration-email','registration-email-error');
    });
    document.getElementById('registration-password').addEventListener('input',()=>{
        checkField(RegExp(/^.{8,12}$/s),'registration-password','registration-password-error');
    });
    document.getElementById('registration-confirm-password').addEventListener('input',()=>{
        checkConfirmationPassword('registration-password','registration-confirm-password','registration-confirm-error');
    });
}catch {

}
export function register(){
    console.log("works");
    let name =document.getElementById("registration-name").value;
    let email = document.getElementById("registration-email").value;
    let password = document.getElementById("registration-password").value;

    let xmlHttp = new XMLHttpRequest();

    let theUrl =`http://localhost:63342/user`;

    xmlHttp.open( "POST", theUrl, false );

    var data = JSON.stringify({"email": email, "password": password,
                                    "name":name,"balance":0});

    xmlHttp.send(data);

    if(xmlHttp.status==201){
        window.location.replace("index.html");
    }

}
try{
    document.getElementById("register_button").addEventListener("click",()=>{register()});
}catch {
    
}
