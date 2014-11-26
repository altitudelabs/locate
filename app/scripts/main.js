var counter = 1;
$('.switch').click(function () {
  if (counter === 5) {
    counter = 1;
  } else {
    counter++;
  }
  console.log(counter);
  var imageElement = $('#index .background-image');
  var url = 'url(/images/background-'+counter+'.jpg)';
  imageElement.css('background-image', url);
});

$('.email-form form').submit(function(e) {
  e.preventDefault();
  var address = $('.email-form form input').val();
  console.log('email submitted: ', address);
  
  $.ajax({
    type: 'POST',
    url: '/mail',
    data: {
      address: address
    },
    success: function(data){
      console.log('success, ', data);
    }
  });
});
