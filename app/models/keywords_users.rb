class KeywordsUsers < ActiveRecord::Base
  attr_accessible :keyword_id, :user_id

  belongs_to :users
  belongs_to :keywords

end
