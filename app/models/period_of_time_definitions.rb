class PeriodOfTimeDefinitions < ActiveRecord::Base
  attr_accessible :afternoon, :evening, :morning, :night, :noon, :user_id
end
