
function registerUser() {
    
    const formData = {
      FIRSTNAME: $('#firstName').val(),
      LASTNAME: $('#lastName').val(),
      USERNAME: $('#username').val(),
      PASSWORD: $('#password').val(),
      MOBILE: $('#mobile').val(),
      EMAIL: $('#email').val(),
      ADDRESS: $('#address').val(),
    };
    
    $.ajax({
      url: 'http://localhost:3000/api/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        console.log('Registration successful:', response);
        window.location.href = "Login.html";
      },
      error: function(error) {
        console.error('Registration failed:', error.responseJSON);
      }
    });
  }

  function checkUsernameAvailability() {
    //text box se value is taken
    const username = $('#username').val();

    
    $.ajax({
      url: `http://localhost:3000/api/UserExist?username=${username}`,
      method: 'GET',
      success: function(response) {
        if (response.userCount === 0) {
          $('#availabilityMessage').text('Username is available').css('color', 'green');
        } else {
          $('#availabilityMessage').text('Username is already taken').css('color', 'red');
        }
      },
      error: function(error) {
        console.error('Error checking username availability:', error);
      }
    });
  }