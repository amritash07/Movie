const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require("http");
var app=express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var movies=[]
app.get("/",function(req,res)
{
  res.render("index",{movie:movies})
})
app.post("/",function(req,res)
{
     let title=req.body.name
     let url="http://www.omdbapi.com/?i=tt3896198&apikey=a5a158c9&s="+title

     http.get(url, function (response) {
         var newsItems = '';
         response.on("data", function (data) {
             newsItems += data;
         });

         response.on("end", function () {
             var jsonParse = JSON.parse(newsItems);
    movies=[]
    movies=jsonParse.Search
    console.log(movies)
    res.redirect("/")
   })
   })
})
app.listen(3000,function(req,res)
{
  console.log("Connected")
})
