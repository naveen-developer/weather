

const d = new Date();
let Hours = d.getHours();
let Minutes = d.getMinutes();

document.querySelector('.time').innerHTML = Hours+':'+Minutes;

function animationCheck(){
let element1 = document.querySelector(".weather-picture");
let element2 = document.querySelector(".degree");
let element3 = document.querySelector(".sec3");
setTimeout(() => {
element1.classList.remove("weather-iconAnimation");
element2.classList.remove("degreeAnimation");
element3.classList.remove("sec3Animation");
},1000)
  
}
animationCheck()



async function checkWeather(){
        let city = document.getElementById('city').value;
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f58c1f7e6447b1f9a5e896e36a779dfe`;
        const response = await fetch(URL);
        const data = await response.json();


        document.querySelector('.degree').innerHTML = formatTemperature(Math.round(data.main.temp).toString())+"<sup>o</sup>";
        let degreeValue = formatTemperature(Math.round(data.main.temp).toString())
              if (degreeValue > 35) {
                document.querySelector('.title-text').innerHTML = "Sunny";
                document.querySelector('.main-container').style.backgroundColor = '#FFEB3D';
                document.querySelector('.screen-design').style.backgroundColor = "#FFFFC0";
                document.querySelector('.sec3').style.backgroundColor = "#F2DC9B";
                document.querySelector('#city').style.backgroundColor = "#FFFFC0";
                document.querySelector('#cbutton').style.backgroundColor = "#FFFFC0";
                document.querySelector('.weather-picture').src = 'sun-icon.png'; 

              } else if (degreeValue > 31) {
                document.querySelector('.title-text').innerHTML = "Cloudy";
                document.querySelector('.main-container').style.backgroundColor = '#C6EDFF';
                document.querySelector('.screen-design').style.backgroundColor = "#EBFFFF";
                document.querySelector('.sec3').style.backgroundColor = "#C7EDFF";
                document.querySelector('#city').style.backgroundColor = "#EBFFFF";
                document.querySelector('#cbutton').style.backgroundColor = "#EBFFFF";
                document.querySelector('.weather-picture').src = 'clouds-icon.png';
              } else {
                document.querySelector('.title-text').innerHTML = "Thunder";
                document.querySelector('.main-container').style.backgroundColor = '#8F9097';
                document.querySelector('.screen-design').style.backgroundColor = "#70727D";
                document.querySelector('.sec3').style.backgroundColor = "#8F9097";
                document.querySelector('#city').style.backgroundColor = "#70727D";
                document.querySelector('#cbutton').style.backgroundColor = "#70727D";
                document.querySelector('.weather-picture').src = 'thunder-icon.png';
              }



        document.querySelector('.city-name').innerHTML = data.name;

        document.querySelector('.rain-value').innerHTML = data.main.humidity
        document.querySelector('.temparature-value').innerHTML = data.main.temp;
        document.querySelector('.wind-value').innerHTML = data.wind.speed;

let element1 = document.querySelector(".weather-picture");
let element2 = document.querySelector(".degree");
let element3 = document.querySelector(".sec3");
element1.classList.add("weather-iconAnimation");
element2.classList.add("degreeAnimation");
element3.classList.add("sec3Animation");
animationCheck()

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


