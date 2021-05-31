class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string  :player_name,     null: false
      t.string  :password_digest, null: false
      t.boolean :save_data,       null: false, default: false
      t.timestamps
    end
  end
end
