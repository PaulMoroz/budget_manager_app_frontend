try{
    document.addEventListener("DOMContentLoaded", ()=>{try{showUserData()}catch {}});
}catch {

}
    function showUserData() {
        let name = JSON.parse(localStorage.getItem('user'))["name"];
        let email = JSON.parse(localStorage.getItem('user'))["email"];
        let password = JSON.parse(localStorage.getItem('user'))["password"];

            document.getElementById("registration-name").value = name;
            document.getElementById("registration-email").value = email;

    }
