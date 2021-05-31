class AddSaveDataToUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column  :users, :save_data, :boolean
  end
end
