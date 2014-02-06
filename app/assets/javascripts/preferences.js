var pref = {

  initialize: function(){
    pref.keywords
    pref.user_id
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

    pref.getUserId();
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
  Keyword: function(keyword, period_of_time, user_id){
    var self = this;
    this.keyword = keyword;
    this.period_of_time = period_of_time;
    this.id
    this.user_id = user_id;

    this.create = function(){
      // "A property’s name can be any string, including the empty string. The quotes around a property’s name in an object literal are optional if the name would be a legal JavaScript name and not a reserved word. So quotes are required around "first-name", but are optional around first_name. Commas are used to separate the pairs."

      // Crockford, Douglas (2008-05-08). JavaScript: The Good Parts: The Good Parts (Kindle Locations 425-428). O'Reilly Media. Kindle Edition. 

      // NOTE: THIS IS NOT ENTIRELY ACCURATE MR. CROCKFORD. Javascript cannot parse that second _ in period_of_time. It must be in quotes.

      var params = {
                    keyword: self.keyword,
                    "period_of_time": self.period_of_time,
                    user_id: self.user_id
                    };

                    console.log(params)

      $.ajax({
        url: "/keywords",
        type: "POST",
        dataType: "json",
        data: params,
        success: function(data){
          // data is the newly created task that Rails sends back
          console.log(data+" was created")
          self.id = data.id;
          pref.getKeywords();
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
      // item = new pref.Keyword(v.keyword,v.period_of_time,v.id);
      // pref.local_keyword_repo.push(item);

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
        console.log(data.keyword+" destroyed");
        // data is the newly created task that Rails sends back
        // pref.index_of_deleted_keywords = pref.local_keyword_repo.indexOf(self);
        // pref.local_keyword_repo.splice(pref.index_of_deleted_keywords,1);

        pref.getKeywords();
      }
    })
  },

  getUserId: function(){
    $.ajax({
      url: '/user/id',
      type: 'get',
      dataType: 'json',
      success: function(data){
        pref.user_id = data;
      }
    })
  },

  prefRender: function(data){

    // Removes any keywords from the tab content area
    $('.keyword-container').empty();
    $('.keyword-container').remove();

    // Removes any event handlers to prevent linear watching
    pref.$tabContent.off();

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
          console.log("clicked");
          var $submit_button = $(event.target);
          var $submit_input = $submit_button.parent().children()[0];
          var $submit_input_content = $($submit_input).val().toLowerCase();
          
          if ($submit_input_content) {
            var $period_of_time = $submit_input.id.split('_')[0];
            var new_keyword = new pref.Keyword($submit_input_content, $period_of_time, pref.user_id);
            var $submit_input_content = $($submit_input).val('');
            console.log(new_keyword);
            new_keyword.create()
          }

        }

    });


  }



}