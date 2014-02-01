class Like < ActiveRecord::Base
  attr_accessible :address, :liked_date, :name, :rating, :url, :user_id

  belongs_to :user

  # RATINGS = ["★", "★★", "★★★", "★★★★", "★★★★★"]

end
