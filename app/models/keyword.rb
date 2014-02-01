class Keyword < ActiveRecord::Base
  attr_accessible :keyword, :period_of_time

  has_many :keywords_users
  has_many :users, :through => :keywords_users

end
