var pref = {

  initialize: function(){
    pref.elements = {
      $morning    : $('#morningTab'),
      $noon       : $('#noonTab'),
      $afternoon  : $('#afternoonTab'),
      $evening    : $('#eveningTab'),
      $night      : $('#nightTab')
    }

    pref.nightwatch()

  },

  nightwatch: function(){
    $.each(pref.elements, function(value){
      this.click(function (e) {
          e.preventDefault();
          $(this:last).tab('show');
          $(this).addClass('active');
        });
    })
  }

}