//variables

const cityName = document.getElementById("cityName");
const weatherTemplate = document.getElementById("weatherTemplate");
let weatherOutput = document.getElementById("weatherOutput");
const apiKey = "03368b30afe0d56755bf6d1ce4341ad4";
const city = "Bruxelles";
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr`;


//fetch
fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
  .then((responseJson) => {
    console.log(responseJson);
  })
  .catch((error) => {
    console.log(error)
  });