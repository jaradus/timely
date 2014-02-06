var renderYelpItem = function(item){
	var smoosh = 'a'+item.location.replace(/\s/g,"");
	//var $div  = $("#site_container");
	var $ul = $("<ul>").addClass("list").attr("id",smoosh);

	// var $image = $("<img>").attr("src", item.image_url);

	var $name_li = $("<li>").addClass("name").text(item.name);
	var $address_li = $("<li>").addClass("address").text(item.location);
	var $cross_streets_li = $("<li>").addClass("cross_streets").text(item.cross_streets);
	var $phone_num_li = $("<li>").addClass("phone_num").text(item.phone_num);
	var $rating_img = $("<img>").attr("src", item.medium_stars_url);
	var $hidden_info = $("<li>").append($("<div>").addClass("more_info_junk").addClass("hide").attr("id", smoosh).text("MORE INFO HERE OK"));
	var $more_info_button = $("<li>").append($("<button>").addClass("more_info_button").attr("id",smoosh).text("==="));

	//should hide until user clicks on 'more info' button
	//var $review_li = $("<li>").addClass("phone_number").text(item.review);

	var smooshId = '#'+smoosh;

// slidetoggle <-- lookitup
$more_info_button.on('click', function(event) {

  btn_id = event.target["id"];

  var $hidden_info = $('div.more_info_junk#'+btn_id);

    if (($hidden_info).hasClass("hide")){
      $($hidden_info).removeClass("hide");
    } else {
      $($hidden_info).addClass("hide");
    }

});

$ul
.append($name_li)
.append($address_li)
.append($cross_streets_li)
.append($phone_num_li)
.append($rating_img)
.append($hidden_info)
.append($more_info_button)
.append("<br/>")
.append("<hr/>")
;

return $ul;

}


