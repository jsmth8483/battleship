import { createShip } from './createShip';
import { Player } from './player';
import { renderPlayerState } from './renderGame';
import { Game } from './game';

const shipyard = (function () {
	let activeShip = null;
	let grabbedIndex = null;

	function renderShipInShipyard(size) {
		console.log(size);
		const shipyard = document.querySelector('#shipyard');
		const ship = document.createElement('div');
		ship.draggable = true;
		ship.className = 'ship';
		for (let i = 0; i < size; i++) {
			const shipSegment = document.createElement('div');
			shipSegment.dataset.index = i;
			ship.appendChild(shipSegment);
		}
		shipyard.appendChild(ship);
		registerDragListener(ship);
	}

	function registerDragListener(element) {
		element.addEventListener('dragstart', handleShipDragStart, true);
		element.addEventListener('dragend', handleShipDragEnd);
		const children = [...element.children];
		children.forEach((index) => {
			index.addEventListener('mousedown', handleShipIndexMouseDown, true);
			index.addEventListener('click', handleShipClick, true);
		});
	}

	function registerDragListeners() {
		const ships = document.querySelectorAll('#shipyard .ship');
		ships.forEach((ship) => {
			registerDragListener(ship);
		});
	}

	function handleShipDragStart(e) {
		activeShip = e.target;
	}

	function handleShipIndexMouseDown(e) {
		grabbedIndex = e.target.dataset.index;
	}

	function handleShipClick(e) {
		if (e.target.parentNode.classList.contains('horizontal')) {
			e.target.parentNode.classList.remove('horizontal');
		} else {
			e.target.parentNode.classList.add('horizontal');
		}
	}

	function handleShipDragEnd(e) {
		activeShip = null;
	}

	function registerDropListeners() {
		const playerSquares = document.querySelectorAll(
			'#player-board .game-board-placeable .game-board-square-placeable'
		);

		playerSquares.forEach((square) => {
			square.addEventListener('drop', handleShipDrop);
			square.addEventListener('dragover', handleShipDragOver);
			square.addEventListener('click', handleSquareClick);
		});
	}

	function unregisterSquareListeners() {
		const playerSquares = document.querySelectorAll(
			'#player-board .game-board-placeable .game-board-square-placeable'
		);

		playerSquares.forEach((square) => {
			square.removeEventListener('drop', handleShipDrop);
			square.removeEventListener('dragover', handleShipDragOver);
			square.removeEventListener('click', handleSquareClick);
		});
	}

	function handleSquareClick(e) {
		if (e.target.parentNode.classList.contains('populated')) {
			const shipToRemove =
				Player.gameboard.getState()[e.target.parentNode.dataset.y][
					e.target.parentNode.dataset.x
				].ship;

			Player.gameboard.removeShip(shipToRemove);
			renderPlayerState(Player.gameboard.getState());
			renderShipInShipyard(shipToRemove.getPositions().length);
			const shipyard = document.querySelector('#shipyard');
			const startButton = document.querySelector('.start-btn');
			if (shipyard.children.length != 0 && startButton) {
				removeStartGameButton();
			}
		}
	}

	function handleShipDrop(e) {
		e.preventDefault();
		const shipElement = activeShip;
		const shipLength = shipElement.children.length;
		const targetXIndex = Number(e.target.dataset.x);
		const targetYIndex = Number(e.target.dataset.y);

		const ship = createShip({ size: shipLength });
		try {
			if (shipElement.classList.contains('horizontal')) {
				Player.gameboard.placeShip(
					ship,
					targetYIndex,
					targetXIndex - grabbedIndex,
					0
				);
			} else {
				Player.gameboard.placeShip(
					ship,
					targetYIndex - grabbedIndex,
					targetXIndex,
					1
				);
			}
			activeShip.parentNode.removeChild(activeShip);
		} catch (err) {
			// TODO: display error in UI
		}
		renderPlayerState(Player.gameboard.getState());
		const shipyard = document.querySelector('#shipyard');
		if (shipyard.children.length == 0) {
			renderStartGameButton();
		}
	}

	function handleShipDragOver(e) {
		e.preventDefault();
	}

	function renderStartGameButton() {
		const shipyard = document.querySelector('#shipyard');
		const startGameButton = document.createElement('button');
		startGameButton.classList.add('start-btn');
		startGameButton.textContent = 'Start Game';
		startGameButton.addEventListener('click', Game.run);
		startGameButton.addEventListener('click', removeStartGameButton);
		startGameButton.addEventListener('click', lockShips);
		shipyard.appendChild(startGameButton);
	}

	function removeStartGameButton() {
		const shipyard = document.querySelector('#shipyard');
		const startButton = shipyard.querySelector('.start-btn');
		shipyard.removeChild(startButton);
	}

	function lockShips() {
		unregisterSquareListeners();
	}

	return {
		registerDragListeners,
		registerDropListeners,
	};
})();

export { shipyard };
