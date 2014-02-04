class YelpApi
	class YelpSite 
		attr_accessor :cost, :name, :location, :city, :zipcode, :rating, :reviews, :yelp, :url, :image_url

		def initialize(name, location, city, zip, rating, url, image_url, state_code)
			@name = name
			@location = location
			@city = city
			@zipcode = zip
			@rating = rating
			@yelp = true
			@reviews = []
			@url = url
			@image_url = image_url
			@state_code = state_code
		end
	end

	#NOTE That this method could return two different kinds
	#of results: an array containing businesses OR it could
	#return an error, so before you iterate through the 
	#returned array, MAKE SURE IT IS ONE.  IF IT'S NOT, you
	#probably want to read the contents to see what kind of
	#error it is
	def self.searchLatLonKeywords(inLat, inLon, inKeywords)
		Yelp.configure(
			:yws_id          => ENV['YELP_YWSID'],
			:consumer_key    => ENV['YELP_CONSUMER_KEY'],
			:consumer_secret => ENV['YELP_CONSUMER_SECRET'],
			:token           => ENV['YELP_TOKEN'],
			:token_secret    => ENV['YELP_TOKEN_SECRET'])

		# construct a client instance
		client = Yelp::Client.new

		include Yelp::V2::Search::Request

		 # perform an address/location-based search for cream puffs nearby
		request_hash = GeoPoint.new(
			:term => inKeywords.join(" "),
			:latitude => inLat,
		 	:longitude => inLon
	 	)		 
	 	response = client.search(request_hash)

#Scooter: Working on code here--commenting this out to commit
#binding.pry 

		site_array = []

		if (response["businesses"] == nil)
			#The YELP API returned an error, so 
			#pass that response back up the stack.
			#The users won't like the error, but it'll
			#help them debug
			return response
		end

		business_array = response["businesses"]

		# Go through the list of businesses we got back
		# from the API call and put them into our own
		# object format 
		business_array.each do |business|
			name 			= business["name"]
			address 		= business["location"]["address"][0]


#binding.pry 


			city 			= business["location"]["city"]
			zip 			= business["location"]["postal_code"]
			url 			= business["url"]
			image_url 		= business["rating_img_url_small"]
			state_code		= business["location"]["state_code"]

binding.pry


			#"reviews" key seems to be unavailable in V2
			#results so I'm removing it
			#review_array 	= business["reviews"]
			#rating_sum 		= 0

			rating = business["rating"]
			siteclassobject = YelpSite.new(
				name, address, city, 
				zip, rating, url, image_url, state_code
			)
			
			#Put the site object into the site array
			site_array << siteclassobject
		end
		return site_array
	end


	#PLEASE BE AWARE this method has not been updated
	# to work with all the changes necessary for the V2
	# call.  Please do not assume that this call will
	# work for you if you choose to use it for testing!
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

			business_array.each do |business|
				name = business["name"]
				location = business["location"]
				city = business["city"]
				zip = business["zip"]
				url = business["url"]


				image_url = business["rating_img_url_small"]

				review_array = business["reviews"]
				rating_sum = 0

				siteclassobject = YelpSite.new(
					name, address, city, 
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
