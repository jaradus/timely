
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
    this.elements = {
      $location: $('#location'),
      $device: $('#device')
    }

    getLocation();
    setRender();
    console.log("Page rendered")
  }
}

// [2] Gets the browser's location
// ===============================
var getLocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    app.latitude = position.coords.latitude;
    app.longitude = position.coords.longitude;
  })
  console.log("Geolocation checked")
}

// [3] Decides which version of the page to render
// ===============================================
var setRender = function() {
  // Calculated window width, then sets which render is applicable for the client's browser
  var window_width = document.documentElement.clientWidth
    
  if (window_width > 640) {
    mainView.desktopRender();
  } else {
    mainView.mobileRender();
  }
  console.log("Appropriate device rendered")
}

// [4] Renders the main page
// =========================
var mainView = {

  desktopRender: function() {
    app.elements.$device.append("You're a big screen!");
    app.elements.$location.append("Latitude: "+app.latitude+", longitude: "+app.longitude);
  },

  mobileRender: function() {
    app.elements.$device.append("You're a mobile device!");
    app.elements.$location.append("Latitude: "+app.latitude+", longitude: "+app.longitude);
  }

}

// [5] When File has Completed Loading
// ===================================

$(function(){

  app.initialize();

})