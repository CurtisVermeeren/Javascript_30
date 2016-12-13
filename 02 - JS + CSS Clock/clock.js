const secondHand= document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const hand = document.querySelector('.hand');

function setDate(){

	//Start with seconds hand
	//Get the current date
	const now = new Date();
	//Get the seconds of the date
	const seconds = now.getSeconds();
	//Convert seconds into degrees offset by 90degrees
	const secondsDegrees = ((seconds / 60) * 360) + 90;

	//Transform the second hand
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

	//Next the minutes hand
	//Get the minutes of the date
	const minutes = now.getMinutes();
	//Convert the minutes into degrees offset by 90degrees
	const minutesDegrees = ((minutes / 60) * 360) + 90;
	//Transform the minutes hand
	minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

	//Finally the hour hand
	const hours = now.getHours();
	const hourDegrees = ((hours / 60) * 360) + 90;
	hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

//Get interval every 1 second
setInterval(setDate, 1000);
