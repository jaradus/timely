var siteView = function(site_object){
  var self = this;

  this.site_object = site_object;
  // this.site_object.view = self;

  self.addEventListeners = function(){
    $more_info_button = $(".more_info_button");
    $more_info_button.on("click", function(){
      if ($(".more_info_junk").hasClass("hide")){
        $more_info_button.text("Less Info");
        $(".more_info_junk").removeClass("hide");
      } else {
        $more_info_button.text("More Info");
        $(".more_info_junk").addClass("hide");
      }
    });
  }

  //after everything, render the page
  // this.render(); 
  this.addEventListeners();

};

$(function(){
  siteView();
});