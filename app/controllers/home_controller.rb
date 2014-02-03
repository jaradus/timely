require 'yelp_api' # in the lib/assets folder

class HomeController < ApplicationController

  def index
		respond_to do |format|
			format.html
			#format.json {render json: Model.all.to_json}
    end
  end

	#NOTE: THERE IS NO ROUTE FOR THIS METHOD
	def zipsearch(inZipcode)
		@sites = YelpApi.searchZip(inZipcode)
	end

	#NOTE: THERE IS NO ROUTE FOR THIS METHOD
	# Call this method with the Latitude, Longitude
	# and an array of keywords eg ["dinner", "chinese"]
	#40, -70 -- this returns an error that I should handle
	def lat_lon_keyword_search(inLat, inLon, inKeywords)
		@sites = YelpApi.searchLatLonKeywords(inLat, inLon, inKeywords)
	end

end