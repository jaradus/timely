class HomeController < ApplicationController

  def index
		respond_to do |format|
			format.html
			#format.json {render json: Model.all.to_json}
    end
  end

end