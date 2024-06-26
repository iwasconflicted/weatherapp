let favCity = [];
let favArr = [];
// let savedCity = "";
let defaultCity = "Stockton";

let currentLocation = document.getElementById("currentLocation");
let searchInput = document.getElementById("searchInput");
let lowTemp = document.getElementById("lowTemp");
let highTemp = document.getElementById("highTemp");
let currentTemp = document.getElementById("currentTemp");

let dayOne = document.getElementById("dayOne");
let dayTwo = document.getElementById("dayTwo");
let dayThree = document.getElementById("dayThree");
let dayFour = document.getElementById("dayFour");
let dayFive = document.getElementById("dayFive");

let dayOneTemp = document.getElementById("dayOneTemp");
let dayTwoTemp = document.getElementById("dayTwoTemp");
let dayThreeTemp = document.getElementById("dayThreeTemp");
let dayFourTemp = document.getElementById("dayFourTemp");
let dayFiveTemp = document.getElementById("dayFiveTemp");


let searchBar = document.getElementById("searchBar").addEventListener("click", function(){
    getLocation(searchInput.value);
    searchInput.value = "";
});
 

let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let d = new Date();
let day = daysOfWeek[d.getDay()];
dayOne.innerText = daysOfWeek[d.getDay()+1];
dayTwo.innerText = daysOfWeek[d.getDay()+2];
dayThree.innerText = daysOfWeek[d.getDay()+3];
dayFour.innerText = daysOfWeek[d.getDay()+4];
dayFive.innerText = daysOfWeek[d.getDay()+5];


// Save into favorites
let saveCityBtn = document.getElementById("saveCityBtn").addEventListener("click", function(){
    document.getElementById("saveCityBtn").src = "./assets/heart.png";
    let obj ={
        "cityName" : favCity["0"].name
    }
        console.log(obj);
        favArr.push(obj);
        console.log(favArr);
        localStorage.setItem("favoriteCity", JSON.stringify(favArr));
        console.log(localStorage);

        let colDiv = document.createElement("div");
        colDiv.classList = "col"; 
        let pTag = document.createElement("p");
        pTag.innerText = favCity["0"].name; 
        pTag.addEventListener("click", function(){
            getLocation(pTag.innerText);
        });

        colDiv.appendChild(pTag);
        saveHere.appendChild(colDiv);
});

// Grabs an instance of our favorites list and store it in our array so we can populate the page with our favorites
let favData = JSON.parse(localStorage.getItem("favoriteCity"));
console.log(JSON.parse(localStorage.favoriteCity));

if(favData && favData != null){
    
    favArr = favData; 
    // Go through our array of favorites and make elements for each entry in the same way we do when we save a new favorite
    for(let i = 0; i < favArr.length; i++){
        let colDiv = document.createElement("div");
        colDiv.classList = "col";
        let pTag = document.createElement("p");
        pTag.innerText = favArr[i].cityName; 
        pTag.addEventListener("click", function(){
            getLocation(favArr[i].cityName);
        });

        colDiv.appendChild(pTag);
        saveHere.appendChild(colDiv);
    }
}

// Delete Favorites
//  let deleteCityBtn = document.getElementById("deleteCityBtn").addEventListener("click", function(){
//      document.getElementById("deleteCityBtn").src = "../assets/icon_trash_.png";

let deleteCityBtn = document.getElementById("deleteCityBtn")

deleteCityBtn.addEventListener("click", function(){
    for(let i = 0; i < favArr.length; i++){
        if(currentLocation.innerText === favArr[i].cityName){
    // if(currentLocation.innerText.toLowerCase() === favArr[i].pokeName.toLowerCase()){
         // remove the element from the page
            favArr.splice(i, 1);
                // remove the element from the page
            let colDiv = saveHere.getElementsByClassName("col")["0"];
            saveHere.removeChild(colDiv);
          
        }
          localStorage.removeItem("favoriteCity", JSON.stringify(favArr));

    }
    console.log(favArr);
    console.log(localStorage);
 });
//  Have to refresh page in order to delete for some reason


async function getLocation(cityName){
    let weatherApi = await fetch("http://api.openweathermap.org/geo/1.0/direct?q="+ cityName +"&limit=2&appid=206b289f9429e5805345fdcf42f2d083").then((Response) => Response.json());
    console.log(weatherApi);
    lat = weatherApi["0"].lat.toString();
    lon = weatherApi["0"].lon.toString();
    currentLocation.innerText = weatherApi["0"].name;
    getCurrentWeather(lat, lon);
    getFiveDayForecast(lat, lon);
    favCity = weatherApi;
    // savedCity = favCity.name;
};

// Current Weather
async function getCurrentWeather(lat, lon){
    let weatherApi = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=206b289f9429e5805345fdcf42f2d083&units=imperial").then((Response) => Response.json());
    currentTemp.innerText = weatherApi.main.temp;
    currentTemp.innerText = Math.floor(currentTemp.innerText)+ "°";
    highTemp.innerText = Math.floor(weatherApi.main.temp_max) + "°";
    lowTemp.innerText = Math.floor(weatherApi.main.temp_min)  + "°";
    console.log(weatherApi);
};

//Five day forecast 
async function getFiveDayForecast(lat, lon){
    let weatherApi = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=206b289f9429e5805345fdcf42f2d083&units=imperial").then((Response) => Response.json());
    dayOneTemp.innerText = Math.floor(weatherApi.list["3"].main.temp) + "°";
    dayTwoTemp.innerText = Math.floor(weatherApi.list["6"].main.temp) + "°";
    dayThreeTemp.innerText = Math.floor(weatherApi.list["27"].main.temp) + "°";
    dayFourTemp.innerText = Math.floor(weatherApi.list["33"].main.temp) + "°";
    dayFiveTemp.innerText = Math.floor(weatherApi.list["38"].main.temp) + "°";
   
    // twoIconIcon.src = "./assets/Vector.png";
    // threeIcon.src = "./assets/Vector.png";
    // fourIcon.src = "./assets/Vector.png";
    // fiveIcon.src = "./assets/Vector.png";

    console.log(weatherApi);
};
