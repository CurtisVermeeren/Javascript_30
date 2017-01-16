/***** Get the elements ******/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/***** Build functions *****/

//Function to play or pause the video
function togglePlay() {
	//If the video is paused then play otherwise pause.
	if(video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

//Function to change between the play and pause icon
function updateButton() {
	//Set the play or pause button
	const icon = this.paused ? '►' : '❚ ❚';
	//Change the content of the toggle html to the proper button
	toggle.textContent = icon;
}

//Function to skip video
function skip(){
	video.currentTime += parseFloat(this.dataset.skip);
}

//Function to handle video playback speed and volume
function handleRangeUpdate() {
	//Have range with name 'volume' and 'playbackRate'
	//Will change based on name of the object that triggered the event
	video[this.name] = this.value;
}

//Function to handle the progress of the video
function handleProgress() {
	//Get a percent of the video played
	const percent = (video.currentTime / video.duration) * 100 ;
	//Update the style of the progressBar to change the size based on amount of video played
	progressBar.style.flexBasis = `${percent}%`;
}

//Function to scrub playback in the video
function scrub(e){
	//Get the scrub time by chechking how far along the bar was clicked and multiple by video duration
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}


/***** Attach event listeners ******/

//Add listeners for the video and play button so that it toggles pause or play
video.addEventListener('click', togglePlay);
toggle.addEventListener('click',togglePlay);

//Listen when the video is playing or paused to update play/pause button
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton)

//Listen on any element with data-skip element
skipButtons.forEach(button => button.addEventListener('click', skip));

//Listen for changes on either of the range bars for volume or playbackRate
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//Listener to check when the video element updates it's time code then the progress bar should update.
video.addEventListener('timeupdate', handleProgress);

//Listener to check if the progress bar has been clicked to skip forward or back in the video
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
