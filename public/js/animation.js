document.addEventListener('DOMContentLoaded', () =>
{
	document.body.style.overflow = 'hidden';
	
	const buttonContainer = document.getElementById('button-container');
	const windowHeight = window.innerHeight;
	const containerHeight = buttonContainer.clientHeight;
	const targetPosition = (windowHeight - containerHeight) / 2;
	
	const animateToPosition = (currentPosition) => {
		window.scrollTo(0, 0);
		if (currentPosition > targetPosition){
			currentPosition -= (currentPosition - targetPosition) / 22;
			buttonContainer.style.top = `${currentPosition}px`;
			
			requestAnimationFrame(() => animateToPosition(currentPosition));
		}
	};
	
	// Iniciar animación
	animateToPosition(3000);
	
	const buttons = document.querySelectorAll('.button');
	
	buttons.forEach(button => {
		button.style.opacity = 1; // Asumiendo una transición CSS para opacidad
	});

	console.log("Altura de la pantalla: " + windowHeight);
	console.log("Altura del contenedor: " + containerHeight);
	console.log("Posición objetivo: " + targetPosition);
});