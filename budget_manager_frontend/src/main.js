import {index} from "./login";
import { Chart, LineController, DoughnutController, LineElement, ArcElement,
    PointElement, LinearScale, Title } from "chart.js"

import {checkField} from "./functions";

try{
    document.getElementById('transaction_value').addEventListener('input',()=>{
        checkField( RegExp(/^[0-9]+$/),'transaction_value');
    });
}catch {

}

try {
    document.addEventListener("DOMContentLoaded", ()=>{setDate()});
   document.addEventListener("DOMContentLoaded", ()=>{changeUserName()});
   document.addEventListener("DOMContentLoaded", ()=>{showTransactions()});
   document.addEventListener("DOMContentLoaded", ()=>{showCategory()});
   document.getElementById("add_transaction_button").addEventListener("click",()=>{addTransaction()});
   document.getElementById("add_transaction_button").addEventListener("click",()=>{showTransactions()});
   document.getElementById("add-transaction-expense").addEventListener("click",()=>{showCategory()});
   document.getElementById("add-transaction-income").addEventListener("click",()=>{showCategory()});
   document.getElementById("add_category").addEventListener("click",()=>{addCategoryPop()});
   document.getElementById("user").addEventListener("click",()=>{goToUserWindow()})
} catch {

}
try {
    var categoryPopup = document.getElementById("categoryPopup");
    var categoryPopupClose = document.getElementsByClassName("close")[0];

    categoryPopupClose.onclick = function () {
        categoryPopup.style.display = "none";
    }


}catch {

}

export function addCategoryPop() {
        categoryPopup.style.display = "block";
    }

export function goToUserWindow() {
        window.location.replace("usersettings.html");
    }

export function setDate(){
    try {
        document.getElementById("date-from").value = '2000-01-01';
        document.getElementById("date-to").value = '2030-01-01';
    }catch{
    }
}
export function addTransaction(){
    let transac_value =  document.getElementById("transaction_value").value;
    let transac_name = document.getElementById("transaction_name").value;

    document.getElementById("transaction_value").value =0;
    document.getElementById("transaction_name").value = '';

    let type;
    if(transac_value*1<=0){
        return;
    }
    let id = JSON.parse(localStorage.getItem('user'))["id"]
    if(document.getElementById("add-transaction-income").checked){
        type=1;
    }
    else if(document.getElementById("add-transaction-expense").checked){
        type =0;
    }

    let xmlHttp = new XMLHttpRequest();
    let theUrl = `http://localhost:63342/transaction`;
    xmlHttp.open( "POST", theUrl, false );

    var e = document.getElementById("category_select");
    var category_id = e.options[e.selectedIndex].value;

    var data = JSON.stringify({"category_id":parseInt(category_id) , "amount":parseInt(transac_value) ,
                                    "description":transac_name});
    xmlHttp.send(data);

}

export function showCategory(){
    try {
        document.getElementById("category_select").innerHTML = ``;
    }catch{}
    let id = JSON.parse(localStorage.getItem('user'))["id"]

    let xmlHttp = new XMLHttpRequest();
    let theUrl = `http://localhost:63342/category?user_id=${id}`;

    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );

    if(xmlHttp.status==200){
        var data = JSON.parse(xmlHttp.responseText);

    }

    for (var i=0; i<data.length; i++){

        if(document.getElementById("add-transaction-income").checked&& parseInt(data[i]["type"])==1)
            document.getElementById("category_select").innerHTML+=`<option value="${data[i]["id"]}">
                            ${data[i]["name"]}
                        </option>`;
        else if(document.getElementById("add-transaction-expense").checked&&parseInt(data[i]["type"])==0){
            document.getElementById("category_select").innerHTML+=`<option value="${data[i]["id"]}">
                            ${data[i]["name"]}
                        </option>`;
        }

    }
    return xmlHttp.responseText;
}
export function showTransactions(){

    document.getElementById("transaction-list").innerHTML=``;

    console.log("works");
    let id = JSON.parse(localStorage.getItem('user'))["id"]
    let color;


    let start_date = document.getElementById("date-from").value;
    let end_date = document.getElementById("date-to").value;


    let xmlHttp = new XMLHttpRequest();
    let theUrl =`http://localhost:63342/transaction?user_id=${id}&start_date=${start_date}&end_date=${end_date}`
    xmlHttp.open( "GET", theUrl, false )
    xmlHttp.send( null );

    if(xmlHttp.status==200){
        var data = JSON.parse(xmlHttp.responseText);
    }

    for (var i=0; i<data.length; i++){
        if(data[i]["type"]=="expense"){
            color ='rgba(255, 99, 132, 0.5)'
        }else if (data[i]["type"]=="income"){
            color ='rgba(30, 255, 140, 0.5)'
        }

        var html = `<div class="transaction-item">\n` +
        `            <span class="transaction-description"> ${data[i]["description"]} </span>\n` +
        `            <div class="type-line" style="background:${color}"></div>\n` +
        `            <span class="transaction-amount">${data[i]["amount"]}</span>\n` +
        `        </div>`;
        document.getElementById("transaction-list").innerHTML+=html;
    }
    return xmlHttp.responseText;
}
export function changeUserName(){
    let name = JSON.parse(localStorage.getItem('user'))["name"]
     document.getElementById("user").innerHTML = name;
}
export function drawPiechart(){
    var countries= document.getElementById("myChart").getContext("2d");
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, DoughnutController,ArcElement);
    new Chart(countries,{
  type: 'doughnut',
  data: {
    labels: ['OK', 'WARNING', 'CRITICAL', 'UNKNOWN'],
    datasets: [{
      label: '# of Tomatoes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
   	//cutoutPercentage: 40,
    responsive: false,

  }
});
}



// Get the context of the canvas element we want to select
