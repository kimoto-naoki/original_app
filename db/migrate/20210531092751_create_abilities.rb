class CreateAbilities < ActiveRecord::Migration[6.0]
  def change
    create_table :abilities do |t|
      t.string :main_ability, default: "nothing"
      t.string :sub_ability,  default: "nothing"
      t.references :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
