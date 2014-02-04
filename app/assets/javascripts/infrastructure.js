
// TABLE OF CONTENTS
// -----------------
// [1] Page elements
// [2] Geolocates the browser
// [3] Determines whether the user is on a desktop or mobile device
// [4] Instructions on how to render the page, depending on device type
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
  params = {
            latitude: lat,
            longitude: lon,
            local_time: time
            };

  sendUserData(params)

}

var sendUserData = function sendUserData(params) {
  $.ajax({
    url: '/api_call',
    method: 'post',
    dataType: 'json',
    data: params,
    // success: getYelp()
    success: function(data){
      console.log("Returned data goes here:");
      console.log(data);
      //testing to see if object gets passed to renderYelpItem function
      data.forEach(function(yelp_item_attr) {
        var ul = renderYelpItem(yelp_item_attr);
        $("#site_container").prepend(ul);
      });

    }
  });
}

// // [3] Decides which version of the page to render
// // ===============================================
// var setRender = function() {
//   // Calculated window width, then sets which render is applicable for the client's browser
//   var window_width = document.documentElement.clientWidth
    
//   if (window_width > 640) {
//     mainView.desktopRender();
//   } else {
//     mainView.mobileRender();
//   }
//   console.log("Appropriate device rendered")
// }

// // [4] Renders the main page
// // =========================
// var mainView = {

//   desktopRender: function() {
//     app.elements.$device.append("You're a big screen!");
//     app.elements.$location.append("Latitude: "+app.latitude+", longitude: "+app.longitude);
//   },

//   mobileRender: function() {
//     app.elements.$device.append("You're a mobile device!");
//     app.elements.$location.append("Latitude: "+app.latitude+", longitude: "+app.longitude);
//   }

// }

// [5] When File has Completed Loading
// ===================================

$(function(){

  app.initialize();

})