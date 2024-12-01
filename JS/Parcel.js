$(document).ready(function(){
    GetParcelDetails();
    });
    function GetParcelDetails() {    
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
    
      function populateTable(parcels) {
        
        var tableBody = $('#Parcel');
    
       
        tableBody.empty();
       
        parcels.forEach(function(parcel) {
          var newRow = `<tr>
                          <td>${parcel.CUSTOMERID}</td>
                          <td>${parcel.COURIERID}</td>
                          <td>${parcel.COURIERSTATUS}</td>
                          <td>${GetFormatedDate(parcel.COURIERSTARTDATE)}</td>
                          <td>${GetFormatedDate(parcel.COURIERDELDATE)}</td>
                          <td>${parcel.COURIERAMOUNT}</td>
                          <td>${parcel.CUSTOMERADDRESS}</td>
                          <td>
                            <button class="btn btn-info" onclick="edit('${parcel.COURIERID}', '${parcel.COURIERSTATUS}', '${parcel.COURIERDELDATE}','${parcel.COURIERSTARTDATE}')">Edit</button>
                          </td>
                        </tr>`;
          tableBody.append(newRow);
        });
      }

      function GetFormatedDate(date){
        var foramtedDate = new Date(date);
        if (!isNaN(foramtedDate.getTime())) {
            return $.datepicker.formatDate('dd-M-yy', foramtedDate);
        }
      }

      function edit( id,status,delDate,startdate){
        const customerData =JSON.stringify({
            "id":id,
            "status":status,
            "delDate":delDate,
            "startdate":startdate
          });
          //save date to local storage (browser storage)
          localStorage.setItem("courierEditData",customerData);
          window.location.href="editCourier.html";
      }