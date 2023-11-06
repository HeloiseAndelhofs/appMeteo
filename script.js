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


        list.forEach((e, index) => {
        const myArray = e.dt_txt.split(" ");
        const splitHours = myArray[1].split(':');
        const day = new Date(e.dt_txt);
        const formattedDay = day.toLocaleString('fr-FR', {
            weekday: "long",
        });

        
        const temp = e.main.temp;

        const weatherClass = e.weather[0].description.toLowerCase().replace(' ', '-');

        if (temp < 0 && index === 0) {
            document.body.style.background = "url(./iced.gif)"
        } else if (index === 0) {
            document.body.style.background = getBackgroundImage(weatherClass);
        }

        
        weatherOutput.innerHTML += `
        <li class="${weatherClass}">
        <img src="https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png" alt="">
        <div>${formattedDay}</div>
        <div>${splitHours[0]}:${splitHours[1]}</div>
        <div>${temp} C°</div>
        <div>${e.weather[0].description}</div>
        </li>`;
    });
    

    
    function getBackgroundImage(weatherClass) {

    const backgroundImages = {
        'couvert': "url(./storm.gif)",
        'nuageux': "url(./clouds.gif)",
        'partiellement-nuageux': "url(./clouds.gif)",
        'peu-nuageux': "url(./fewClouds.gif)",
        'pluie-modérée': "url(./rain.gif)",  
        'légère-pluie': "url(./rain.gif)", 
        'ciel-dégagé': "url(./sun.gif)"
    };
        
        const defaultColor = 'rgb(143, 153, 172)';
        
        return backgroundImages[weatherClass] || defaultColor;
    };
    
})

.catch((error) => {
    console.log(error);
})
});