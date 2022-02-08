const Player = {
	attack(xCoordinate, yCoordinate, gameboard) {
		return gameboard.receiveAttack(xCoordinate, yCoordinate);
	},
};

const randomAttackMixin = {
	randomAttack(gameboard) {
		let randX = Math.trunc(Math.random() * 10);
		let randY = Math.trunc(Math.random() * 10);
		while (!gameboard.validateLegalAttack(randX, randY)) {
			randX = Math.trunc(Math.random() * 10);
			randY = Math.trunc(Math.random() * 10);
		}
		return gameboard.receiveAttack(randX, randY);
	},
};

const ComputerPlayer = Object.assign({}, Player, randomAttackMixin);

export { Player, ComputerPlayer };
