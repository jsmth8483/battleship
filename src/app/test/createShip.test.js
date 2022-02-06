import { it, expect } from '@jest/globals';
import { createShip } from '../createShip';

it('Should create ship with length 5', () => {
	const ship = createShip({ size: 5 });
	expect(ship.getPositions().length).toBe(5);
});

it('Should mark 3rd position hit', () => {
	const ship = createShip({ size: 5 });
	ship.hit(2);
	expect(ship.getPositions()[2]).toBe('hit');
});

it('Should mark last position hit', () => {
	const ship = createShip({ size: 5 });
	ship.hit(4);
	const shipPositions = ship.getPositions();
	expect(shipPositions[shipPositions.length - 1]).toBe('hit');
});

it('Should return true when ship sunk', () => {
	const ship = createShip({ size: 3 });
	ship.hit(0);
	ship.hit(1);
	ship.hit(2);
	expect(ship.isSunk()).toBeTruthy();
});

it('Should return false when not ship sunk', () => {
	const ship = createShip({ size: 3 });
	ship.hit(0);
	ship.hit(1);
	expect(ship.isSunk()).toBeFalsy();
});

it('Should create two distinct ships', () => {
	const ship1 = createShip({ size: 5 });
	const ship2 = createShip({ size: 2 });
	ship1.hit(1);
	ship2.hit(0);

	expect(ship1).not.toEqual(ship2);
});
