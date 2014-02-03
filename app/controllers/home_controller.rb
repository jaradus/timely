class HomeController < ApplicationController

  def index

  end


  def api_call
    params[:latitude]
    params[:longitude]

    # Scott and Julie: Yelp API call goes here
    yelp_list = 

    render json: yelp_list

  end

end