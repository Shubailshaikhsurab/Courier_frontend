$(document).ready(function(){
    var loginValue = localStorage.getItem("login");
    if(loginValue == 1 ){
        window.location.href= "Parcels.html";
    }
});

function ValidateUser(){
    const userName = $("#username").val();
    const password = $("#password").val();
    $.ajax({
        url: `http://localhost:3000/api/login?UserName=${userName}&Password=${password}`,
        method: 'GET',
        success: function(response) {
            localStorage.setItem("login",response.userCount);
            if(response.userCount==1){
                $("#LoginError").prop("hidden",true);
                localStorage.setItem("login",response.userCount)
                window.location.href="Parcels.html";
            }else{
                $("#LoginError").prop("hidden",false);
            }
           
         console.log(response);
        },
        error: function(error) {
            $("#LoginError").prop("hidden",false);
          console.error( error);
        }
      }); 
}

function Home(){
    window.location.href="Home.html";
}