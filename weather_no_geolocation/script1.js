/**
 * Created by macpro on 12/17/15.
 */

$(document).ready(function() {
    weatherData();
});

var cityName = document.getElementById("city"),
    descript = document.getElementById("description"),
    temperature = document.getElementById("temp"),
    tempIcon = document.getElementById("icon"),
    windSpeed = document.getElementById("wind");


$("#go").click(function (){
    $("user_input").focus();
    eventListener();
    showImgs();
});

$("#user_input").keypress(function(e) {
    if(e.keyCode == 13) {
        eventListener();
        showImgs();
    }
});

///City

function weatherData(lat, lng) {
    var url = "http://api.openweathermap.org/data/2.5/weather?",
        appId = "&APPID=08476c9cf2256da6c859372f3d474f8f";

    if(lat != undefined && lng != undefined) {
        var apiUrl = url + "lat=" + lat + "&lon=" + lng + "&units=imperial" + appId;
        console.log(apiUrl);
        dataInfo(apiUrl);
    }
}

function eventListener() {
    var cityState = $("#user_input").val();
    if (cityState.charAt(cityState.length-3) == " ") {
    var cityApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityState + "&units=imperial" + "&APPID=08476c9cf2256da6c859372f3d474f8f";

    cityName.innerText = cap(cityState);

     dataInfo(cityApiUrl);
    } else {
        alert('Please enter city, state');
    }
    $("#user_input").attr("placeholder", "City, State").val("");
}

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

//Input box

$('#user_input').on({
    'mouseenter': function() {
        $('#user_input').attr('placeholder', '');
    },
    'mouseleave': function() {
        $('#user_input').attr('placeholder', 'city, state');
    }
})


//Show info_content

function showImgs() {
    $("#info_content").addClass("show");
}




