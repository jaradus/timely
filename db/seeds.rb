# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



	10.times do
		morning = ["breakfast", "bagel", "coffee"]
		noon = ["lunch", "burgers", "salads"]
		afternoon = ["coffee", "tea", "crumpets", "petit fours"]
		evening = ["dinner", "steak", "thai", "mexican"]
		night = ["bars", "clubs", "dancing", "nightlife"]
		time_options = [morning, noon, afternoon, evening, night]
		time_of_day = ["morning", "noon", "afternoon", "evening", "night"]



		email = Faker::Internet.email

		user = User.create!(
			:email => email,
			:password => '12341234'
			)

			morning.each {|item|
				Keyword.create!(
					keyword: item,
					period_of_time: "morning",
					user_id: user.id
					)
			}


			noon.each {|item|
				Keyword.create!(
					keyword: item,
					period_of_time: "noon",
					user_id: user.id
					)
			}

			afternoon.each {|item|
				Keyword.create!(
					keyword: item,
					period_of_time: "afternoon",
					user_id: user.id
					)
			}

			evening.each {|item|
				Keyword.create!(
					keyword: item,
					period_of_time: "evening",
					user_id: user.id
					)
			}

			night.each {|item|
				Keyword.create!(
					keyword: item,
					period_of_time: "night",
					user_id: user.id
					)
			}




	end



