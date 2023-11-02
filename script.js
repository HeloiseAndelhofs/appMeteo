//variables
const cityName = document.getElementById("cityName");
const button = document.getElementById("button");
const weatherTemplate = document.getElementById("weatherTemplate");
const weatherOutput = document.getElementById("weatherOutput");
const apiKey = "03368b30afe0d56755bf6d1ce4341ad4";

//fetch
button.addEventListener("click", () => {
    const city = cityName.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&cnt=8&units=metric&timezone=Z`;

    weatherOutput.innerHTML = '';

    fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((responseJson) => {
        const list = responseJson.list;
        const location = responseJson.city.name;
        const title = document.getElementsByTagName("h1");

        title[0].innerHTML = `Météo à ${location}`;


        list.forEach(e => {
        const myArray = e.dt_txt.split(" ");
        const splitHours = myArray[1].split(':');
        const day = new Date(e.dt_txt);
        const formattedDay = day.toLocaleString('fr-FR', {
            weekday: "long",
        });
        weatherOutput.innerHTML += `
        <li>
        <img src="https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" alt="">
        <div>${formattedDay}</div>
        <div>${splitHours[0]}:${splitHours[1]}</div>
        <div>${e.main.temp} C°</div>
        <div>${e.weather[0].description}</div>
        </li>`
    });
})

.catch((error) => {
    console.log(error);
})
});