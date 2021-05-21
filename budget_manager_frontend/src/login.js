const t = 1;
class User{
    constructor(name, email,password,balance,id) {
        this.name=name;
        this.email = email;
        this.password =password;
        this.balance = balance;
        this.id =id;
  }
}
let user;
export function index(){

    let name = document.getElementById("login-name").value;
    let password = document.getElementById("login-password").value;

    let xmlHttp = new XMLHttpRequest();

    let theUrl =`http://localhost:63342/user?email=${name}&password=${password}`

    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request


    xmlHttp.send( null );
    if(xmlHttp.status==200){
        window.location.replace("main.html");
        var data = JSON.parse(xmlHttp.responseText);
        user = new User(data["name"],data["email"],data["password"],data["balance"],data["id"]);
        console.log(user.name,user.email,user.balance)
    }
    localStorage.setItem('user',JSON.stringify(user));
    return xmlHttp.responseText;
}
try {
    document.getElementById("login_button").addEventListener("click",()=>{index()});

} catch {

}



