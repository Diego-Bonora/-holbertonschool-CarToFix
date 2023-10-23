$.ajax({
  url: '/login',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify(/* login data */),
  success: function (data) {
    if (data.message === 'Logged in successfully') {
      // window.location.href = '/home';
    }
  }
});