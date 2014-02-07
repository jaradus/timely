var recommendationsView = {

  // var ul = renderYelpItem(yelp_item_attr);
  // $("#site_container").prepend(ul);

  initialize: function(yelp_recommendations) {
    var pageElements = {
                        $loading: $('loading_screen'),
                        $page:    $('#site_container')  
                        };

    $(yelp_recommendations).each(function(){
      // Creates a local instance of the recommendation
      rec = new recommendationsView.Recommendation(this);

      // Renders the recommendation on the DOM
      console.log('Render called');
      new recommendationsView.RecommendationView(rec);
    })

  },

  Recommendation: function(raw_api_data){
    this.name               = raw_api_data.name || "";
    this.address            = raw_api_data.location || "";
    this.cross_streets      = raw_api_data.cross_streets || "";
    this.phone_num          = raw_api_data.phone_num || "";
    this.rating_img         = raw_api_data.medium_stars_url || "";
    this.categories         = raw_api_data.categories_array.join(', ') || "",
    this.big_stars_url      = raw_api_data.big_stars_url,
    this.city               = raw_api_data.city,
    this.little_stars_url   = raw_api_data.little_stars_url,
    this.medium_stars_url   = raw_api_data.medium_stars_url,
    this.rating             = raw_api_data.rating,
    this.state_code         = raw_api_data.state_code,
    this.url                = raw_api_data.url,
    this.zipcode            = raw_api_data.zipcode;
  },

  RecommendationView: function(rec){
    var self      = this;
    this.rec      = rec;
    this.rec.view = self;

    // Creates a flattened street address, with 'a' prepended to create a unique ID
    var smoosh = 'a'+self.rec.address.replace(/\s/g,"");

    // Applies that unique ID to a <ul>
    var $ul = $("<ul>").addClass("list").attr("id",smoosh);

    // Add Event Handler
    $ul.on('click', function(event) {
      var $hidden = $(this);
      var $moreContent = $hidden.find('div.more_info_panel');

      if ($(window).width() < 480) {
        if ($hidden.find('div.more_info_panel').hasClass("hide")){
          $moreContent.removeClass("hide");
        } else {
          $moreContent.addClass("hide");
        }
      }
    });

    // Creates a jQuery lookup to the unique ID
    var smooshId = '#'+smoosh;

    this.template = function(){
      var html_array = [
                        "<li class='name'>",
                          self.rec.name,
                        "</li>",
                        "<li class='location'>",
                          "<strong>"+self.rec.address+'</strong>, '+self.rec.city+' '+self.rec.cross_streets,
                        "</li>",
                        "<li>",
                          self.rec.categories,
                        "</li>",
                        "<li>",
                          "<img src='"+self.rec.medium_stars_url+"'>",
                        "</li>",
                        "<li>",
                          "<div class='more_info_panel hide' id='"+smoosh+"'>",
                            recommendationsView.RecommendationMoreInfoView(this.rec),
                          "</div>",
                        "</li>",
                        "<li>",
                          "<button class='more_info_button btn btn-info btn-sm' id='"+smoosh+"_button'>",
                            "Info",
                          "</button>",
                        "</li>",
                        "<br/>"
                        ]

      return html_array.join("");
    },

    this.render = function() {
      // Compiles the HTML to load into the DOM
      this.$element = $( this.template() );
      $("#site_container").prepend($ul);
      $ul.append(this.$element);
      var $button = $('#'+smoosh+'_button');

      $button.on('click', function(event) {
        if ($(window).width() > 480) {
          btn_id_button = event.target["id"];
          btn_id = btn_id_button.replace('_button','');
          var $hidden_info = $('div.more_info_panel#'+btn_id);

          if (($hidden_info).hasClass("hide")){
            $($hidden_info).removeClass("hide");
          } else {
            $($hidden_info).addClass("hide");
          }
        }
      });

    },

    this.render();

  },

  RecommendationMoreInfoView: function(rec){
    var self      = this;
    this.rec      = rec;
    this.rec.view = self;

    this.template = function(){
      var google_map_formatted_address = self.rec.address.replace(/ /g,'+');
      var google_map_formatted_city = self.rec.city.replace(' ','+');
      var google_map_formatted_state_code = self.rec.state_code.replace(' ','+');
      var google_location = google_map_formatted_address+','+google_map_formatted_city+','+google_map_formatted_state_code;

      if (self.rec.phone_num) {
        var html_array = [
                        "<ul class='more_info'>",
                          "<li class='phone_num'>",
                            "<a href='tel:'"+self.rec.phone_num+"'><i class='fa fa-mobile'></i> "+self.rec.phone_num+"</a>",
                          "</li>",
                          "<li class='map'>",
                          "<img src='http://maps.googleapis.com/maps/api/staticmap?center="+app.latitude+','+app.longitude+"&markers=color:blue|"+google_location+"&markers=color:green|"+app.latitude+','+app.longitude+"&zoom=14&size=300x300&sensor=false'>",
                          "</li>",
                        "</ul>"
                        ]
      } else {
        var html_array = [
                        "<ul class='more_info'>",
                          "<li class='map'>",
                          "<img src='http://maps.googleapis.com/maps/api/staticmap?center="+app.latitude+','+app.longitude+"&markers=color:blue|"+google_location+"&markers=color:green|"+app.latitude+','+app.longitude+"&zoom=14&size=300x300&sensor=false'>",
                          "</li>",
                        "</ul>"
                        ]
      }
      

      return html_array.join("");
    },

    this.render = function(){
      // Compiles the HTML to load into the DOM
      this.element = this.template();
      return this.element;
    }

    return this.render();

  }

}