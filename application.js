var token = '';

$(document).ready(function() {
  var turns = 0;
  var game = false;
  var gameId = null;
  var player1 = "X";
  var player2 = "O";
  var currentPlayer;
  var winner;
  var wins1 = 0;
  var wins2 = 0;
  var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  $(".gameboard").hide();
  $("#play").prop("disabled", true);

  // play button function to start game
  $("#play").on('click', function() {
    $(".loginbox").hide();
    // sets first player of game and prints message
    currentPlayer = player1;
    showCurrentPlayer();
    $("#score1").text(wins1);
    $("#score2").text(wins2);

    var createGameCB = function createGameCB(error, data) {
      if (error) {
        console.error(error);
        return;
      }
      gameId = data.game.id;

      game = true;
      $(".gameboard").show();
    }

    tttapi.createGame(token, createGameCB);
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
  $(".square").on('click',function(event) {

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

        // if winner, add win
        if(winner) {
          wins1++;
        }

        // show score
        $("#score1").text(wins1);
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

        // if winner, add win
        if(winner) {
          wins2++;
        }

        // show score
        $("#score2").text(wins2);

      }

      if (!winner && turns == 9) {
        game = false;
        $(".message").text("It's a tie!");
      }

      var markCellCB = function markCellCB(error, data) {
        if (error) {
          console.error(error);
          return;
        }
      };

      tttapi.markCell(gameId, {
        game: {
          cell: {
            index: $(event.target).data('index'),
            value: currentPlayer === 'X' ? 'o' : 'x'
          },
          over: !game
        }
      }, token, markCellCB);
    }
  });



  // check win function with 2 parameters/arguements
  var checkWins = function checkWins(n,player){
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
  $("#reset").on('click', clear);

});

'use strict';
var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      // url: 'http://httpbin.org/post',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json',
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};


//$(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };
  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('#register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });

  $('#login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      $("#play").prop("disabled", false);
      callback(null, data);
      //$('.token').val(data.user.token);
      token = data.user.token;
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  $('#list-games').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(token, callback);
  });

  $('#create-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, callback);
  });

  $('#show-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, token, callback);
  });

  $('#join-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(id, token, callback);
  });

  $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, callback);
  });

  $('#watch-game').on('submit', function(e){
    var token = $(this).children('[name="token"]').val();
    var id = $('#watch-id').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      $('#watch-index').val(cell.index);
      $('#watch-value').val(cell.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

});
