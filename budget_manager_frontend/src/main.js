

try {

   document.addEventListener("DOMContentLoaded", ()=>{changeUserName()});
   document.addEventListener("DOMContentLoaded", ()=>{addTransactions()});

} catch {

}
export function addTransactions(){
    //document.getElementById("transaction-list").innerHTML='';
    var html = '<div class="transaction-item">\n' +
        '            <span class="transaction-description">Купив картоплі</span>\n' +
        '            <div class="type-line"></div>\n' +
        '            <span class="transaction-amount">370₴</span>\n' +
        '        </div>';
    for (var i=0; i<100; i++){
        document.getElementById("transaction-list").innerHTML+=html;
    }
    document.styleSheets.reload();
}
export function changeUserName(){

     let name =JSON.parse(localStorage.getItem('user'))["name"]
     document.getElementById("user").innerHTML = name;
}
