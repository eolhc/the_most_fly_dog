$(document).ready(function() {
  $('#menu').show();
  $('#info').hide();
  $('#controls').hide();

  $('.fa-window-close').on("mousedown", function() {
    console.log("close window!!!!");
    $('#info').toggle();
    $('#menu').toggle();
  })

  $('.fa-question-circle').on("mousedown", function() {
    console.log("gimme help!");
    $('#info').toggle();
    $('#menu').toggle();
  })

  $('#letsplay').on("mousedown", function() {
    $('#play').hide();
    $('#controls').show();
    $('.fa-play').hide();
  })

})
