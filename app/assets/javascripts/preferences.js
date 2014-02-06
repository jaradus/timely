var pref = {

  initialize: function(){
    pref.keywords
    pref.local_keyword_repo = []
    pref.index_of_deleted_keywords = []
    pref.$tabContent = $('.tab-content')

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

    // when all is said and done...
    // add the keyword to the keywords array

    // pref.local_keyword_repo.push(this);

  },


  renderAndStore: function(keywords_for_period_of_time,tabContent){
    $.each(keywords_for_period_of_time,function(i,v){

      // Creates a new Keyword object, and pushes it into the local_keyword_repo
      item = new pref.Keyword(v.keyword,v.period_of_time,v.id);
      pref.local_keyword_repo.push(item);

      // (1) This is awesome. (2) The next line is a template for our the div containg the keyword and then the word itself
      var $template = $("<div>").addClass('keyword-container').text(v.keyword);

      // This takes that constructed item from above and attaches the keyword's id from the db to it's .data
      $template.data({id: v.id});

      // This appends the constructed item to the appropriate tab content
      tabContent.append($template);

    });
  },

  destroyKeyword: function(id_hash){
    $.ajax({
      url: "/keywords/"+id_hash.id,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        console.log(data+" destroyed");
        // data is the newly created task that Rails sends back
        // pref.index_of_deleted_keywords = pref.local_keyword_repo.indexOf(self);
        // pref.local_keyword_repo.splice(pref.index_of_deleted_keywords,1);

        pref.getKeywords();
      }
    })
  },

  prefRender: function(data){

    // Removes any keywords from the tab content area
    $('.keyword-container').empty();
    $('.keyword-container').remove();

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

    // Add event handler to the entire tab content div
    pref.$tabContent.on('click', function(event) {
        // Retrieves the div's unique ID as located in the db
        var id_of_keyword_to_delete = $(event.target).data();
        if (id_of_keyword_to_delete.id) {
          pref.destroyKeyword(id_of_keyword_to_delete);
        };
        if ($(event.target).hasClass("btn")) {
          var $submit_button = $(event.target);
          var $submit_input = $submit_button.parent().children()[0];
          var $submit_input_content = $($submit_input).val();
          
        }

    });


  }



}