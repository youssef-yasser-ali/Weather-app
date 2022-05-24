/* Global Variables */
let d = new Date();
// Personal API Key for OpenWeatherMap API
const apiKey = '0700ec8342e7af9e383f68f40972f2bb&units=imperial';
const generateBtn = document.querySelector('#generate');
const inputZip = document.getElementById('zip');
const myInput = document.querySelector('.myInput');
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/*Start  function  */

async function generate() {
  const zipCode = inputZip.value;
  const feeling = myInput.value;
  const temp = await getTemp(zipCode, apiKey);
  // console.log(temp, feeling, newDate);
  objtosent = {
    date: newDate,
    temp,
    content: feeling,
  };
  sentToServer('/userData', objtosent);
  const response = await fetch('/getData');
  const allData = await response.json();
  console.log(allData);
  retrieveData(allData);
}
async function retrieveData(allData) {
  try {
    console.log(allData);

    // Transform into JSON
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML =
      Math.round(allData.temp) + 'degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
}
// sent data to server  by path and object
async function sentToServer(path, jsonObject) {
  await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonObject),
  });
}
async function getTemp(zipCode, apiKey) {
  const apiLink = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
  const data = await fetch(apiLink);
  weatherData = await data.json();
  // console.log(weatherData);
  return weatherData.main.temp;
}
/*End  function  */
generateBtn.addEventListener('click', generate);
