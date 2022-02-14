import '../style/app.scss';
import {
	renderNewGame,
	renderPlayerState,
	renderComputerState,
} from './renderGame';
import { createGameboard } from './createGameboard';
import { createShip } from './createShip';
import { Player, ComputerPlayer as Computer } from './player';

renderNewGame();

const playerBoard = createGameboard();

const aircraftCarrier = createShip({ size: 5 });

playerBoard.placeShip(aircraftCarrier, 0, 0, 1);

Computer.attack(0, 0, playerBoard);
Computer.attack(2, 0, playerBoard);
Computer.attack(3, 3, playerBoard);

renderPlayerState(playerBoard.getGameboard());

const computerBoard = createGameboard();

const destroyer = createShip({ size: 3 });

computerBoard.placeShip(destroyer, 4, 7, 0);

Player.attack(0, 0, computerBoard);
Player.attack(2, 0, computerBoard);
Player.attack(4, 7, computerBoard);

renderComputerState(computerBoard.getGameboard());
