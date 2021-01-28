let selectBox = document.querySelector("#select");
let list;
let list2;


function countries() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      list = this.response;
      list = JSON.parse(list);
     

      for (let index = 0; index < list.length; index++) {
        var opt = document.createElement("option");
        opt.append(list[index].name);
        opt.setAttribute("value", list[index].name);
        selectBox.append(opt);
      }
    }
  };

  xhttp.open("GET", "https://restcountries.eu/rest/v2");
  xhttp.send();
}

countries();

function appended() {
  //appending countries profiles 
  targetCountries=[]
  var targetCountry = list.find((el) => el.name === selectBox.value);

  targetCountries.push(targetCountry.name,targetCountry.capital)
  
  let country = document.querySelector("#country");
  country.innerHTML = `   <h2 >${targetCountry.name}</h2>
  <p >Native Name: ${targetCountry.nativeName}</p>
  <p >Capital: ${targetCountry.capital}</p>
  <p ">Region: ${targetCountry.region}</p>
  <p >Population: ${targetCountry.population}</p>
  <p >Languages: ${targetCountry.languages[0].name} , ${targetCountry.languages[0].nativeName} </p>
  <p >Time Zone: ${targetCountry.timezones[0]}</p>`;

  //Calling code
  let calling_code = document.querySelector("#call");
  calling_code.innerHTML = `${targetCountry.callingCodes[0]}`;

  //APPENDING FLAG
  let flag = document.querySelector(".flag");
  flag.innerHTML = ` <img id="image" src="${targetCountry.flag}" alt="${targetCountry.name}">`;

  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
     
      list2=this.response
      list2=JSON.parse(list2)
     
      weatherr()
      
      map()
     
      
    }
  };
  xhttp2.open("GET", `http://api.openweathermap.org/data/2.5/weather?q=${targetCountry.capital}&APPID=ba2283fcc7b39a2342e38bcfc3f2bd3f`,false);
  xhttp2.send();
}


function weatherr(){
    //Appending weather
    
 let weather= document.querySelector(".weather")
 weather.innerHTML=` <h2 class="h2-weather">Capital Weather Report</h2>
 <div class="icon"><img class="imagee" src=http://openweathermap.org/img/wn/${list2.weather[0].icon}.png>
 <p id="description">${list2.weather[0].description}</p></div>
 
 <p>Wind speed: ${list2.wind.speed}MS </p>
 <p>Temperature: ${list2.main.temp}F </p>
 <p>Humidity: ${list2.main.humidity}% </p>
 <p>Visibility: ${list2.visibility}M </p> `;
 //>
}




// Appending Map
// READY CODE FOR MAP
function map(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpcmV6YWNvZGVyIiwiYSI6ImNranN0MGxpNjJscXkzMG1qbW9pcmg4Y2EifQ.ZP5RZ01Y-66L6b1salD8GQ';
    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding
    .forwardGeocode({
    query: targetCountries[1],
    autocomplete: false,
    limit: 1
    })
    .send()
    .then(function (response) {
    if (
    response &&
    response.body &&
    response.body.features &&
    response.body.features.length
    ) {
    var feature = response.body.features[0];
     
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: feature.center,
    zoom: 10
    });
    new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
    }
    });
}
// >>