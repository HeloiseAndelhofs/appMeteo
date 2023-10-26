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
    fetch(apiUrl)
    .then((response) => {
        return response.json()
    })
    .then((responseJson) => {
        const list = responseJson.list;
        const location = responseJson.city.name;
        const myArray = responseJson.list[5].dt_txt.split(" ");
        const splitHours = myArray[1].split(':');
        console.log(`${splitHours[0]}:${splitHours[1]}`);
        const day = new Date(responseJson.list[5].dt_txt);
        const formattedDay = day.toLocaleString('fr-FR', {
            weekday: "long",
        });
        function hoursFormatted(){
            const hour = day.getHours().toString();
            console.log(hour);
            const formattedHours = hour;
            if (formattedHours >= 10) {
                formattedHours.padEnd(5, ":00")
            } else {
                formattedHours.padEnd(4, ":00")
            }
        };
    weatherOutput.innerHTML = `<h2>${location}</h2>`;
    list.forEach(e => {
        weatherOutput.innerHTML += `
        <li>
        <div>${formattedDay}</div>
        <div>${e.dt_txt}</div>
        <img src="https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" alt="">
        <div>${e.main.temp} C°</div>
        <div>${e.weather[0].description}</div>
        </li>`
    });
})

.catch((error) => {
    console.log(error);
})
});