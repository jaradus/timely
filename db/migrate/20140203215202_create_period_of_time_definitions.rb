class CreatePeriodOfTimeDefinitions < ActiveRecord::Migration
  def change
    create_table :period_of_time_definitions do |t|
      t.integer :morning, default: '300'
      t.integer :noon, default:  '1130'
      t.integer :afternoon, default: '1300'
      t.integer :evening, default: '1730'
      t.integer :night, default: '2000'
      t.integer :user_id, default: 

      t.timestamps
    end
  end
end




