import { createGameboard } from './createGameboard';
import { Player, ComputerPlayer as Computer } from './player';
import { renderNewGame, renderGameState } from './renderGame';
import { createShip } from './createShip';

function Game() {
	Player.setGameboard(createGameboard());
	Computer.setGameboard(createGameboard());

	const aircraftCarrier = createShip({ size: 5 });
	const destroyer1 = createShip({ size: 3 });
	const destroyer2 = createShip({ size: 4 });

	Player.gameboard.placeShip(aircraftCarrier, 0, 0, 1);
	Player.gameboard.placeShip(destroyer1, 4, 5, 0);
	Player.gameboard.placeShip(destroyer2, 6, 7, 1);

	const destroyer = createShip({ size: 3 });

	Computer.gameboard.placeShip(destroyer, 4, 7, 0);

	Computer.attack(0, 0, Player.gameboard);
	Computer.attack(2, 0, Player.gameboard);
	Computer.attack(3, 3, Player.gameboard);
	Player.attack(0, 0, Computer.gameboard);
	Player.attack(2, 0, Computer.gameboard);
	Player.attack(4, 7, Computer.gameboard);

	let winner;

	function run() {
		renderNewGame();
		registerBoardClickListeners();
		renderGameState(Player.gameboard.getState(), Computer.gameboard.getState());
	}

	function registerBoardClickListeners() {
		const handlers = Array(10)
			.fill()
			.map((e) => Array(10).fill());
		const computerBoard = document.querySelector('#computer-board');
		Computer.gameboard.getState().forEach((xArr, xIndex) => {
			xArr.forEach((position, yIndex) => {
				const square = computerBoard.querySelector(
					`[data-x='${yIndex}'][data-y='${xIndex}']`
				);
				const listener = boardClickListener.bind(
					null,
					position,
					xIndex,
					yIndex
				);
				handlers[yIndex][xIndex] = listener;
				square.addEventListener('click', listener);
			});
		});

		function boardClickListener(position, xCoordinate, yCoordinate) {
			let positionHasChanged = false;
			if (position.isAttacked == false) {
				Player.attack(xCoordinate, yCoordinate, Computer.gameboard);
				positionHasChanged = true;
				if (Computer.gameboard.areAllShipsSunk()) {
					winner = Player;
				}
			}
			if (positionHasChanged && !winner) {
				Computer.randomAttack(Player.gameboard);
				if (Player.gameboard.areAllShipsSunk()) {
					winner = Computer;
				}
			}
			renderGameState(
				Player.gameboard.getState(),
				Computer.gameboard.getState()
			);

			if (winner) {
				unregisterBoardClickListener();
			}
		}

		function unregisterBoardClickListener() {
			const computerBoard = document.querySelector('#computer-board');
			Computer.gameboard.getState().forEach((yArr, yIndex) => {
				yArr.forEach((position, xIndex) => {
					const square = computerBoard.querySelector(
						`[data-x='${xIndex}'][data-y='${yIndex}']`
					);

					square.removeEventListener('click', handlers[xIndex][yIndex]);
				});
			});
		}
	}

	return { run };
}

export { Game };
