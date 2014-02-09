class RegistrationsController < Devise::RegistrationsController
  def new
    super
  end

  def create
  	super

    if current_user
    	UserMailer.greetings(current_user).deliver
    	
  		morning = ["breakfast", "bagel", "coffee"]
  		noon = ["lunch", "burgers", "salads"]
  		afternoon = ["coffee", "tea", "crumpets", "petit fours"]
  		evening = ["dinner", "steak", "thai", "mexican"]
  		night = ["bars", "clubs", "dancing", "nightlife"]
  		# time_options = [morning, noon, afternoon, evening, night]
  		# time_of_day = ["morning", "noon", "afternoon", "evening", "night"]


  			morning.each {|item|
  				Keyword.create!(
  					keyword: item,
  					period_of_time: "morning",
  					user_id: current_user.id
  					)
  			}


  			noon.each {|item|
  				Keyword.create!(
  					keyword: item,
  					period_of_time: "noon",
  					user_id: current_user.id
  					)
  			}

  			afternoon.each {|item|
  				Keyword.create!(
  					keyword: item,
  					period_of_time: "afternoon",
  					user_id: current_user.id
  					)
  			}

  			evening.each {|item|
  				Keyword.create!(
  					keyword: item,
  					period_of_time: "evening",
  					user_id: current_user.id
  					)
  			}

  			night.each {|item|
  				Keyword.create!(
  					keyword: item,
  					period_of_time: "night",
  					user_id: current_user.id
  					)
  			}
      end

  end

  def update
    super
  end
end 