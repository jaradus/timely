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

end