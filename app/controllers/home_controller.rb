class HomeController < ApplicationController

  def index

  end


  def api_call
    params[:latitude]
    params[:longitude]

    yelp_list = 

    render json: yelp_list

  end

end