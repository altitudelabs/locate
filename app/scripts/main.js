var counter = 1;
var switchBackground = function () {
  counter = counter === 1 ? 2 : 1;
  var imageElement = $('#index .background-image');
  var url = 'url(/images/background-'+counter+'.jpg)';
  imageElement.css('background-image', url);
};
