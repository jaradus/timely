// TABLE OF CONTENTS
// -----------------
// [1] Page elements
// [2] Geolocates the browser
// [5] On page load instructions (this launches [1])
// =====================================================================


// [1] Everything that pertains to the application infrastructure
// ==============================================================
var app = app || {
  
  initialize: function() {
    var self = this;
    this.latitude
    this.longitude
    // local_time is set by time_check.js
    this.local_time
    this.elements = {
      // $location: $('#location'),
      // $device: $('#device'),
      $alert: $('.alert')
    }

    getLocation();
    this.local_time = timeCheck();
    // setRender() renders a page depending upon the browser screen. Keep commented out to load one main page.
    // setRender();
    console.log("Page rendered");
  }
}

// [2] Gets the browser's location
// ===============================
var getLocation = function() {
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function(position) {
      app.latitude = position.coords.latitude;
      app.longitude = position.coords.longitude;
      console.log("Latitude "+app.latitude);
      console.log("Longitude "+app.longitude);
      // CALLBACK: Sends the AJAX call to the controller
      sendLocation(app.latitude, app.longitude, app.local_time);
      })
  } else {
    app.elements.$alert.append("Geolocation is not supported by this browser.")
  }

  console.log("Geolocation checked");
}

var sendLocation = function(lat, lon, time) {
  console.log(lat+", "+lon+", "+time);
  
  var params = {
            latitude: lat,
            longitude: lon,
            local_time: time
            };

  sendUserData(params);
}

var sendUserData = function sendUserData(params) {
  console.log("Requst made to Yelp API")
  $.ajax({
    url: '/api_call',
    method: 'post',
    dataType: 'json',
    data: params,
    // success: getYelp()
    success: function(data){
      // Return from the Yelp API call
      console.log("Data returned from Yelp");

      // Calls the Yelp Review render on success
      var yelp_recommendations = data;
      recommendationsView.initialize(yelp_recommendations);

      // var list_data = data;
      //testing to see if object gets passed to renderYelpItem function
      // data.forEach(function(yelp_item_attr) {
      //   var ul = renderYelpItem(yelp_item_attr);
      //   $("#site_container").prepend(ul);
      // });

    }
  });
}

// [5] When File has Completed Loading
// ===================================

$(function(){

  switch (window.location.pathname){
    case "/":
      app.initialize();
      break;
    case "/user/preferences":
      pref.initialize();
      break;
  }

})





















