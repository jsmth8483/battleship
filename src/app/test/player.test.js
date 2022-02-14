import { it, expect } from '@jest/globals';
import { createGameboard } from '../createGameboard';
import { createShip } from '../createShip';
import { Player, ComputerPlayer } from '../player';

it('Should be able to attack a player and miss', () => {
	const gameboard = createGameboard();
	const ship = createShip({ size: 3 });
	gameboard.placeShip(ship, 2, 4, 0);

	expect(Player.attack(1, 2, gameboard)).toBe(false);
});

it('Should be able to attack a player and hit', () => {
	const gameboard = createGameboard();
	const ship = createShip({ size: 3 });
	gameboard.placeShip(ship, 2, 4, 0);

	expect(Player.attack(2, 4, gameboard)).toBe(true);
});

it('Should be able to randomly attack', () => {
	const gameboard = createGameboard();
	ComputerPlayer.randomAttack(gameboard);
	expect(gameboard.getGameboard()).toEqual(
		expect.arrayContaining([
			expect.arrayContaining([
				expect.objectContaining({
					isAttacked: true,
					ship: null,
					shipPosition: null,
				}),
			]),
		])
	);
});
