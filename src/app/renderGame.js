function renderNewGame() {
	const gameboards = document.querySelectorAll('.game-board');
	gameboards.forEach((board) => {
		renderColumnHeader(board);
		renderRowHeader(board);
		renderMainBoard(board);
		//renderPlaceableSquares(board);
	});

	function renderColumnHeader(board) {
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
		const blankSquare = document.createElement('div');
		blankSquare.classList.add('game-board-square');
		board.appendChild(blankSquare);
		letters.forEach((letter) => {
			const square = document.createElement('div');
			square.classList.add('game-board-square', 'game-board-column-indicator');
			square.textContent = letter;
			board.appendChild(square);
		});
	}

	function renderRowHeader(board) {
		for (let i = 0; i < 10; i++) {
			const square = document.createElement('div');
			square.classList.add('game-board-square', 'game-board-row-indicator');
			square.textContent = i + 1;
			board.appendChild(square);
		}
	}

	function renderMainBoard(board) {
		const mainBoard = document.createElement('div');
		mainBoard.classList.add('game-board-placeable');
		renderPlaceableSquares(mainBoard);
		board.appendChild(mainBoard);
	}

	function renderPlaceableSquares(board) {
		for (let i = 0; i < 100; i++) {
			const square = document.createElement('div');
			square.classList.add('game-board-square', 'game-board-square-placeable');
			square.dataset.x = i % 10;
			square.dataset.y = Math.trunc(i / 10);
			board.appendChild(square);
		}
	}
}

function renderGameState() {}

function renderPlayerState(playerState) {
	const playerBoard = document.querySelector('#player-board');
	playerState.forEach((yArr, yIndex) => {
		yArr.forEach((position, xIndex) => {
			const square = playerBoard.querySelector(
				`[data-x='${xIndex}'][data-y='${yIndex}']`
			);
			if (position.ship) {
				square.classList.add('populated');
			}
			if (position.isAttacked) {
				square.classList.add('attacked');
			}
			if (position.isAttacked && !position.ship) {
				square.classList.add('miss');
			}
		});
	});
}

function renderComputerState(computerState) {
	const computerBoard = document.querySelector('#computer-board');
	computerState.forEach((yArr, yIndex) => {
		yArr.forEach((position, xIndex) => {
			const square = computerBoard.querySelector(
				`[data-x='${xIndex}'][data-y='${yIndex}']`
			);
			if (position.isAttacked) {
				square.classList.add('attacked');
			}
			if (!position.ship) {
				square.classList.add('miss');
			}
		});
	});
}

export { renderNewGame, renderPlayerState, renderComputerState };
