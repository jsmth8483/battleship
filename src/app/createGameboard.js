const createGameboard = () => {
	const placedShips = [];
	const board = Array(10)
		.fill()
		.map(() =>
			Array(10)
				.fill()
				.map((x) => shipPlacement())
		);

	function placeShip(ship, xStart, yStart, orientation) {
		if (orientation === 'top-down') {
			for (let i = 0; i < ship.getPositions().length; i++) {
				if (board[xStart][yStart + i].ship)
					throw Error('Ship cannot be placed');
			}
			for (let i = 0; i < ship.getPositions().length; i++) {
				board[xStart][yStart + i].ship = ship;
				board[xStart][yStart + i].shipPosition = i;
			}
			placedShips.push(ship);
		} else if (orientation === 'left-right') {
			for (let i = 0; i < ship.getPositions().length; i++) {
				if (board[xStart + i][yStart].ship)
					throw Error('Ship cannot be placed');
			}
			for (let i = 0; i < ship.getPositions().length; i++) {
				board[xStart + i][yStart].ship = ship;
				board[xStart + i][yStart].shipPosition = i;
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

	function getGameboard() {
		return board;
	}
	return {
		getGameboard,
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
});
