/* Global Variables */
let d = new Date();
// Personal API Key for OpenWeatherMap API
const apiKey = '0700ec8342e7af9e383f68f40972f2bb&units=imperial';
const generateBtn = document.querySelector('#generate');
const inputZip = document.getElementById('zip');
const myInput = document.querySelector('.myInput');
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
// Create a new date instance dynamically with JS

generateBtn.addEventListener('click', async function () {
  const zipCode = inputZip.value;
  const feeling = myInput.value;
  const apiLink = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
  const data = await fetch(apiLink);
  weatherData = await data.json();
  // console.log(weatherData);
  const temp = weatherData.main.temp;
  // console.log(temp, feeling, newDate);

  await fetch('/userData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: newDate,
      temp,
      feeling,
    }),
  });
  const response = await fetch('/getData');
  const finalData = await response.json();
  console.log(finalData);
});
