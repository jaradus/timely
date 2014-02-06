var renderYelpItem = function(item){
	var smoosh = item.location.replace(/\s/g,"");
	var $div  = $("#site_container");
	var $ul = $("<ul>").addClass("list");  //col-md-6 col-md-offset-3

	// var $image = $("<img>").attr("src", item.image_url);

	var $name_li = $("<li>").addClass("name").text(item.name);
	var $address_li = $("<li>").addClass("address").text(item.location);
	var $cross_streets_li = $("<li>").addClass("cross_streets").text(item.cross_streets);
	var $phone_num_li = $("<li>").addClass("phone_num").text(item.phone_num);
	var $rating_img = $("<img>").attr("src", item.medium_stars_url);
	var $more_info_button = $("<li>").append($("<button>").addClass("more_info_button").attr("id",smoosh).text("More Info"));
	//should hide until user clicks on 'more info' button
	//var $review_li = $("<li>").addClass("phone_number").text(item.review);

	var smooshId = '#'+smoosh;

// slidetoggle <-- lookitup
$div.on('click', function(event) {

  $btn = $(event.target)[0];

});

// ($smooshId).on("click", function(){
//   if (smooshId) {
//     if ($(".more_info_junk").hasClass("hide")){
//       $more_info_button.text("Less Info");
//       $(".more_info_junk").removeClass("hide");
//     } else {
//       $more_info_button.text("More Info");
//       $(".more_info_junk").addClass("hide");
//     }
// 	}
// })

$ul
.append($name_li)
.append($address_li)
.append($cross_streets_li)
.append($phone_num_li)
.append($rating_img)
.append("<li><div class='more_info_junk hide'>MORE INFO GOES HERE</div></li>")
.append($more_info_button)
.append("<br/>")
.append("<hr/>")
;

console.log(item);
return $ul;

}


