let currentLocation = document.getElementById("currentLocation");
let searchInput = document.getElementById("searchInput");
let lowTemp = document.getElementById("lowTemp");
let highTemp = document.getElementById("highTemp");
let currentTemp = document.getElementById("currentTemp");

let searchBar = document.getElementById("searchBar").addEventListener("click", function(){
    getLocation(searchInput.value);
    searchInput.value = "";
})
 
let saveCityBtn = document.getElementById("saveCityBtn").addEventListener("click", function(){

});


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




