class CreateKeywords < ActiveRecord::Migration
  def change
    create_table :keywords do |t|
      t.string   :keyword
      t.string   :period_of_time
      t.integer  :user_id

      t.timestamps
    end
  end
end
