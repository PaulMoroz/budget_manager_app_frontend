

try {

   document.addEventListener("DOMContentLoaded", ()=>{changeUserName()});


} catch {

}
export function changeUserName(){

     let name =JSON.parse(localStorage.getItem('user'))["name"]
     document.getElementById("user").innerHTML = name;
}