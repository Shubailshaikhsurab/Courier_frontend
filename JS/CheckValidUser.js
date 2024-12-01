$(document).ready(function(){
    var loginValue = localStorage.getItem("login");
   
    if(loginValue == 0 || loginValue == undefined || loginValue == null){
        window.location.href= "Login.html";
    }
});

function Logout(){
    localStorage.clear();
    window.location.href= "Login.html";
}