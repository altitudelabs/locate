
var initializer = {
  backgroundImage: function () {
    var bg = $('.background-image');
    $(window).resize("resizeBackground");
    function resizeBackground() {
      bg.height($(window).height() + 80);
    }
    resizeBackground();
  },

  emailHandler: function () {
    var counter = 3;

    $('.switch').click(function () {
      if (counter === 5) {
        counter = 1;
      } else {
        counter++;
      }
      var imageElement = $('#index .background-image');
      var url = 'url(/images/background-'+counter+'.jpg)';
      imageElement.css('background-image', url);
    });

    $('.email-form form').submit(function(e) {
      e.preventDefault();
      
      var address = $('.email-form form input').val();
      
      $.ajax({
        type: 'POST',
        url: '/mail',
        data: {
          address: address
        },
        success: function(data){
          alert('Thank you for subscribing =)');
        },
        error: function(err) {
          console.log(err);
          if (err.status === 409) {
            alert('You have already subscribed !');
          }
        }
      });
    });
  },

  init: function () {
    this.backgroundImage();
    this.emailHandler();
  }
};

initializer.init();

