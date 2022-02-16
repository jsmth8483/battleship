import { it, expect } from '@jest/globals';
import { createGameboard } from '../createGameboard';
import { createShip } from '../createShip';

it('Should create game board', () => {
	const gameboard = createGameboard();
	expect(gameboard.getState()).toBeDefined();
});

it('Should place ship at specific coordinates (vertically)', () => {
	const gameboard = createGameboard();
	const ship = createShip({ size: 3 });

	gameboard.placeShip(ship, 2, 4, 0);

	expect(gameboard.getState()[2][4]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 0,
		orientation: 0,
	});
	expect(gameboard.getState()[2][5]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 1,
		orientation: 0,
	});
	expect(gameboard.getState()[2][6]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 2,
		orientation: 0,
	});
});

it('Should place ship at specific coordinates (vertically)', () => {
	const gameboard = createGameboard();
	const ship = createShip({ size: 3 });

	gameboard.placeShip(ship, 2, 4, 0);

	expect(gameboard.getState()[2][4]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 0,
		orientation: 0,
	});
	expect(gameboard.getState()[2][5]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 1,
		orientation: 0,
	});
	expect(gameboard.getState()[2][6]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 2,
		orientation: 0,
	});
});

it('Should place ship at specific coordinates (horizontally)', () => {
	const gameboard = createGameboard();
	const ship = createShip({ size: 3 });

	gameboard.placeShip(ship, 2, 4, 1);

	expect(gameboard.getState()[2][4]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 0,
		orientation: 1,
	});
	expect(gameboard.getState()[3][4]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 1,
		orientation: 1,
	});
	expect(gameboard.getState()[4][4]).toEqual({
		isAttacked: false,
		ship: ship,
		shipPosition: 2,
		orientation: 1,
	});
});

it('Should throw error when invalid ship orientation given', () => {
	const gameboard = createGameboard();
	const ship = createShip({ size: 3 });

	expect(() => gameboard.placeShip(ship, 2, 4, 2)).toThrow(Error);
});

it('Should throw error when ship placed in populated coordinates', () => {
	const gameboard = createGameboard();
	const ship1 = createShip({ size: 3 });
	const ship2 = createShip({ size: 3 });
	gameboard.placeShip(ship1, 2, 4, 1);

	expect(() => gameboard.placeShip(ship2, 3, 4, 0)).toThrow(Error);
});

it('Should set empty coordinates on gameboard attacked', () => {
	const gameboard = createGameboard();
	gameboard.receiveAttack(2, 3);
	expect(gameboard.getState()[2][3]).toEqual({
		isAttacked: true,
		ship: null,
		shipPosition: null,
		orientation: 0,
	});
});

it('Should set populated coordinates on gameboard attacked', () => {
	const gameboard = createGameboard();
	const ship = createShip({ size: 3 });
	gameboard.placeShip(ship, 2, 4, 0);
	gameboard.receiveAttack(2, 4);

	expect(gameboard.getState()[2][4]).toEqual({
		isAttacked: true,
		ship: ship,
		shipPosition: 0,
		orientation: 0,
	});

	expect(gameboard.getState()[2][4].ship.getPositions()[0] === 'hit');
});

it('Should return false if not all ships sunk', () => {
	const gameboard = createGameboard();
	const ship1 = createShip({ size: 3 });
	gameboard.placeShip(ship1, 2, 4, 0);

	const ship2 = createShip({ size: 2 });
	gameboard.placeShip(ship2, 6, 6, 1);
	gameboard.receiveAttack(7, 6);
	gameboard.receiveAttack(6, 6);

	expect(gameboard.areAllShipsSunk()).toBeFalsy();
});

it('Should return true if all ships sunk', () => {
	const gameboard = createGameboard();

	const ship2 = createShip({ size: 3 });
	gameboard.placeShip(ship2, 6, 6, 1);
	gameboard.receiveAttack(7, 6);
	gameboard.receiveAttack(6, 6);
	gameboard.receiveAttack(8, 6);
	gameboard.receiveAttack(1, 6);

	expect(gameboard.areAllShipsSunk()).toBeTruthy();
});
