var initialCall = {

  getList: $.ajax({
    url: "/",
    type: "post", //or a get? api_call in rake routes says post
    dataType: "json",
    //data? params? no?
    success: function(data){
      console.log(data);
    }
  });

}

// //i don't know if this is right

// api_call   POST   /api_call(.:format)        home#api_call
// root              /                          home#index