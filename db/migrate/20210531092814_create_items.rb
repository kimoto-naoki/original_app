class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :stock1, default: "-未所持-"
      t.string :stock2, default: "-未所持-"
      t.string :stock3, default: "-未所持-"
      t.string :stock4, default: "-未所持-"
      t.string :stock5, default: "-未所持-"
      t.references :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
