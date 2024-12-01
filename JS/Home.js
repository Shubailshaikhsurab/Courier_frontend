function searchCourier(){
    var courierId = $('#courierId').val();
    $("#trackParcel").css("display","none");
    // hide incorrect message 
    $("#CourierIdError").prop("hidden",true);
    $.ajax({
        url: `http://localhost:3000/api/SearchCourier?courierId=${courierId}`,
        method: 'GET',
        success: function (response) {
           
            $("#status").text(response.COURIERSTATUS);
            var startDateString = response.COURIERSTARTDATE;
            var deliveryDateString = response.COURIERDELDATE;
           
            var startDate = new Date(startDateString);
            var delDate = new Date(deliveryDateString);
            
            if (!isNaN(startDate.getTime())) {
                
                var startDate = $.datepicker.formatDate('dd-M-yy', startDate);
                 var delDate = $.datepicker.formatDate('dd-M-yy', delDate);
               
                
                $("#startDate").text(startDate);
                 $("#deliveryDate").text(delDate);
                 $("#trackParcel").css("display","block");
            } else {
                console.error('Invalid date format:', startDateString);
            }
        },
        error: function (error) {
           //show/display  incorrect message 
           $("#CourierIdError").prop("hidden",false);
            console.log(error);
        }
    });
}    

function Login() {
    window.location.href="Login.html";
}