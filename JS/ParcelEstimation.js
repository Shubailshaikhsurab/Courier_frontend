let courierCost, UpdateCourierCostId;
$(document).ready(function(){
    GetCourierCost()
});

function GetCourierCost(){
    $.ajax({
        url: `http://localhost:3000/api/GetCourierCost/`,
        method: 'GET',
        success: function(response) {
          
            courierCost = response;
            populateTable(response);
            courierCostTypeDropDown();
        },
        error: function(error) {
          console.error('Error checking username availability:', error);
        }
      });
}

function populateTable(courierCosts) {
        
    var tableBody = $('#courierCost');

   
    tableBody.empty();
   
    courierCosts.forEach(function(courierCost) {
      var newRow = `<tr>
                      <td>${courierCost.CourierType}</td>
                      <td>${courierCost.CourierCost}</td>
                      <td>
                        <button class="btn btn-info" onclick="edit('${courierCost.CourierCostID}')">Edit</button>
                      </td>
                    </tr>`;
      tableBody.append(newRow);
    });
  }

  function edit(id){
    $('#divCal').css("position","relative");
    $('#UpdateCourierCost').prop("hidden",false);
    UpdateCourierCostId = id;
    var courierCostType = courierCost.find(function(item){
      return item.CourierCostID == id;
    });
    $('#EditCourierType').val(courierCostType.CourierType);
    $('#EditCourierCost').val(courierCostType.CourierCost);
  }

  function Calculate(){
    var cost=$('#CourierCost').text();
    var weight = $('#parcelWeight').val();
    var totalAmount = cost * weight;

    // Round the totalAmount to two decimal places
    var roundedAmount = totalAmount.toFixed(2);

    // Display the result with only two digits after the decimal point
    $('#CalculatedAmount').text("Total " + roundedAmount);
  }

  function courierCostTypeDropDown(){
    var option = $('#CourierCostType');
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

  function OnChangeCourierCost(element){
    var selectedValue = element.value;
    var cost = courierCost.find(function(item){
      return item.CourierCostID == selectedValue;
    });
    
   $('#CourierCost').text(cost.CourierCost);
   Calculate();
  }

function NewCourierCost(){
const data= {
  CourierType : $('#CourierType').val(),
 CourierCost : $('#NewCourierCost').val()
}
  $.ajax({
    url: 'http://localhost:3000/api/NewCourierCost',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(response) {
      console.log('Data uploaded successfully:', response);
      window.location.href="ParcelEstimation.html";
      
    },
    error: function(error) {
      console.error('Error uploading data:', error);
      
    }
  });
}

function UpdateCourierCost(){
  $.ajax({
    url: `http://localhost:3000/api/UpdateCourierCost/${UpdateCourierCostId}`,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
        "CourierCost":  $('#EditCourierCost').val(),
       
    }),
    success: function(response) {
        console.log(response);
        window.location.href = "ParcelEstimation.html";
    },
    error: function(error) {
        console.error('Error updating user:', error);
    }
});
}