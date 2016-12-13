//Get all the inputs in a node list
const inputs = document.querySelectorAll('.controls input');


function handleUpdate() {
	//Check is there is a suffix such as sizing to the attribute or nothing
	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

//Listen on all the inputs for changes then handle the change
inputs.forEach(input => input.addEventListener('change', handleUpdate));
//Listen for the mouse move update
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
