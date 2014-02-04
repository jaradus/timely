# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


		# local_time.between?(300,1130)
		# morning = ["breakfast", "bagel", "coffee"]
		
		# local_time.between?(1130,1300)
		# noon = ["lunch", "burgers", "salads"]
		
		# local_time.between?(1300,1730)
		# afternoon = ["coffee", "tea", "crumpets", "petit fours"]
		
		# local_time.between?(1730,2000)
		# evening = ["dinner", "steak", "thai", "mexican"]
		
		# 2000 < local_time || local_time < 300
		# night = ["bars", "clubs", "dancing", "nightlife"]

		# time_of_day = [morning, noon, afternoon, evening, night]
	#-----------------------------------------------------------------------------------------------------------------------------------#


	1.times do
		morning = ["breakfast", "bagel", "coffee"]
		noon = ["lunch", "burgers", "salads"]
		afternoon = ["coffee", "tea", "crumpets", "petit fours"]
		evening = ["dinner", "steak", "thai", "mexican"]
		night = ["bars", "clubs", "dancing", "nightlife"]
		time_of_day = [morning, noon, afternoon, evening, night]


		email = Faker::Internet.email

		user = User.create!(
			:email => email,
			:password => '12341234'
			)


		time_of_day.each {|time| 
			time.each {|preference|
				Keyword.create! {
					keyword: preference,
					period_of_time: time,
					user_id: user.id
				}
			}
		}


	end

















2.times do
	activity = %w(Run Bike Swimming Racquetball).sample
	description = "Will be a superfun time!"
	address = ["Manhattan, New York", "Queens, New York", "Brooklyn, New York", "Flatiron District", "Bronx, New York", "Staten Island, NY"].sample
	user = User.all.sample

	now = Time.now
	a_day_ahead = now + 60 * 60 * 24
	time = rand(now..a_day_ahead).to_f


	activity = Activity.create({activity: activity,
				description: description,
				address: address,
				time: time
				})
	user.do(activity)
end