#########################################################
# This class provides an interface to the Yelpster gem, which
# provides the interface to the Yelp API.  This file exists
# as a layer between the application and the Yelpster gem and
# filters the application from having to know about how the
# Yelp API returns its results.  
#
# Only the results relevant to the application are stored, 
# and that data type is provided to the calling program
#########################################################
class YelpApi
	#Constant that declares the maximum number of search
	#results we get back from the Yelp API.  It's a good
	#idea to limit this so our Yelp Keys don't get blocked
	#bc of too much usage
	MAX_RESULTS = 3

	class YelpSite 
		attr_accessor :cost, :name, :location, :city, :zipcode, :rating, :reviews, :yelp, :url, :image_url

		def initialize(name, location, city, zip, state_code, rating, url, little_stars_url, big_stars_url)
			@name 				= name
			@location 			= location
			@city 				= city
			@zipcode 			= zip
			@state_code 		= state_code
			@rating 			= rating
			@url 				= url
			@little_stars_url 	= little_stars_url
			@big_stars_url 		= big_stars_url
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

		# Set up the request information for a 
		# lat/lon-based search
		request_hash = GeoPoint.new(
			:term 		=> inKeywords.join(" "),
			:latitude 	=> inLat,
		 	:longitude 	=> inLon,
            :limit 		=> MAX_RESULTS
	 	)		 

		#################################
	 	# Perform the actual search!
	 	response = client.search(request_hash)

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
			city 			= business["location"]["city"]
			zip 			= business["location"]["postal_code"]
			state_code		= business["location"]["state_code"]
			rating 			= business["rating"]
			url 			= business["url"]
			little_stars_url= business["rating_img_url_small"]
			big_stars_url	= business["rating_img_url_large"]
			
			#Create our own YelpSite data object with 
			#JUST The data we're interested in
			siteclassobject = YelpSite.new(
				name, address, city, zip, state_code,
				rating, 
				url, little_stars_url, big_stars_url
			)
			
			#Put the site object into the site array
			site_array << siteclassobject
		end
		return site_array
	end

end #class
