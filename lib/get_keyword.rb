	# ----------------------------------
		#NOTE: THERE IS NO ROUTE FOR THIS METHOD

		class GetKeyword

			def self.get_keywords(local_time, user)

				if user == nil 
					if local_time.between?(300,1130)
						return ["breakfast", "bagel", "coffee"]
					end
					if local_time.between?(1130,1300)
						return ["lunch", "burgers", "salads"]
					end
					if local_time.between?(1300,1730)
						return ["coffee", "tea", "crumpets", "petit fours"]
					end
					if local_time.between?(1730,2000)
						return ["dinner", "steak", "thai", "mexican"]
					end
					if 2000 < local_time || local_time < 300
						return ["bars", "clubs", "dancing", "nightlife"]
					end
				else
					if local_time.between?(300,1130)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("morning",user.id)
						k.each do |word|
							array << word.keyword
						end
						return array
					end
					if local_time.between?(1130,1300)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("noon",user.id)
						k.each do |word|
							array << word.keyword
						end
						return array		
					end
					if local_time.between?(1300,1730)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("afternoon",user.id)
						k.each do |word|
							array << word.keyword
						end
						return array
					end
					if local_time.between?(1730,2000)
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("evening",user.id)
						k.each do |word|
							array << word.keyword
						end
						return array
					end
					if 2000 < local_time || local_time < 300
						array = []
						k = Keyword.find_all_by_period_of_time_and_user_id("night",user.id)
						k.each do |word|
							array << word.keyword
						end
						return array
					end
				end
			end
		end
	# ----------------------------------