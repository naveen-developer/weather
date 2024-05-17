

const d = new Date();
let Hours = d.getHours();
let Minutes = d.getMinutes();

document.querySelector('.time').innerHTML = Hours+':'+Minutes;


function animationCheck() {
    const elements = ['.weather-picture', '.degree', '.sec3'];
    setTimeout(() => {
          elements.forEach(elementClass => {
        const element = document.querySelector(elementClass);
        element.classList.remove(`${elementClass.substring(1)}Animation`);
    });                  
        }, 1000)

}
animationCheck()


async function checkWeather(){
        const city = document.getElementById('city').value;
        const apikey = 'f58c1f7e6447b1f9a5e896e36a779dfe';
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
        
        try{
          const response = await fetch(URL);
        const data = await response.json();
        console.log(data)
        if(data.cod == '404'){
          //alert(`Sorry, the entered city ${city} name is invalid. Please try again.`);
          errorMessage(city);
        }
        // (data.cod === '404') ? alert(data.message) : "";

        updateWeatherUI(data);

        }catch(e){
          console.error("Error fetching weather data ",error);
        }


animateElements()
animationCheck()

 }

checkWeather();

function animateElements() {
    const elements = ['.weather-picture', '.degree', '.sec3'];
    elements.forEach(elementClass => {
        const element = document.querySelector(elementClass);
        element.classList.add(`${elementClass.substring(1)}Animation`);
    });
}


function updateWeatherUI(data){
    const temperature = Math.round(data.main.temp);
    const degreeValue = formatTemperature(temperature.toString());
    const weatherType = getWeatherType(degreeValue);

    document.querySelector('.degree').innerHTML = `${degreeValue}<sup>o</sup>`;
    document.querySelector('.title-text').innerHTML = weatherType.text;
    document.querySelector('.main-container').style.backgroundColor = weatherType.backgroundColor.main;
    document.querySelector('.screen-design').style.backgroundColor = weatherType.backgroundColor.screen;
    document.querySelector('.sec3').style.backgroundColor = weatherType.backgroundColor.sec3;
    document.querySelector('#city').style.backgroundColor = weatherType.backgroundColor.inputButton;
    document.querySelector('#cbutton').style.backgroundColor = weatherType.backgroundColor.inputButton;
    document.querySelector('.weather-picture').src = weatherType.icon;
    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.rain-value').innerHTML = data.main.humidity+"%";
    document.querySelector('.temparature-value').innerHTML = degreeValue+"%";
    document.querySelector('.wind-value').innerHTML = data.wind.speed+"m/s";
}


function getWeatherType(degreeValue){
      if (degreeValue > 35) {
        return {
            text: "Sunny",
            backgroundColor: {
                main: '#FFEB3D',
                screen: "#FFFFC0",
                sec3: "#F2DC9B",
                inputButton: "#FFFFC0"
            },
            icon: 'sun-icon.png'
        };
    } else if (degreeValue > 31) {
        return {
            text: "Cloudy",
            backgroundColor: {
                main: '#C6EDFF',
                screen: "#EBFFFF",
                sec3: "#C7EDFF",
                inputButton: "#EBFFFF"
            },
            icon: 'clouds-icon.png'
        };
    } else {
        return {
            text: "Thunder",
            backgroundColor: {
                main: '#8F9097',
                screen: "#70727D",
                sec3: "#8F9097",
                inputButton: "#70727D"
            },
            icon: 'thunder-icon.png'
        };
    }
}







 function formatTemperature(num){

// Get the length of the string
let length = num.length;

// Calculate the index of the middle character
let middleIndex = Math.floor(length / 2);

// Remove the middle character
let result = num.substring(0, middleIndex) + num.substring(middleIndex + 1);

return result;

 }


function errorMessage(city){
document.querySelector('.error-message').style.display = 'block';  
const errorMessage = `Sorry, the entered city ${city} name is invalid. Please try again.`;
const errorContainer = document.querySelector('.error-text');
errorContainer.textContent = errorMessage;
errorContainer.setAttribute('role', 'alert');
errorContainer.setAttribute('aria-live', 'assertive');

// Remove the error message after a certain time (e.g., 5 seconds)
setTimeout(() => {
document.querySelector('.error-message').style.display = 'none';
    errorContainer.textContent = ''; // Clear the error message
    errorContainer.removeAttribute('role'); // Remove the role attribute
    errorContainer.removeAttribute('aria-live'); // Remove the aria-live attribute

    document.getElementById('city').focus();
}, 5000); // 5000 milliseconds (5 seconds), adjust as needed

}

