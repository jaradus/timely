









/////////////example code from movie site app////////////////////////////////////
	render: function render() {
		var $div = $("<div>").addClass("movie");
		var $ul = $("<ul>").addClass("movie");

		var $poster_img = $("<img>").attr("src", this.movie.poster_url);
		
		var $title_li = $("<li>").addClass("title").text(this.movie.title);
		var $year_li = $("<li>").addClass("year").text(this.movie.year);
		var $director_li = $("<li>").addClass("director").text(this.movie.director);

		$ul
			.append($title_li)
			.append($year_li)
			.append($director_li)
		;

		$div
			.append($ul)
			.append($poster_img)
		;
		return $div;
	}






		render: function render() {
		var $div = $("<div>").addClass("movie");
		var $ul = $("<ul>").addClass("movie");

		var $poster_img = $("<img>").attr("src", this.movie.poster_url);
		
		var $title_li = $("<li>").addClass("title").text(this.movie.title);
		var $year_li = $("<li>").addClass("year").text(this.movie.year);
		var $director_li = $("<li>").addClass("director").text(this.movie.director);

		$ul
			.append($title_li)
			.append($year_li)
			.append($director_li)
		;

		$div
			.append($ul)
			.append($poster_img)
		;
		return $div;
	}