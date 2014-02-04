require 'yelp_api' # in the lib/assets folder

class HomeController < ApplicationController

  def index

  end


  def api_call
    latitude   = params[:latitude].to_f
    longitude  = params[:longitude].to_f
    local_time = params[:local_time].to_i

    results = lat_lon_keyword_search(latitude, longitude, check_time(local_time))

    results.each do |result|
      puts result.name
    end

# # binding.pry

    render json: results

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


def check_time(local_time)
	if local_time.between?(300,1130)
		return ["breakfast", "bagel", "coffee"]
	end
	if local_time.between?(1130,1300)
		return ["lunch", "burgers", "salads"]
	end
	if local_time.between?(1300,1730)
		return ["coffee", "tea", "crumpets", "petit fours"]
	end
	if local_time.between?(1730,2000)
		return ["dinner", "steak", "thai", "mexican"]
	end
	if 2000 < local_time || local_time < 30
		return ["bars", "clubs", "dancing", "nightlife"]
	end
end

end