import { createShip } from './createShip';
import { Player } from './player';
import { renderPlayerState } from './renderGame';

const shipyard = (function () {
	let activeShip = null;
	let grabbedIndex = null;

	function registerDragListeners() {
		const ships = document.querySelectorAll('#shipyard .ship');
		console.log(ships);
		ships.forEach((ship) => {
			ship.addEventListener('dragstart', handleShipDragStart, true);
			ship.addEventListener('dragend', handleShipDragEnd);
			console.log(ship.children);
			const children = [...ship.children];
			children.forEach((index) => {
				console.log(index);
				index.addEventListener('mousedown', handleShipIndexMouseDown, true);
				index.addEventListener('click', handleShipClick, true);
			});
		});

		function handleShipDragStart(e) {
			activeShip = e.target;
		}

		function handleShipIndexMouseDown(e) {
			console.log(e.target);
			grabbedIndex = e.target.dataset.index;
		}

		function handleShipClick(e) {
			if (e.target.parentNode.classList.contains('horizontal')) {
				e.target.parentNode.classList.remove('horizontal');
			} else {
				e.target.parentNode.classList.add('horizontal');
			}
			console.log(e.target.parentNode);
		}

		function handleShipDragEnd(e) {
			activeShip = null;
		}
	}

	function registerDropListeners() {
		const playerSquares = document.querySelectorAll(
			'#player-board .game-board-placeable .game-board-square-placeable'
		);

		playerSquares.forEach((square) => {
			square.addEventListener('drop', handleShipDrop);
			square.addEventListener('dragover', handleShipDragOver);
			square.addEventListener('dragenter', handleShipDragEnter);
		});
	}

	function handleShipDrop(e) {
		e.preventDefault();
		const shipElement = activeShip;
		const shipLength = shipElement.children.length;
		const targetXIndex = Number(e.target.dataset.x);
		const targetYIndex = Number(e.target.dataset.y);

		if (shipElement.classList.contains('horizontal')) {
			const lengthLeft = grabbedIndex;
			const ship = createShip({ size: shipLength });
			try {
				Player.gameboard.placeShip(
					ship,
					targetYIndex,
					targetXIndex - lengthLeft,
					0
				);
				activeShip.parentNode.removeChild(activeShip);
			} catch (err) {
				// TODO: display error in UI
			}
			renderPlayerState(Player.gameboard.getState());
		} else {
			const lengthUp = grabbedIndex;
			const ship = createShip({ size: shipLength });
			try {
				Player.gameboard.placeShip(
					ship,
					targetYIndex - lengthUp,
					targetXIndex,
					1
				);
				activeShip.parentNode.removeChild(activeShip);
			} catch (err) {
				// TODO: display error in UI
			}
			renderPlayerState(Player.gameboard.getState());
		}
	}

	function handleShipDragOver(e) {
		e.preventDefault();
	}

	function handleShipDragEnter(e) {
		e.preventDefault();
	}

	return {
		registerDragListeners,
		registerDropListeners,
	};
})();

export { shipyard };
