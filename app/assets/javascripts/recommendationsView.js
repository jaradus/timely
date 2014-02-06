var recommendationsView = {

  initialize: function(yelp_recommendations) {
    var pageElements = {
                        $loading: $('loading_screen'),
                        $page:    $('site_container')  
                        };

    $(yelp_recommendations).each(function(){
      // Creates a local instance of the recommendation
      rec = new recommendationsView.Recommendation(this);

      // Renders the recommendation on the DOM
      console.log('Render called');
      recommendationsView.RecommendationView(rec);
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
    this.rating             = raw_api_data.rating,
    this.state_code         = raw_api_data.state_code,
    this.url                = raw_api_data.url,
    this.zipcode            = raw_api_data.zipcode;
  },

  RecommendationView: function(rec){
    var self      = this;
    this.rec      = rec;
    this.rec.view = self;

    this.template = function(){
      var google_map_formatted_address = self.rec.address.replace(/ /g,'+');
      var google_map_formatted_city = self.rec.city.replace(' ','+');
      var google_map_formatted_state_code = self.rec.state_code.replace(' ','+');
      var google_location = google_map_formatted_address+','+google_map_formatted_city+','+google_map_formatted_state_code;

      var html_array = [
                        "<ul class='more_info'>",
                          "<li class='location'>",
                          "<strong>"+self.rec.address+'</strong>, '+self.rec.city+' '+self.rec.cross_streets,
                          "</li>",
                          "<li class='phone_num'>",
                          self.rec.phone_num,
                          "</li>",
                          "<li class='map'>",
                          "<img src='http://maps.googleapis.com/maps/api/staticmap?center="+google_location+"&zoom=15&size=300x300&sensor=false'>",
                          "</li>",
                        ]

      return html_array.join("");
    },

    this.render = function(){
      // Compiles the HTML to load into the DOM
      this.$element = $( this.template() );
      $('#site_container').append(this.$element);
      console.log(this.$element+" appended")
    }

    this.render();

  }

}