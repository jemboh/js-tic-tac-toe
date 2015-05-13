window.onload = init;

var board = Array.apply(null, Array(9)).map(function (x, i) { return i; });
var rows = [[0,1,2], [3,4,5], [6,7,8]];
var columns = [[0,3,6], [1,4,7], [2,5,8]];
var diagonals = [[0,4,8], [2,4,6]];
var winningCombinations = rows.concat(columns).concat(diagonals);
var winCounter;
var winner;
var lastPlayer;
var xMoves = [];
var oMoves = [];

function init() {
  addEventListeners();
}

function addEventListeners() {
  var squares = document.getElementsByClassName('square');

  for (var i = squares.length - 1; i >= 0; i--) {
    squares[i].addEventListener('click', markSquare);
  }
}

function removeEventListenerFrom(element) {
  element.removeEventListener('click', markSquare);
}

function removeAllEventListeners() {
  var squares = document.getElementsByClassName('square');

  for (var i = squares.length - 1; i >= 0; i--) {
    squares[i].removeEventListener('click', markSquare);
  }
}

function markSquare(e) {
  var player = currentPlayer();
  // debugger;
  player === 'x' ? e.currentTarget.innerHTML = '<i class="fa fa-times fa-5x"></i>' : e.currentTarget.innerHTML = '<i class="fa fa-circle-o fa-5x"></i>'
  e.currentTarget.classList.add(player + '-move');
  var position = e.currentTarget.dataset.position;
  board[position] = player;
  addPlayerMove(player, position);
  removeEventListenerFrom(e.currentTarget);
  lastPlayer = player;
  if (xMoves.length + oMoves.length === board.length && !winner) {
    alert('draw!')
  };
}

function addPlayerMove(player, position) {
  if (player === 'x') {
    xMoves.push(+position);
    checkForWinningCombination(xMoves, player);
  } else {
    oMoves.push(+position);
    checkForWinningCombination(oMoves, player);
  }
}


function currentPlayer(e) {
  return lastPlayer === 'x' ? 'o' : 'x';
}

function checkForWinningCombination(movesArray, player) {
  for (i = 0; i < winningCombinations.length; i++) {
    winCounter = 0;
    for (var j = 0; j < winningCombinations[i].length; j++) {
      if(movesArray.indexOf(winningCombinations[i][j]) !== -1){
        winCounter++;
      }
      if(winCounter === 3) {
        winner = player;
        removeAllEventListeners();
        console.log(player + ' wins!');
      }
    }
  }
}