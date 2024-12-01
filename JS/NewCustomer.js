$(document).ready(function(){
    GenerateCustomerAndCourierID();
    GetCourierCost();
    $("#btnCalc").on("click",function(){
      Calculate()
    });
});
function GenerateCustomerAndCourierID(){
    var courierId = generateUniqueNumber();
    var customerId = generateUniqueNumber();
    $("#NewCustomerId").val(customerId);
    $("#NewCourierId").val(courierId);
}

function generateUniqueNumber() {
    return Math.floor(100000 + Math.random() * 999999);
}

function NewCustomer(){
    const data = {
        CUSTOMERID:$("#NewCustomerId").val(),
        CUSTOMERNAME:$("#NewCustomerName").val(),
        CUSTOMERMOBILE: $('#NewCustomerMobile').val(),
        CUSTOMEREMAIL: $('#NewCustomerEmail').val(),
        CUSTOMERADDRESS: $('#NewCustomerAddress').val(),
        COURIERSTATUS: $('#NewCourierStatus').val(),
        COURIERSTARTDATE: $('#NewCourierStartDate').val(),
        COURIERDELDATE: $('#NewCourierDeliveryDate').val(),
        COURIERID:$("#NewCourierId").val(),
        COURIERAMOUNT:$("#CalculatedAmount").text()
      };
      $.ajax({
        url: 'http://localhost:3000/api/insertCourierAndCustomer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
          console.log('Data uploaded successfully:', response);
          window.location.href="Customer.html";
          
        },
        error: function(error) {
          console.error('Error uploading data:', error);
          
        }
      });
}

function GetCourierCost(){
  $.ajax({
      url: `http://localhost:3000/api/GetCourierCost/`,
      method: 'GET',
      success: function(response) {
        localStorage.setItem("CourierCostData",JSON.stringify(response));
          courierCost = response;
          courierCostTypeDropDown();
      },
      error: function(error) {
        console.error('Error checking username availability:', error);
      }
    });
}
function courierCostTypeDropDown(){
  var option = $('#CourierCostType');
  courierCost = JSON.parse(localStorage.getItem("CourierCostData"));
  if (courierCost && courierCost.length > 0) {
    $.each(courierCost, function (index, item) {

      option.append(
        $("<option>", {
          value: item.CourierCostID,
          text: item.CourierType,
        })
      );
    });
  }
}

function OnChangeCourierCost(){
  var selectedValue = $("#CourierCostType").val();
  var cost = courierCost.find(function(item){
    return item.CourierCostID == selectedValue;
  });
  
 $('#CourierCost').text(cost.CourierCost);
 Calculate()
}

function Calculate(){
  var cost=$('#CourierCost').text();
  var weight = $('#parcelWeight').val();
  var totalAmount = cost * weight;

  // Round the totalAmount to two decimal places
  var roundedAmount = totalAmount.toFixed(2);

  // Display the result with only two digits after the decimal point
  $('#CalculatedAmount').text(roundedAmount);
}