class UserController < ApplicationController

  def preferences
    @keywords = Keyword.find_by_user_id(current_user)
  end

end