var courierUpdateId;

$(document).ready(function(){
    SetCourierData();  
});

function SetCourierData(){
    // Get data from local storage
    var data = localStorage.getItem("courierEditData");
    // Convert string to JSON object 
    var courierJson = JSON.parse(data);

    courierUpdateId = courierJson.id;
    // Sets value to textbox 
    $("#EditCourierId").val(courierJson.id);

    $("#EditCourierDeliveryDate").val(GetFormatedDate(courierJson.delDate));

    $("#EditCourierStartDate").val(GetFormatedDate(courierJson.startdate));
    $("#EditCourierStatus").val(courierJson.status);
}

function UpdateCourier() {
    $.ajax({
        url: `http://localhost:3000/api/UpdateCourier/${courierUpdateId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            "COURIERSTATUS": $("#EditCourierStatus").val(),
            "COURIERDELDATE": $("#EditCourierDeliveryDate").val()
        }),
        success: function(response) {
            console.log(response);
            window.location.href = "Parcels.html";
        },
        error: function(error) {
            console.error('Error updating user:', error);
        }
    });
}

function GetFormatedDate(date){
    var foramtedDate = new Date(date);
    if (!isNaN(foramtedDate.getTime())) {
        return $.datepicker.formatDate('yy-mm-dd', foramtedDate);
    }
  }


