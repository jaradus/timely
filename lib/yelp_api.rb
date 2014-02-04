class YelpApi
	class YelpSite 
		attr_accessor :cost, :name, :location, :city, :zipcode, :rating, :reviews, :yelp, :url, :image_url

		def initialize(cost, name, location, city, zip, rating, url, image_url)
			@cost = cost
			@name = name
			@location = location
			@city = city
			@zipcode = zip
			@rating = rating
			@yelp = true
			@reviews = []
			@url = url
			@image_url = image_url
		end
	end

	def self.searchLatLonKeywords(inLat, inLon, inKeywords)
		Yelp.configure(
			:yws_id          => ENV['YELP_YWSID'],
			:consumer_key    => ENV['YELP_CONSUMER_KEY'],
			:consumer_secret => ENV['YELP_CONSUMER_SECRET'],
			:token           => ENV['YELP_TOKEN'],
			:token_secret    => ENV['YELP_TOKEN_SECRET'])

		 # construct a client instance
		 client = Yelp::Client.new

		 #include Yelp::V1::Review::Request
		 include Yelp::V2::Search::Request
		 # perform an location/location-based search for cream puffs nearby

		request_hash = GeoPoint.new(
			:term => inKeywords.join(" "),
			:latitude => inLat,
		 	:longitude => inLon
	 	)		 
	 	response = client.search(request_hash)

#		 request = Location.new(request_hash)
			site_array = []
			puts "Calling request with these parameters: " + request_hash.to_s

#			response = client.search(request)



			business_array = response["businesses"]
#binding.pry


			business_array.each do |business|
				cost = "$"
				name = business["name"]
				location = business["location"]
				city = business["city"]
				zip = business["zip"]
				url = business["url"]


				image_url = business["rating_img_url_small"]
				
				# review_array = business["reviews"]
				rating_sum = 0

				siteclassobject = YelpSite.new(
					cost, name, location, city, 
					zip, 0, url, image_url)
				# review_array.each do |review|
				# 	rating_sum += review["rating"]
				# 	siteclassobject.reviews.push(
				# 		[review["rating"], 
				# 		review["text_excerpt"],
				# 		review["rating_img_url_small"]]
				# 		)
				# end
				site_array << siteclassobject
			end
		return site_array
	end


	def self.searchZip(inZip)
		#def yelp_test_query
			Yelp.configure(
				:yws_id          => ENV['YELP_YWSID'],
				:consumer_key    => ENV['YELP_CONSUMER_KEY'],
				:consumer_secret => ENV['YELP_CONSUMER_SECRET'],
				:token           => ENV['YELP_TOKEN'],
				:token_secret    => ENV['YELP_TOKEN_SECRET'])

			 # construct a client instance
			 client = Yelp::Client.new

			 include Yelp::V1::Review::Request
			 # perform an location/location-based search for cream puffs nearby

			 request_hash = {
			 # :location => '650 Mission St',
	             #:city => 'New York',
	             #:state => 'NY',
	             :radius => 1,
	             :zipcode => inZip,
	             :term => 'restaurant',
	             :business_count => 4,
	             :compress_response => false
	         }
			 
			 request = Location.new(request_hash)
			 
			site_array = []
			puts "Calling request with these parameters: " + request_hash.to_s

			response = client.search(request)



			business_array = response["businesses"]
#binding.pry


			business_array.each do |business|
				cost = "$"
				name = business["name"]
				location = business["location"]
				city = business["city"]
				zip = business["zip"]
				url = business["url"]

				image_url = business["rating_img_url_small"]

				review_array = business["reviews"]
				rating_sum = 0

				siteclassobject = YelpSite.new(
					cost, name, location, city, 
					zip, 0, url, image_url)
				review_array.each do |review|
					rating_sum += review["rating"]
					siteclassobject.reviews.push(
						[review["rating"], 
						review["text_excerpt"],
						review["rating_img_url_small"]]
						)
				end
				site_array << siteclassobject
			end
		return site_array

	end #	def self.searchZip(inZip)

end #class
