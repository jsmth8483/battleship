const createShip = ({ size }) => {
	const positions = new Array(size);

	function hit(position) {
		positions[position] = 'hit';
	}

	function isSunk() {
		const hits = positions.filter((pos) => pos === 'hit').length;
		return hits == size;
	}

	function getPositions() {
		return positions;
	}

	return {
		hit,
		isSunk,
		getPositions,
	};
};

export { createShip };
