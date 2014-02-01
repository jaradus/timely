class CreateDislikes < ActiveRecord::Migration
  def change
    create_table :dislikes do |t|
      t.string   :name
      t.string   :url
      t.float    :rating
      t.string   :address
      t.date     :disliked_date
      t.integer  :user_id

      t.timestamps
    end
  end
end
