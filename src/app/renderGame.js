function renderGame() {
	const gameboards = document.querySelectorAll('.game-board');
	gameboards.forEach((board) => {
		renderTopBoardHeader(board);
	});
}

function renderTopBoardHeader(board) {
	const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
	const blankSquare = document.createElement('div');
	blankSquare.classList.add('game-board-square');
	board.appendChild(blankSquare);
	letters.forEach((letter) => {
		const square = document.createElement('div');
		square.classList.add('game-board-square');
		square.textContent = letter;
		board.appendChild(square);
	});
}

export { renderGame };
