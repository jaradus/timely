class Keyword < ActiveRecord::Base
  attr_accessible :keyword, :period_of_time, :user_id

  belongs_to :users

end
