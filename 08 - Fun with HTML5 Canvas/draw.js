//Get the canvas
const canvas = document.querySelector('#draw');

const ctx = canvas.getContext('2d');

//Set width and height based on window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 2;

//Flag to track cursor position
let isDrawing = false;

let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){
	//Stop drawing when mouse is up
	if (!isDrawing) return;

	//Start a path for drawing
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];

	//Increase the hue each draw and reset at 360
	hue += 0.2;
	if(hue >= 360){
		hue = 0;
	}

	// Increase lineWidth up to 100, Decrease lineWidth down to 1
	if (ctx.lineWidth >= 100 || ctx.lineWidth <=1){
		direction = !direction;
	}
	if (direction == true) {
		ctx.lineWidth += 0.1;
	} else {
		ctx.lineWidth -= 0.1;
	}
}

//Listen for mouse movement
canvas.addEventListener('mousemove', draw);

//Listen if mouse is down and drawing, up and not drawing, or off the page
canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
