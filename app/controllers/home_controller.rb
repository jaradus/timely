require 'yelp_api' # in the lib/assets folder

class HomeController < ApplicationController

  def index

  end


  def api_call
    latitude   = params[:latitude]
    longitude  = params[:longitude]
    local_time = params[:local_time]

    keywords   = Keyword.find_all_by_period_of_time(period)

    # Scott and Julie: Yelp API call goes here
    yelp_list = 

    render json: yelp_list

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