









// /////////////example code from movie site app////////////////////////////////////
// 	render: function render() {
// 		var $div = $("<div>").addClass("movie");
// 		var $ul = $("<ul>").addClass("movie");

// 		var $poster_img = $("<img>").attr("src", this.movie.poster_url);
		
// 		var $title_li = $("<li>").addClass("title").text(this.movie.title);
// 		var $year_li = $("<li>").addClass("year").text(this.movie.year);
// 		var $director_li = $("<li>").addClass("director").text(this.movie.director);

// 		$ul
// 			.append($title_li)
// 			.append($year_li)
// 			.append($director_li)
// 		;

// 		$div
// 			.append($ul)
// 			.append($poster_img)
// 		;
// 		return $div;
// 	}






// 	render: function() {
		
// 		$('#movies-list-ul').empty();

// 		this.movies_list.movies.forEach(function(movie){	
// 			var movie_view = new MovieView(movie);
// 			var div = movie_view.render();
// 			var li = $("<li>").append(div);
// 			$('#movies-list-ul').prepend(li);
// 		}); // iterate over this to render each movie
		
// 		// ***********************************************************
// 		// RENDER YOUR MOVIE ITEMS INTO THE <UL>
// 		// ACCESSSIBLE THROUGH THE 'this.movies_ul' VARIABLE. 
// 		// YOU WILL NEED TO ITERATE ON YOUR LIST AND PREPEND 
// 		// <LI>s for EACH MOVIE ONTO THE UL. 
// 		// ~*HINT*~: EMPTY YOUR UL AT THE BEGINNING OF THE RENDER.
// 		// ***********************************************************
// 	}