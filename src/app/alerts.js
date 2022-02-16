function displayWinner(winner) {
	const alertsElem = document.querySelector('#alerts');
	const winnerAlert = document.createElement('div');
	winnerAlert.classList.add('alert-winner');
	winnerAlert.textContent = `${winner} wins!`;
	alertsElem.appendChild(winnerAlert);
}

export { displayWinner };
