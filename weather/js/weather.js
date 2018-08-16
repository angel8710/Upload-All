//IIFE - Immediately invoked function expression

(function(){
 
//Define module
 
app= angular.module("WeatherApp",[]);


 
var WeatherController = function($scope,$http) {
 
 $scope.title = "Weather Information";
 
 $scope.getWeatherData = function() {
 
 //Calling http service
 
 $http.get("http://api.apixu.com/v1/forecast.json?key=29d83fa2298a47d29bb121845161212&q={London}" + $scope.place)
 .then(onSuccess, onError);
 };
 //Success method
 
 var onSuccess = function(response) {
 $scope.message = "Weather Information for " + $scope.place;
 $scope.weatherData = response.data;
 };
 //Error method
 
 var onError = function(response) {
 $scope.info = "Could not retrieve data";
 };
 
};
 
//Register controller with module
app.controller("WeatherController",WeatherController);
 
}());