class UserController < ApplicationController

  def preferences
    @morning = Keyword.find_all_by_period_of_time_and_user_id('morning',current_user.id)
    @noon = Keyword.find_all_by_period_of_time_and_user_id('noon',current_user.id)
    @afternoon = Keyword.find_all_by_period_of_time_and_user_id('afternoon',current_user.id)
    @evening = Keyword.find_all_by_period_of_time_and_user_id('evening',current_user.id)
    @night = Keyword.find_all_by_period_of_time_and_user_id('night',current_user.id)
  end

end