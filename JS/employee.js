$(document).ready(function(){
GetUserDetails();
});
function GetUserDetails() {    
    $.ajax({
      url: `http://localhost:3000/api/GetUsers`,
      method: 'GET',
      success: function(response) {
        populateTable(response);
      },
      error: function(error) {
        console.error('Error checking username availability:', error);
      }
    });
  }

  function populateTable(users) {
    
    var tableBody = $('#userTableBody');

   
    tableBody.empty();
   
    users.forEach(function(user) {
      var newRow = `<tr>
                      <td>${user.FIRSTNAME} ${user.LASTNAME}</td>
                      <td>${user.USERNAME}</td>
                      <td>${user.MOBILE}</td>
                      <td>${user.EMAIL}</td>
                      <td>${user.ADDRESS}</td>
                      <td>
                        <button class="btn btn-info" onclick="editUser('${user.USERNAME}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteUser('${user.USERNAME}')">Delete</button>
                      </td>
                    </tr>`;
      tableBody.append(newRow);
    });
  }

  function editUser(username) {
    // window.location.href = "EditEmployeeDetails.html";
    $.ajax({
        url: `http://localhost:3000/api/GetUser?username=${username}`,
        method: 'GET',
        success: function(response) {
          console.log(response)
          localStorage.setItem('userDetails', JSON.stringify(response));
          window.location.href = "EditEmployee.html";
        },
        error: function(error) {
          console.error( error);
        }
      });    
  }

  
  function deleteUser(username) {
        $.ajax({
        url: `http://localhost:3000/api/DeleteUser/${username}`,
        method: 'DELETE',
        success: function(response) {
            window.location.href = "Employee.html";
        },
        error: function(error) {
          console.error('Error checking username availability:', error);
        }
      });
  }
