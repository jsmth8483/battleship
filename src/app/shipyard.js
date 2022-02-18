const shipyard = (function () {
	let activeShip = null;

	function getActiveShip() {
		return activeShip;
	}
	function registerDragListeners() {
		const ships = document.querySelectorAll('#shipyard .ship');
		ships.forEach((ship) => {
			ship.addEventListener('dragstart', handleShipDragStart);
			ship.addEventListener('dragend', handleShipDragEnd);
		});

		function handleShipDragStart(e) {
			activeShip = e.target;
			console.log(activeShip.children);
		}

		function handleShipDragEnd(e) {
			//console.log(activeShip.children);
			//activeShip = null;
		}
	}
	registerDragListeners();

	return {
		activeShip,
	};
})();

export { shipyard };
