/**
 * Created by macpro on 12/1/15.
 */

$(document).ready(function() {
    getLocation();
    init();
    weatherData();
});

var cityName = document.getElementById("city"),
    descript = document.getElementById("description"),
    temperature = document.getElementById("temp"),
    tempIcon = document.getElementById("icon"),
    windSpeed = document.getElementById("wind");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        cityName.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    //console.log(lat, lng);
    weatherData(lat,lng);
    codeLatLng(lat, lng)
}

function init() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);

            if (results) {
                var address = results[0].address_components[3].long_name + ', ' +     results[0].address_components[5].short_name;
                cityName.innerText = address;
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

function weatherData(lat, lng) {
    var url = "http://api.openweathermap.org/data/2.5/weather?",
        appId = "&APPID=08476c9cf2256da6c859372f3d474f8f";

    if(lat != undefined && lng != undefined) {
        var apiUrl = url + "lat=" + lat + "&lon=" + lng + "&units=imperial" + appId;
        //console.log(apiUrl);
        dataInfo(apiUrl);
    }
}

//change city

$("#change_city").click(function() {
    $("#input_field").toggleClass("show");
});

function eventListener() {
    var cityState = $("#user_input").val();
    var cityApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&units=imperial" + "&APPID=08476c9cf2256da6c859372f3d474f8f";

    cityName.innerText = cap(cityState);

    dataInfo(cityApiUrl);
    $("#user_input").attr("placeholder", "City, State").val("");
}

$("#go").click(function (){
    $("user_input").focus();
    eventListener();
});

$("#user_input").keypress(function(e) {
    if(e.keyCode == 13) {
        eventListener();
    }
});

function dataInfo (url) {
    $.get(url, function( data ) {
        descript.innerText = data.weather[0].description;
        var tempF = (data.main.temp).toFixed(0);
        temperature.innerHTML = tempF + "&deg;" +" F";
        var iconId = data.weather[0].icon,
            iconUrl = "http://openweathermap.org/img/w/",
            icon = iconUrl + iconId + ".png";
        tempIcon.src = icon;
        windSpeed.innerText = "Wind at " + data.wind.speed + " mph";

    });
}

//Capitalize

function cap(name) {
    var afterComma, newName, splitName, splitState, completeName = [];

        if (name.indexOf(',') != -1) {
            afterComma = name.indexOf(',') + 1;

            if (name.charAt(afterComma) != " ") {
                newName = name.slice(0, afterComma) + " " + name.slice(-2);
            } else {
                newName = name;
            }
        } else if (name.indexOf(',') == -1 && name.charAt(name.length-3) == " ") {
            newName = name.slice(0, name.length-3) + ", " + name.slice(-2);
        }

        splitName = newName.split(" ");
        splitState = splitName.length - 1;

        if (splitName[splitState].length == 2) {
           splitName[splitState] = splitName[splitState].toUpperCase();
        }

        for (var i = 0; i < splitName.length; i++) {
            completeName.push(splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1));
        } return completeName.join(" ");
}



