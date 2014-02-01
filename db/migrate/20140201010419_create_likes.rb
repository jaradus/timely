class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.string  :name
      t.string  :url
      t.float   :rating
      t.string  :address
      t.date    :liked_date
      t.integer :user_id

      t.timestamps
    end
  end
end
