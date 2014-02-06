	# ----------------------------------
		#NOTE: THERE IS NO ROUTE FOR THIS METHOD

		class GetKeyword

			def self.get_keywords(local_time, user)

				if user == nil 
					if local_time.between?(301,1130)
						return ["breakfast", "bagel", "coffee"].sample(2)
					end
					if local_time.between?(1131,1300)
						return ["lunch", "burgers", "salads"].sample(2)
					end
					if local_time.between?(1301,1730)
						return ["coffee", "tea", "crumpets", "petit fours"].sample(2)
					end
					if local_time.between?(1731,2000)
						return ["dinner", "steak", "thai", "mexican"].sample(2)
					end
					if 2001 < local_time || local_time < 300
						return ["bars", "clubs", "dancing", "nightlife"].sample(2)
					end
				else
					if local_time.between?(301,1130)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("morning",user.id)
						k.each do |word|
							array << word.keyword
						end
						if array.length < 3
							return array
						else
							return array.sample(2)
						end
					end
					if local_time.between?(1131,1300)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("noon",user.id)
						k.each do |word|
							array << word.keyword
						end
						if array.length < 3
							return array
						else
							return array.sample(2)
						end
					end
					if local_time.between?(1301,1730)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("afternoon",user.id)
						k.each do |word|
							array << word.keyword
						end
						if array.length < 3
							return array
						else
							return array.sample(2)
						end
					end
					if local_time.between?(1731,2000)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("evening",user.id)
						k.each do |word|
							array << word.keyword
						end
						if array.length < 3
							return array
						else
							return array.sample(2)
						end
					end
					if 2001 < local_time || local_time < 300
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("night",user.id)
						k.each do |word|
							array << word.keyword
						end
						if array.length < 3
							return array
						else
							return array.sample(2)
						end
					end
				end
			end
		end
	# ----------------------------------