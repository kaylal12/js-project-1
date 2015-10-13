$(document).ready(function() {
  var turn = 1;
  var game = true;

  $(".square").click(function() {
    if ($(this).text()=="" && game) {
      if (turn % 2 == 1) {
        $(this).append("X");
      }
      else {
        $(this).append("O");
      }

      turn++;
    }
  })

});

