//function that creates card
//sample call:(patna,IN,25.5,82.3,33,29,37,2,45,'05:45:34','6:10:12','cloudy')
function createCard(cityName,countryName,lon,lat,temp,tempMin,tempMax,windSpeed,cloudiness,sunrise,sunset,weather,icon)
{
  //top div
  let topDiv = document.createElement('div');
  topDiv.classList.add('card', 'card-body', 'col-sm-6', 'col-md-3', 'card-background');
  //city header
  let cityHeader = document.createElement('h3');
  cityHeader.classList.add('city-name');
  cityHeader.textContent = cityName;
  topDiv.appendChild(cityHeader);//city added

  //country and coordinate 
  let countryPara = document.createElement('p');
  countryPara.classList.add('country-name');
  countryPara.textContent = `${countryName}`;
  topDiv.appendChild(countryPara);//country added

  //city coordinates
  let cityCoordinate = document.createElement('p');
  cityCoordinate.classList.add('city-coordinates');
  cityCoordinate.textContent = `${lat}°N  ${lon}°E`;
  topDiv.appendChild(cityCoordinate);

  //weather logo
  let weatherMain = document.createElement('p');
  weatherMain.classList.add('weather-logo-main');
  let weatherImage = document.createElement('img');
  weatherImage.src = `../Icons/${icon}.png`;//this had to be already fetched and avlbl globally
  weatherImage.style.width = '50%';
  weatherImage.title= weather; //passed as argument
  weatherMain.appendChild(weatherImage);
  topDiv.appendChild(weatherMain);//weather logo added

  //temperature
  let tempPara = document.createElement('p');
  tempPara.classList.add('temp');
  let thermoImage = document.createElement('img');
  thermoImage.src = '../Icons/thermometer.png';//this had to befetched and avlbl globally
  thermoImage.style.width = '20%';
  thermoImage.title= 'temperature'; //passed as argument
  tempPara.appendChild(thermoImage);
  tempPara.appendChild(document.createTextNode(`${temp}°C`));
  topDiv.appendChild(tempPara);//temp added

  //min and max temp
  let minMaxDiv = document.createElement('div');
  minMaxDiv.classList.add('row','align-items-center','extra-info','max-min-temp');
  //1st Col div inside minMaxRowDiv
  let minMaxRowDiv = document.createElement('div');
  minMaxRowDiv.classList.add('col-6');
  let tempParaMax = document.createElement('p');
  tempParaMax.classList.add('temp');
  tempParaMax.innerHTML = `Max<em style='color:red'>&#9650;`;
  minMaxRowDiv.appendChild(tempParaMax);
  tempParaMax = document.createElement('p');
  tempParaMax.classList.add('temp');
  tempParaMax.textContent = `${tempMax}°C`;
  minMaxRowDiv.appendChild(tempParaMax);
  minMaxDiv.appendChild(minMaxRowDiv);
  //2nd Col div inside minMaxRowDiv
  minMaxRowDiv = document.createElement('div');
  minMaxRowDiv.classList.add('col-6');
  let tempParaMin = document.createElement('p');
  tempParaMin.classList.add('temp');
  tempParaMin.innerHTML = `Min<em style='color:rgb(69, 69, 209)'>&#9660;`;
  minMaxRowDiv.appendChild(tempParaMin);
  tempParaMin = document.createElement('p');
  tempParaMin.classList.add('temp');
  tempParaMin.textContent = `${tempMin}°C`;
  minMaxRowDiv.appendChild(tempParaMin);
  minMaxDiv.appendChild(minMaxRowDiv);
  topDiv.appendChild(minMaxDiv);//minm maxm content added
  

  //Extra info
  let InfoRowDiv = document.createElement('div');
  InfoRowDiv.classList.add('row','align-items-center','extra-info');
  //1st Col div inside Extra info
  let windCloudDiv = document.createElement('div');
  windCloudDiv.classList.add('col-6','wind-cloud');
  let ExtraInfoPara = document.createElement('p'); //wind
  let windIcon = document.createElement('img');
  windIcon.src = '../Icons/windSpeed.png';
  windIcon.title = 'wind speed';
  windIcon.classList.add('extra-weather-icon');
  ExtraInfoPara.appendChild(windIcon);
  ExtraInfoPara.appendChild(document.createTextNode(`${windSpeed}m/s`));
  windCloudDiv.appendChild(ExtraInfoPara);

  ExtraInfoPara = document.createElement('p'); //cloud
  let cloudIcon = document.createElement('img');
  cloudIcon.src = '../Icons/03d.png';
  cloudIcon.title = 'cloudiness';
  cloudIcon.classList.add('extra-weather-icon');
  ExtraInfoPara.appendChild(cloudIcon);
  ExtraInfoPara.appendChild(document.createTextNode(`${cloudiness}%`));
  windCloudDiv.appendChild(ExtraInfoPara);
  
  InfoRowDiv.appendChild(windCloudDiv);

  //2nd Col div inside Extra info
  let sunriseSunsetDiv = document.createElement('div');
  sunriseSunsetDiv.classList.add('col-6','sunrise-sunset');
  ExtraInfoPara = document.createElement('p'); //wind
  let sunriseIcon = document.createElement('img');
  sunriseIcon.src = '../Icons/sunrise.png';
  sunriseIcon.title = 'sunrise';
  sunriseIcon.classList.add('extra-weather-icon');
  ExtraInfoPara.appendChild(sunriseIcon);
  ExtraInfoPara.appendChild(document.createTextNode(`${sunrise}`));
  sunriseSunsetDiv.appendChild(ExtraInfoPara);

  ExtraInfoPara = document.createElement('p'); //cloud
  let sunsetIcon = document.createElement('img');
  sunsetIcon.src = '../Icons/sunset.png';
  sunsetIcon.title = 'sunset';
  sunsetIcon.classList.add('extra-weather-icon');
  ExtraInfoPara.appendChild(sunsetIcon);
  ExtraInfoPara.appendChild(document.createTextNode(`${sunset}`));
  sunriseSunsetDiv.appendChild(ExtraInfoPara);
  
  InfoRowDiv.appendChild(sunriseSunsetDiv);

  topDiv.appendChild(InfoRowDiv);//final div added

  cardContainer.prepend(topDiv);//card added to the page

}

function MakeRequest(url)
{
  fetch(url)
  .then((response)=>{
    console.log(response);
    return response.json();
  })
  .then((weatherObject)=>{
    console.log(weatherObject);

    /* parse response */
    let temp = weatherObject.main.temp;
    let tempMax = weatherObject.main.temp_max;
    let tempMin = weatherObject.main.temp_min;
    let weather = weatherObject.weather[0].main;
    let windSpeed = weatherObject.wind.speed;
    let cloudiness = weatherObject.clouds.all;
    let description = weatherObject.weather[0].description;//planning to add it into header
    let cityName = weatherObject.name
    let {lon,lat} = weatherObject.coord;
    let icon = weatherObject.weather[0].icon;
    let countryName = countries[weatherObject.sys.country];//countries defined in countries.js
    let time = new Date(weatherObject.sys.sunrise *1000);
    let sunrise = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    time = new Date(weatherObject.sys.sunset *1000);
    let sunset = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    /* create and insert element */
    createCard(cityName,countryName,lon,lat,temp,tempMin,tempMax,windSpeed,cloudiness,sunrise,sunset,weather,icon)

  })
  .catch((error)=>console.log('Error : '+error)); 
}



//adding appropriate event listener
const cardContainer = document.querySelector('#cards-collection');
const searchButton = document.querySelector('#submit-button');
const searchBar = document.querySelector('#search-box');
const countryDropdown = document.querySelector('#country-select');

searchBar.addEventListener('keyup',(event)=>{
  if(event.key==='Enter')
  {
    
    if(event.target.value==='')//give alert
    {
      alert('please enter city name');
    }
    else
    {
      let url = `http://localhost:8080/weather?${searchBar.name}=${searchBar.value},${countryDropdown.value}`;
      //debug
      console.log('url : ',url);
      
      MakeRequest(url);
      // createCard('patna','IN',25.5,82.3,33,29,37,2,45,'05:45:34','6:10:12','cloudy');//here we would first fetch weather data and then connect

      /* resetting to default values */
      countryDropdown.selectedIndex = 0;
      document.activeElement.blur();
      event.target.value='';
    }
  }
});
searchButton.addEventListener('click',(event)=>{

  if(searchBar.value==='')
  {
    alert('please enter city name');
  }
  else
  {
    let url = `http://localhost:8080/weather?${searchBar.name}=${searchBar.value},${countryDropdown.value}`;
    //debug
    console.log('url : ',url);
      
    MakeRequest(url);
    // createCard('patna','IN',25.5,82.3,-33,-37,-30,2,45,'05:45:34','6:10:12','cloudy');//here we would first fetch weather data and then connect

    /* resetting to default values */
    countryDropdown.selectedIndex = 0;
    searchBar.value='';
    document.activeElement.blur();
  }
});
