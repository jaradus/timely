var pref = {

  initialize: function(){
    pref.keywords
    pref.local_keyword_repo = []
    pref.index_of_deleted_keywords =[]

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
      url: '/keywords',
      method: 'get',
      success: function(data){
        pref.prefRender(data);
      }
    });
  },

  // Keyword Constructor
  Keyword: function(word, period_of_time, id){
    var self = this;
    this.keyword = word;
    this.period_of_time = period_of_time;
    this.id = id;

    this.all = function(){
      return pref.local_keyword_repo;
    }

    this.create = function(){
      var params = {
        word: {
          keyword: self.word,
          period_of_time: self.period_of_time
        }
      }
      $.ajax({
        url: "/keywords",
        type: "post",
        dataType: "json",
        data: params,
        success: function(data){
          // data is the newly created task that Rails sends back
          self.id = data.id;
        }
      })
    }

    this.destroy = function(){

      $.ajax({
        url: "/keywords/"+self.id,
        type: "DELETE",
        dataType: "json",
        // data: {"id": id},
        success: function(data){
          // data is the newly created task that Rails sends back
          pref.index_of_deleted_keywords = pref.local_keyword_repo.indexOf(self);
          pref.local_keyword_repo.splice(pref.index_of_deleted_keywords,1);
        }
      })
    }

    // when all is said and done...
    // add the keyword to the keywords array

    // pref.local_keyword_repo.push(this);

  },


  renderAndStore: function(keywords_for_period_of_time,contentTab){
    $.each(keywords_for_period_of_time,function(i,v){

      // Creates a new Keyword object, and pushes it into the local_keyword_repo
      item = new pref.Keyword(v.keyword,v.period_of_time,v.id);
      pref.local_keyword_repo.push(item);

      var $template = $("<div>").addClass('keyword-container').text(v.keyword);
      contentTab.append($template);

    });
  },

  prefRender: function(data){

    pref.keywords = data;

    // Renders morning keywords
    if (pref.keywords.morning.length > 0) {
      pref.renderAndStore(pref.keywords.morning,pref.information.$morningContent);
    };
    // Renders noon keywords
    if (pref.keywords.noon.length > 0) {
      pref.renderAndStore(pref.keywords.noon,pref.information.$noonContent);
    };
    // Renders afternoon keywords
    if (pref.keywords.afternoon.length > 0) {
      pref.renderAndStore(pref.keywords.afternoon,pref.information.$afternoonContent);
    };
    // Renders evening keywords
    if (pref.keywords.evening.length > 0) {
      pref.renderAndStore(pref.keywords.evening,pref.information.$eveningContent);
    };
    // Renders night keywords
    if (pref.keywords.night.length > 0) {
      pref.renderAndStore(pref.keywords.night,pref.information.$nightContent);
    };

  }



}