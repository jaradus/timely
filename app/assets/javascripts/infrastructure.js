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

  //sendUserData(params)

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

      var list_data = data;
      //testing to see if object gets passed to renderYelpItem function
      data.forEach(function(yelp_item_attr) {
        var ul = renderYelpItem(yelp_item_attr);
        $("#site_container").prepend(ul);
      });

    }
  });
}

// Loading Screen while waiting for the API Ajax Return
// ====================================================
// var loading = {

//   initialize: function() {
//     var self = this;
//     this.lines: 11 // The number of lines to draw
//     this.length: 20 // The length of each line
//     this.width: 10 // The line thickness
//     this.radius: 30 // The radius of the inner circle
//     this.corners: 1 // Corner roundness (0..1)
//     this.rotate: 0 // The rotation offset
//     this.direction: 1 // 1: clockwise, -1: counterclockwise
//     this.color: '#000' // #rgb or #rrggbb or array of colors
//     this.speed: 1 // Rounds per second
//     this.trail: 68 // Afterglow percentage
//     this.shadow: false // Whether to render a shadow
//     this.hwaccel: false // Whether to use hardware acceleration
//     this.className: 'spinner' // The CSS class to assign to the spinner
//     this.zIndex: 2e9 // The z-index (defaults to 2000000000)
//     this.top: 'auto' // Top position relative to parent in px
//     this.left: 'auto' // Left position relative to parent in px
//   };

  // loading.$target = $('loading_screen');

  // putLoading: function() {
  //   new Spinner(loading.opts).spin(loading.$target);
  // }

  // removeLoading: function() {
  //   this.stop();
  // }

// }

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





















