//function that creates card
//sample call:(patna,IN,25.5,82.3,33,29,37,2,45,'05:45:34','6:10:12','cloudy')
function createCard(cityName,countryName,lon,lat,temp,tempMin,tempMax,windSpeed,cloudiness,sunrise,sunset,weather)
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
  countryPara.textContent = `${countryName} ${lat}°N ${lon}°E`;
  topDiv.appendChild(countryPara);//country added

  //weather logo
  let weatherMain = document.createElement('p');
  weatherMain.classList.add('weather-logo-main');
  let weatherImage = document.createElement('img');
  weatherImage.src = '../Icons/03d.png';//this had to be already fetched and avlbl globally
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
  let minMaxPara = document.createElement('p');
  minMaxPara.classList.add('temp');
  minMaxPara.innerHTML = `Max<em style='color:red'>&#9650;</em> ${tempMax}°C  Min<em style='color:rgb(69, 69, 209)'>&#9660;</em> ${tempMin}°C`;
  topDiv.appendChild(minMaxPara);//minMax temp added 

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


//adding appropriate event listener
const cardContainer = document.querySelector('#cards-collection');
const searchButton = document.querySelector('#submit-button');
const searchBar = document.querySelector('#search-box');

searchBar.addEventListener('keyup',(event)=>{
  if(event.key==='Enter')
  {
    document.activeElement.blur();
    
    if(event.target.value==='')//give alert
    {
      alert('please enter city name');
    }
    else
    {
      createCard('patna','IN',25.5,82.3,33,29,37,2,45,'05:45:34','6:10:12','cloudy');//here we would first fetch weather data and then connect
      event.target.value='';
    }
  }
});
searchButton.addEventListener('click',(event)=>{
  document.activeElement.blur();
  if(searchBar.value==='')
  {
    alert('please enter city name');
  }
  else
  {
    createCard('patna','IN',25.5,82.3,-33,-37,-30,2,45,'05:45:34','6:10:12','cloudy');//here we would first fetch weather data and then connect
    searchBar.value='';
  }
});