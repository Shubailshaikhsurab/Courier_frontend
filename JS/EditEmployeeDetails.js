
$(document).ready(function(){
    var userDetails = localStorage.getItem('userDetails');
    setEditValuesRegister(JSON.parse(userDetails))
    });
function setEditValuesRegister(userDetail){
    var user=userDetail.result[0];
    $('#editFirstName').val(user.FIRSTNAME);
    $('#editLastName').val(user.LASTNAME);
    $('#editUsername').val(user.USERNAME);
    $('#editPassword').val(user.PASSWORD);
    $('#editMobile').val(user.MOBILE);
    $('#editEmail').val(user.EMAIL);
    $('#editAddress').val(user.ADDRESS);
  }

  function UpdateUser(){
    const username = $('#editUsername').val()
    const formData = {
        FIRSTNAME: $('#editFirstName').val(),
        LASTNAME: $('#editLastName').val(),
        USERNAME: $('#editUsername').val(),
        PASSWORD: $('#editPassword').val(),
        MOBILE: $('#editMobile').val(),
        EMAIL: $('#editEmail').val(),
        ADDRESS: $('#editAddress').val(),
      };
    $.ajax({
        url: `http://localhost:3000/api/UpdateUser/${username}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
          window.location.href = "Employee.html";
        },
        error: function(error) {
          console.error('Error updating user:', error);
        }
      });
  }