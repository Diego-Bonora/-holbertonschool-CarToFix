$.ajax({
  url: 'http://localhost:5000/api/v1/login',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    email: email,
    password: password,
    recuerdame: recuerdame
  }),
  success: function (data) {
    if (data.message === 'Logged in successfully') {
      if (recuerdame) {
        Cookies.set('cookie_user', '', { expires: 7 });
      }
      // window.location.href = '/home ';
    }
  }
});
