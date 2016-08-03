window.onload = init;

var board;
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
  board = Array.apply(null, Array(9)).map(function (x, i) { return i; });
}

function addEventListeners() {
  var squares = document.getElementsByClassName('square');

  for (var i = squares.length - 1; i >= 0; i--) {
    squares[i].addEventListener('click', markSquare);
    squares[i].addEventListener('mouseenter', highlightSquare);
    squares[i].addEventListener('mouseleave', highlightSquare);
  }

  document.getElementById('reset-game').addEventListener('click', resetGame);
}

function removeEventListenerFrom(element) {
  element.removeEventListener('click', markSquare);
}

function removeAllEventListeners() {
  var squares = document.getElementsByClassName('square');

  for (var i = squares.length - 1; i >= 0; i--) {
    squares[i].removeEventListener('click', markSquare);
    squares[i].removeEventListener('mouseenter', highlightSquare);
    squares[i].removeEventListener('mouseleave', highlightSquare);
  }
}

function highlightSquare(e) {
  var element = e.currentTarget;
  if(element.classList.length === 1) {
    element.classList.add('highlight');
  } else {
    element.className = element.className.replace('highlight', '');
  }
}

function markSquare(e) {
  var element = e.currentTarget;
  var player = currentPlayer();
  element.className = element.className.replace('highlight', '');
  element.classList.add(player + '-move');
  player === 'x' ? element.innerHTML = '<i class="fa fa-times fa-5x"></i>' : element.innerHTML = '<i class="fa fa-circle-o fa-5x"></i>'
  var position = element.dataset.position;
  board[position] = player;
  addPlayerMove(player, position);
  removeEventListenerFrom(element);
  lastPlayer = player;
  if (xMoves.length + oMoves.length === board.length && !winner) {
    gameOver('draw');
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
        gameOver('win', player);
        console.log(player + ' wins!');
      }
    }
  }
}

function gameOver(result, winner) {
  var overlay = document.createElement('div');
  overlay.id = 'overlay';

  var overlayMessageContainer = document.createElement('div');
  overlayMessageContainer.classList.add('overlay-message-container');

  var resetLink = document.createElement('p');
  resetLink.id = 'overlay-reset-game';
  resetLink.innerHTML = 'reset';

  if(winner) {
    overlay.classList.add(winner + '-overlay');
    overlayMessageContainer.innerHTML = winner + ' wins!';
  } else {
    overlay.classList.add('draw-overlay');
    overlayMessageContainer.innerHTML = "It's a draw!";
  }

  document.body.appendChild(overlay);
  overlay.appendChild(overlayMessageContainer);
  overlayMessageContainer.appendChild(resetLink);

  document.getElementById('overlay-reset-game').addEventListener('click', resetGame);
}

function clearBoard() {
  var squares = document.getElementsByClassName('square');

  for (var i = squares.length - 1; i >= 0; i--) {
    squares[i].innerHTML = '';
    squares[i].className = squares[i].className.replace(new RegExp(/[a-z].move$/), '');
  }
}

function resetGame() {
  var overlay = document.getElementById('overlay');
  if(overlay) overlay.parentNode.removeChild(overlay);
  clearBoard();
  init();
  lastPlayer = undefined;
  xMoves = [];
  oMoves = [];
}