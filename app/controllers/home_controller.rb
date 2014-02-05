require 'yelp_api' # in the lib/assets folder
require 'get_keyword' # in the lib/assets folder

class HomeController < ApplicationController

  def index
  	
  end

  def api_call
    latitude   = params[:latitude].to_f
    longitude  = params[:longitude].to_f
    local_time = params[:local_time].to_i
    keywords = get_keywords(local_time, current_user)

    @results = lat_lon_keyword_search(latitude, longitude, keywords)

    render json: @results

  end

  def scooterTest
  	latitude = 40.740091899999996
    longitude = -73.98969
    @results = lat_lon_keyword_search(latitude, longitude, ["bagels","coffee"])

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

  def get_keywords(local_time, current_user)
  	return GetKeyword.get_keywords(local_time, current_user)
  end






end




