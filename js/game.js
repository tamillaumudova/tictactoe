var columns = 3;
var rows = 3;
var cells = [];
var turn = 'X';
var score;
var numOfTurns;

//initialize the game board
function init() {
    var board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);
    
    var identifier = 1;
    for (var i = 0; i < rows; i++) {
	var row = document.createElement('tr');
	board.appendChild(row);
	for (var j = 0; j < columns; j++) {
	    var cell = document.createElement('td');
	    cell.setAttribute('height', 120);
	    cell.setAttribute('width', 120);
	    cell.setAttribute('align', 'center');
	    cell.setAttribute('valign', 'center');
	    cell.classList.add('col' + j, 'row' + i);
	    if (i == j) {
		cell.classList.add('diagonal0');
	    }
	    if (j == columns - i - 1) {
		cell.classList.add('diagonal1');
	    }
	    cell.identifier = identifier;
	    cell.addEventListener('click', set);
	    row.appendChild(cell);
	    cells.push(cell);
	    identifier += identifier;
	}
    }
    
    document.getElementById('tictactoe').appendChild(board);
    newGame();
}

function newGame() {
    score = {
	'X': 0,
	'O': 0
    };
    numOfTurns = 0;
    turn = 'X';
    cells.forEach(function (square) {
	square.innerHTML = '&nbsp;';
    });
}

function set() {
    if (this.innerHTML !== '&nbsp;') {
	return;
    }
    this.innerHTML = turn;
    numOfTurns += 1;
    score[turn] += this.identifier;
    if (gameWon(this)) {
	alert('Winner: Player ' + turn);
	newGame();
    } else if (numOfTurns === columns * rows) {
	alert('Draw');
	newGame();
    } else {
	turn = turn === 'X' ? 'O' : 'X';
	document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

//check if any player won this game
function gameWon(clicked) {
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
	var testClass = '.' + memberOf[i];
	var items = contains('#tictactoe ' + testClass, turn);
	if (items.length == 3) {
	    return true;
	}
    }
    return false;
}

//check is list contains a string
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function (element) {
	return RegExp(text).test(element.textContent);
    });
}

init();
