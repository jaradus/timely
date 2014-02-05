var pref = {

  initialize: function(){
    var keywords
    pref.tabs = {
      // Tabs
      $morning    : $('#morningTab'),
      $noon       : $('#noonTab'),
      $afternoon  : $('#afternoonTab'),
      $evening    : $('#eveningTab'),
      $night      : $('#nightTab')
    }

    pref.information = {
      // Tab Content
      $morningContent    : $('#morningContent'),
      $noonContent       : $('#noonContent'),
      $afternoonContent  : $('#afternoonContent'),
      $eveningContent    : $('#eveningContent'),
      $nightContent      : $('#nightContent')
    }

    pref.nightwatch();
    pref.getKeywords();

  },

  // Add event handlers to pref.tabs
  nightwatch: function(){
    $.each(pref.tabs, function(value){
      this.click(function (e) {
          e.preventDefault();
          $(this).addClass('active');
          $('#'+this.id+':last').tab('show');
        });
    })
  },

  // Retrieves the user's keywords
  getKeywords: function(){

    $.ajax({
      url: '/user_keywords',
      method: 'get',
      success: function(data){
        pref.prefRender(data); 
      }
    });
  },

  prefRender: function(data){
    var keywordContainer = ["<div class='keyword-container'></div>"];
    pref.keywords = data;

    // Renders morning keywords
    if (pref.keywords.morning.length > 0) {
      for (var i = 0; i < pref.keywords.morning.length; i++) {
        pref.information.$morningContent.append(keywordContainer);
      };
    }

  }



}