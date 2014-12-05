
var initializer = {
  backgroundImage: function () {
    var bg = $('.background-image');
    $(window).resize("resizeBackground");
    function resizeBackground() {
      bg.height($(window).height() + 80);
    }
    resizeBackground();
  },

  switchButton: function () {
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
  },

  up: function () {
    $('.up').click(function () {
      var imageElement = $('.logo-img');
      var old = imageElement.width();
      imageElement.width(old + 50);
      $('.size').text(old + 50);
    });
  },
  down: function () {
    $('.down').click(function () {
      var imageElement = $('.logo-img');
      var old = imageElement.width();
      imageElement.width(old - 50);
      $('.size').text(old - 50);
    });
  },
  size: function () {
      $('.size').text($('.logo-img').width());
  },

  emailHandler: function () {


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
    this.switchButton();
    this.up();
    this.down();
    this.size();
  }
};

initializer.init();

