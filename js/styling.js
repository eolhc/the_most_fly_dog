$(document).ready(function() {
  $('#menu').show();
  $('#info').hide();
  $('#controls').hide();
  $('#outcome').hide();

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
})
