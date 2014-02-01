class CreateKeywordsUsers < ActiveRecord::Migration
  def change
    create_table :keywords_users do |t|
      t.integer :user_id
      t.integer :keyword_id

      t.timestamps
    end
  end
end
