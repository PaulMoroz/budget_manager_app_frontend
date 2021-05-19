import { checkField, checkPassword, checkConfirmationPassword}  from './functions';


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
