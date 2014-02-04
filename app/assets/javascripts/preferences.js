var pref = {

  initialize: function(){
    pref.elements = {
      $morning    : $('#morning'),
      $noon       : $('#noon'),
      $afternoon  : $('#afternoon'),
      $evening    : $('#evening'),
      $night      : $('#night')
    }

    pref.nightwatch()

  },

  nightwatch: function(){
    $.each(pref.elements, function(value){
      this.click(function (e) {
          e.preventDefault();
          $(this).tab('show');
          $(this).addClass('active');
        });
    })
  }

}