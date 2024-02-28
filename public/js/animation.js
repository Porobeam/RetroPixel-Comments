document.addEventListener('DOMContentLoaded', () =>
{
	// What up! This is for the smooth animation from botton to the center of the page. :)

	document.body.style.overflow = 'hidden';
	
	const buttonContainer = document.getElementById('button-container');
	const windowHeight = window.innerHeight;
	const containerHeight = buttonContainer.clientHeight;
	const targetPosition = (windowHeight - containerHeight) / 2;
	
	// This is a very cool recursive function. Is actually what makes it smoothy!
	const animateToPosition = (currentPosition) => {
		window.scrollTo(0, 0);
		if (currentPosition > targetPosition){
			currentPosition -= (currentPosition - targetPosition) / 22;
			buttonContainer.style.top = `${currentPosition}px`;
			
			requestAnimationFrame(() => animateToPosition(currentPosition));
		}
	};
	
	// Animation inities
	animateToPosition(3000);
	
	const buttons = document.querySelectorAll('.button');
	const navicon = document.querySelectorAll('.navicon');
	
	// This makes every button getting visible smoothly
	buttons.forEach(button => {
		button.style.opacity = 1;
	});
	
	navicon.forEach(navicon => {
		navicon.style.opacity = .75;
	});

	// Just a couple debug stuff, prob will delete at some point
	console.log("Altura de la pantalla: " + windowHeight);
	console.log("Altura del contenedor: " + containerHeight);
	console.log("Posición objetivo: " + targetPosition);
});