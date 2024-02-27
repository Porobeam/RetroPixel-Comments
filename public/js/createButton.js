document.addEventListener('DOMContentLoaded', () => {

	let createButton = document.getElementById('create-button');
	let buttonContainer = document.getElementById('button-container');
	let createContainer = document.getElementById('create-container');
	let backButton = document.getElementById('back-button');
	let backContainer = document.getElementById('back-container');
	
	let wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	const toggleVisibility = (element, shouldShow) => {
		element.classList.toggle('hidden', !shouldShow);
		element.classList.toggle('visible', shouldShow);
	};
	
	createButton.addEventListener('click', async () => {
		// Avoids back-container to take space
		backContainer.style.marginTop = '0px'; 
		createContainer.style.marginBottom = '0px';

		toggleVisibility(buttonContainer, false);
		toggleVisibility(createContainer, true);
		toggleVisibility(backButton, true);
		toggleVisibility(backContainer, true);
		await wait(50);
	});
	
	backButton.addEventListener('click', async () => {
		// Avoids back-container to collapse
		backContainer.style.marginTop = `${(createContainer.offsetHeight)}px`;
		createContainer.style.marginBottom = `${(backContainer.offsetHeight)}px`;

		toggleVisibility(createContainer, false);
		toggleVisibility(backContainer, false);
		toggleVisibility(buttonContainer, true);
		await wait(50);
	});

	// Makes back-container looking fit with the create container
	const adjustWidth = () => {
		backContainer.style.width = `${createContainer.offsetWidth}px`;
	};
	
	window.addEventListener('resize', adjustWidth);
	adjustWidth();

});
