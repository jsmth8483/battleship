const createGameboard = () => {
	const placedShips = [];
	const board = Array(10)
		.fill()
		.map(() =>
			Array(10)
				.fill()
				.map((x) => shipPlacement())
		);

	function placeShip(ship, yStart, xStart, orientation) {
		if (orientation === 0) {
			for (let i = 0; i < ship.getPositions().length; i++) {
				if (board[yStart][xStart + i].ship)
					throw Error('Ship cannot be placed');
			}
			for (let i = 0; i < ship.getPositions().length; i++) {
				board[yStart][xStart + i].ship = ship;
				board[yStart][xStart + i].shipPosition = i;
				board[yStart][xStart + i].orientation = orientation;
			}
			placedShips.push(ship);
		} else if (orientation === 1) {
			for (let i = 0; i < ship.getPositions().length; i++) {
				if (board[yStart + i][xStart].ship)
					throw Error('Ship cannot be placed');
			}
			for (let i = 0; i < ship.getPositions().length; i++) {
				board[yStart + i][xStart].ship = ship;
				board[yStart + i][xStart].shipPosition = i;
				board[yStart + i][xStart].orientation = orientation;
			}
			placedShips.push(ship);
		} else {
			throw new Error('Invalid Orientation');
		}
	}

	function receiveAttack(xCoordinate, yCoordinate) {
		const placement = board[xCoordinate][yCoordinate];
		placement.isAttacked = true;
		if (placement.ship) {
			placement.ship.hit(placement.shipPosition);
			return true;
		}
		return false;
	}

	function validateLegalAttack(xCoordinate, yCoordinate) {
		const placement = board[xCoordinate][yCoordinate];
		return !placement.isAttacked;
	}

	function areAllShipsSunk() {
		const shipStatus = placedShips.map((ship) => ship.isSunk());
		for (let status of shipStatus) {
			if (status == false) return false;
		}
		return true;
	}

	function getState() {
		return board;
	}
	return {
		getState,
		receiveAttack,
		placeShip,
		areAllShipsSunk,
		validateLegalAttack,
	};
};

export { createGameboard };

const shipPlacement = () => ({
	isAttacked: false,
	ship: null,
	shipPosition: null,
	orientation: 0,
});
