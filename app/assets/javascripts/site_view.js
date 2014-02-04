var siteView = function(site_object){
  var self = this;

  this.site_object = site_object;
  // this.site_object.view = self;

  self.addEventListeners = function(){
    $more_info_button = $(".more_info_button");
    $more_info_button.on("click", function(){
      console.log("hello plz")
      //show the more info page.  use show and hide classes maybe
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


// business["is_claimed"]
// business["distance"]
// business["mobile_url"]
// business["rating_img_url"]
// business["review_count"]
// business["name"]
// business["snippet_image_url"]
// business["rating"]
// business["url"]
// business["location"]
// business["menu_date_updated"]
// business["phone"]
// business["snippet_text"]
// business["image_url"]
// business["categories"]
// business["display_phone"]
// business["rating_img_url_large"]
// business["menu_provider"]
// business["id"]
// business["is_closed"]
// business["rating_img_url_small"]


// //omar's code
//   // this.addEventListeners = function(){

//     // delete callback added
//     var $delete_link = self.$element.find('.delete_task_link');
//       $delete_link.on("click", function(e){
//         e.preventDefault();

//         self.model.destroy();
//         self.$element.remove();
//       });

//     // edit callback added
//       var $task_text_input = $('#task_text_input'),
//           $due_date_input = $('#due_date_input'),
//           $task_edit_button = $('#edit_task_button'),
//           $add_task_button = $('#add_task_button'),
//           $edit_link = self.$element.find('.edit_task_link');

//       $edit_link.on("click", function(e){
//         // edit logic here
//         $task_text_input.val(self.model.task_text);
//         $due_date_input.val(self.model.due_date);
        
//         $add_task_button.hide();
//         $task_edit_button.show();

//         // added event listener to edit button.
//         $task_edit_button.on("click", function(e){
//           var updated_attributes = {
//             "task_text": $task_text_input.val(),
//             "due_date": $due_date_input.val()
//           };

//           // clear inputs
//           $task_text_input.val("");
//           $due_date_input.val("");

//           self.model.update(updated_attributes);

//           // re-render this list item
//           self.$element.empty();
//           self.$element.remove();
//           self.render();

//           // clear existing event bindings on edit button
//           $task_edit_button.unbind("click");

//           $task_edit_button.hide();
//           $add_task_button.show();
//         })

//       })



// // ----------above is all self.addEventListeners---------------------------------







  // this.template = function(){
  //   var html_array = [
  //     "<li class='task'>", 
  //         "<span class='task_description'>",
  //         self.model.task_text, 
  //         "</span>",
  //         "<p>",
  //           "<a href='#' class='edit_task_link'>","edit","</a> | ",
  //           "<a href='#' class='delete_task_link'>","delete","</a>", 
  //         "</p>",
  //       "</li>"
  //   ];
  //   return html_array.join("");
  // }

//   this.render = function(){
//     // compiling HTML into a DOM node.
//     this.$element = $( this.template() );
//     // appending the newly created HTML snippet to the actual page.
//     $('#tasks_list').append(this.$element);
//   }