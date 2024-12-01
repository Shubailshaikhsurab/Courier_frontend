var courierUpdateId;
$(document).ready(function(){
    SetCourierData()
});
function SetCourierData(){
    //Get data from local storage
    var data = localStorage.getItem("customerEditData");
    //Convert string to Json object 
    var customerJson = JSON.parse(data);

    courierUpdateId = customerJson.id;
    //sets value to textbox 
    $("#EditCustomerId").val(customerJson.id);
    $("#EditCustomerEmail").val(customerJson.email);
    $("#EditCustomerMobile").val(customerJson.mobile);
    $("#EditCustomerAddress").val(customerJson.address);
    
}
    function UpdateCustomer(){
      $.ajax({
          url: `http://localhost:3000/api/UpdateCustomer/${courierUpdateId}`,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({
        "CUSTOMERMOBILE":$("#EditCustomerMobile").val(),
          "CUSTOMEREMAIL":$("#EditCustomerEmail").val(),
          "CUSTOMERADDRESS":$("#EditCustomerAddress").val()}),
          success: function(response) {
            window.location.href = "Customer.html";
          },
          error: function(error) {
            console.error('Error updating user:', error);
          }
        });
    }