$(document).ready(function(){
    GetCustomerDetails();
    });
    function GetCustomerDetails() {    
        $.ajax({
          url: `http://localhost:3000/api/GetCustomerAndCourier/`,
          method: 'GET',
          success: function(response) {
            populateTable(response);
          },
          error: function(error) {
            console.error('Error checking username availability:', error);
          }
        });
      }
    
      function populateTable(Customers) {
        
        var tableBody = $('#Customer');
    
       
        tableBody.empty();
       
        Customers.forEach(function(Customer) {
          var newRow = `<tr>
                          <td>${Customer.CUSTOMERID}</td>
                          <td>${Customer.COURIERID}</td>
                          <td>${Customer.CUSTOMERNAME}</td>
                          <td>${Customer.CUSTOMERMOBILE}</td>
                          <td>${Customer.CUSTOMEREMAIL}</td>
                          <td>${Customer.CUSTOMERADDRESS}</td>
                          <td>
                            <button class="btn btn-info" onclick="edit('${Customer.CUSTOMERID}', '${Customer.CUSTOMERMOBILE}', '${Customer.CUSTOMEREMAIL}', '${Customer.CUSTOMERADDRESS}')">Edit</button>
                          </td>
                        </tr>`;
          tableBody.append(newRow);
        });
      }
function edit(id, mobile,email,address){
  //Create json object and convert into string
  const customerData =JSON.stringify({
    "id":id,
    "mobile":mobile,
    "email":email,
    "address":address
  });
  //save date to local storage (browser storage)
  localStorage.setItem("customerEditData",customerData);
  window.location.href="editCustomer.html";
}
    