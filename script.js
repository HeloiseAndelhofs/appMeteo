//variables
const cityName = document.getElementById("cityName");
const button = document.getElementById("button");
const weatherTemplate = document.getElementById("weatherTemplate");
let weatherOutput = document.getElementById("weatherOutput");
const apiKey = "03368b30afe0d56755bf6d1ce4341ad4";
const city = "Bruxelles";
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&cnt=1&units=metric&timezone=Z`;

//fetch
fetch(apiUrl)
.then((response) => {
    return response.json()
})
.then((responseJson) => {
    const list = responseJson.list;
    const temp = list[0].main.temp_min;
    const caption = list[0].weather[0].description;
    const date = list[0].dt_txt;
    const formattedDate = date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const location = responseJson.city.name;
    const day = new Date();
    const formattedDay = day.toLocaleString('fr-FR', {
        weekday: "long",
      });;


list.forEach(e => {
    weatherOutput.innerHTML = `
         <li>
           <div>${e.formattedDay}</div>
           <div>${formattedDate}</div>
           <div>${location}</div>
           <div>${temp} C°</div>
           <div>${caption}</div>
        </li>`
})
})
.catch((error) => {
    console.log(error);
});