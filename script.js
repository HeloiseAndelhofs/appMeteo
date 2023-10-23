//variables
const cityName = document.getElementById("cityName");
const button = document.getElementById("button");
const weatherTemplate = document.getElementById("weatherTemplate");
let weatherOutput = document.getElementById("weatherOutput");
const apiKey = "03368b30afe0d56755bf6d1ce4341ad4";
const city = "Bruxelles";
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&cnt=8&units=metric&timezone=Z`;

//fetch
fetch(apiUrl)
.then((response) => {
    return response.json()
})
.then((responseJson) => {
    const list = responseJson.list;
    const location = responseJson.city.name;
    const day = new Date();
    const formattedDay = day.toLocaleString('fr-FR', {
        weekday: "long",
      });
    const date = new Date();
    const hour = date.getHours();
    list.forEach(e => {
    weatherOutput.innerHTML += `
         <h2>${location}</h2>
         <h2>${date, hour}</h2>
         <li>
           <div>${formattedDay}</div>
           <div>${e.main.temp} C°</div>
           <div>${e.weather[0].description}</div>
        </li>`
    });
})

.catch((error) => {
    console.log(error);
});