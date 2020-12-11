require('dotenv').config();
const express=require('express');
const app =express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const https= require("https");




const { resolve } = require("path");


app.get('/',function(req,res){
    res.render("index");
});


app.get('/weather',function(req,res){
    res.render("weather");
});


app.get('/result',function(req,res){
    res.render("result");
});


app.post("/weather",function(req,res){

    const query = req.body.cityName;
    const apiKey=process.env.API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data)
        {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
             const iconData=weatherData.weather[0].icon;
             const imgURL= "http://openweathermap.org/img/wn/"+iconData+"@2x.png";
             const windInfo=weatherData.wind.speed;
            const cloudInfo=weatherData.clouds.all;
              const humidityInfo=weatherData.main.humidity;
              const countryInfo=weatherData.sys.country;
              const pressureInfo=weatherData.main.pressure;
            res.render("result",{query:query,temp:temp,desc:desc, iconData:iconData, windInfo:windInfo, cloudInfo:cloudInfo,
                                    humidityInfo: humidityInfo, countryInfo:countryInfo, pressureInfo: pressureInfo});
        });
    });

});

app.listen(3000,function(){
    console.log("The server is listening at port 3000.");
});
