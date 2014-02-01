class Dislike < ActiveRecord::Base
  attr_accessible :address, :disliked_date, :name, :rating, :url, :user_id

  belongs_to :user

  # RATINGS = ["★", "★★", "★★★", "★★★★", "★★★★★"]

end
