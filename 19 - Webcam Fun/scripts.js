const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  //Get the stream from the webcam
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
	  //Video needs to be in a URL
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
	//Catch if webcam access not given
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

//Paint a frame from the webcam onto the screen
function paintToCanavas() {
  //Set width and height of canvas to match the webcame size
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  //Every interval of 16ms then the function will run
  return setInterval(() => {
	//Pass the video to draw image, start at 0,0 and paint the height and width
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

function takePhoto() {
  // Play the camera sound
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firsChild);
}

getVideo();

//Wait for the video to be playable then begin painting to canvas
video.addEventListener('canplay', paintToCanavas);
