$(document).ready(function() {
  var turns = 0;
  var game = false;
  var player1 = "X";
  var player2 = "O";
  var currentPlayer;
  var winner;
  var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  // play button function to start game
  $("#play").click(function() {
    game = true;
    // sets first player of game and prints message
    currentPlayer = player1;
    showCurrentPlayer();
  })

  // message for current player
  var showCurrentPlayer = function() {
      $(".message").text(currentPlayer + "'s turn");
  }

  // restart button function to clear board and start over
  var clear = function() {
    // empties each square
    $(".square").empty();
    game = true;
    turns = 0;
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    currentPlayer = player1;
    showCurrentPlayer();
  };

  // click function for squares to play
  $(".square").click(function() {

    // set row variable to show the parent of .square(.row)'s index #
    var row = $(this).parent().index();
    // set square variable to show index of .square
    var square = $(this).index();

    // if empty square and game has started
    if ($(this).text()=="" && game) {
      // for player 1
      if (currentPlayer === player1) {
        // add one turn
        turns++;
        // adds player1's text into the space
        $(this).text(player1);
        // sets the square to 1 in the board array
        board[row][square] = 1;
        // switch to player2
        currentPlayer = player2;
        showCurrentPlayer();

        // checkes if player1 won
        // returns true or false
        winner = checkWins(1, player1);
      } else {
        turns++;
        // adds player2's text into space
        $(this).text(player2);
        // sets the square to 2 in the board array
        board[row][square] = 2;
        // switch to player1
        currentPlayer = player1;
        showCurrentPlayer();

        // checks if player2 won
        // returns true or false
        winner = checkWins(2, player2);
      }

      if (!winner && turns == 9) {
            $(".message").text("It's a tie!");
            return;
        }

    }
  });



  // check win function with 2 parameters/arguements
  function checkWins(n,player){
    // checks through each part of the array to see if it matches
    if((board[0][0]==n && board[0][1]==n && board[0][2]==n) ||
      (board[1][0]==n && board[1][1]==n && board[1][2]==n) ||
      (board[2][0]==n && board[2][1]==n && board[2][2]==n) ||

      (board[0][0]==n && board[1][0]==n && board[2][0]==n) ||
      (board[0][1]==n && board[1][1]==n && board[2][1]==n) ||
      (board[0][2]==n && board[1][2]==n && board[2][2]==n) ||

      (board[0][0]==n && board[1][1]==n && board[2][2]==n)||
      (board[0][2]==n && board[1][1]==n && board[2][0]==n)){

      // prints message for winner
      $(".message").text(player + " wins!");
      game = false;
      return true;
    }
    return false;
  }

  // set click event for reset button
  $("#reset").click(clear);

});
