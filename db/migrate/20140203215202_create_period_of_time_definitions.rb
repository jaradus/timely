class CreatePeriodOfTimeDefinitions < ActiveRecord::Migration
  def change
    create_table :period_of_time_definitions do |t|
      t.integer :morning, default: 
      t.integer :noon, default: 
      t.integer :afternoon, default: 
      t.integer :evening, default: 
      t.integer :night, default: 
      t.integer :user_id, default: 

      t.timestamps
    end
  end
end
