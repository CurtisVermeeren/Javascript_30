/*
* Function to play a sound.
* @param {Keypress event} e - The key that has been pressed
*/
function playSound(e){
	//Check if there is audio for the key pressed quearies the audio objects
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

	//Get the key by querying the key class
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

	//If there is no audio for a key end function
	if (!audio) return;

	//Rewind the current audio play to the start so that when key is pressed quickly is will rewind each time
	audio.currentTime = 0;

	//Play the found audio track
	audio.play();

	//Add playing class to the key div by adding 'playing' to the classL
	key.classList.add('playing');
}

/*
* Function to remove the transition of a key div
* @param {Key Object div} - The object that had an ending transition
*/
function removeTransition(e){
	//Skip if not a transform
	if (e.propertyName !== 'transform') return;

	//Remove the transition from the key by removing the playing class
	this.classList.remove('playing');
}

//Listen through all keys for ending transitions
//Get all keys on the page using .key clas
const keys = document.querySelectorAll('.key');
//For each key listen for a transitionend event
keys.forEach( key => key.addEventListener('transitionend', removeTransition))

//Listening for a keydown event then run function. E is an object of data describing what happened
window.addEventListener('keydown',playSound);
