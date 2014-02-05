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
        console.log(data);
      }
    });
  },

  prefRender: function(data){
    var keywordContainer = ["<div class='keyword-container'></div>"];
    pref.keywords = data;

    // Renders morning keywords
    if (pref.keywords.morning.length > 0) {
      $.each(pref.keywords.morning,function(i,v){
        pref.information.$morningContent.append(keywordContainer);
        pref.information.$morningContent.children().last().append(v['keyword']);
      });
    };
    // Renders noon keywords
    if (pref.keywords.noon.length > 0) {
      $.each(pref.keywords.noon,function(i,v){
        pref.information.$noonContent.append(keywordContainer);
        pref.information.$noonContent.children().last().append(v['keyword']);
      });
    };
    // Renders afternoon keywords
    if (pref.keywords.afternoon.length > 0) {
      $.each(pref.keywords.afternoon,function(i,v){
        pref.information.$afternoonContent.append(keywordContainer);
        pref.information.$afternoonContent.children().last().append(v['keyword']);
      });
    };
    // Renders evening keywords
    if (pref.keywords.evening.length > 0) {
      $.each(pref.keywords.evening,function(i,v){
        pref.information.$eveningContent.append(keywordContainer);
        pref.information.$eveningContent.children().last().append(v['keyword']);
      });
    };
    // Renders night keywords
    if (pref.keywords.night.length > 0) {
      $.each(pref.keywords.night,function(i,v){
        pref.information.$nightContent.append(keywordContainer);
        pref.information.$nightContent.children().last().append(v['keyword']);
      });
    };

  }



}