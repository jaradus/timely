require 'yelp_api' # in the lib/assets folder

class HomeController < ApplicationController

  def index

  end


  def api_call
    latitude   = params[:latitude].to_f
    longitude  = params[:longitude].to_f
    local_time = params[:local_time]

    @results = lat_lon_keyword_search(latitude, longitude, ["bagels","coffee"])


    # if results['error']['id'] == nil

      # results.each do |result|
      #   puts result.name
      # end

      # # binding.pry

    # else
      # Generates an map around the user's location
    #   @map_image = "https://maps.googleapis.com/maps/api/staticmap?center=#{latitude},#{longitude}&zoom=15&size=200x200&sensor=false"
    # end

    render json: @results

  end

	#NOTE: THERE IS NO ROUTE FOR THIS METHOD
	def zipsearch(inZipcode)
		return YelpApi.searchZip(inZipcode)
	end

	#NOTE: THERE IS NO ROUTE FOR THIS METHOD
	# Call this method with the Latitude, Longitude
	# and an array of keywords eg ["dinner", "chinese"]
	#40, -70 -- this returns an error that I should handle
	def lat_lon_keyword_search(inLat, inLon, inKeywords)
		return YelpApi.searchLatLonKeywords(inLat, inLon, inKeywords)
	end

end
