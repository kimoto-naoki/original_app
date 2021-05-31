class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.integer    :level,    null: false, default: "1"
      t.integer    :stamina,  null: false, default: "100"
      t.integer    :life,     null: false, default: "100"
      t.integer    :strength, null: false, default: "100"
      t.integer    :skill,    null: false, default: "100"
      t.integer    :exp,      null: false, default: "0"
      t.integer    :elapse,   null: false, default: "0"
      t.integer    :cleared,  null: false, default: "0"
      t.references :user,     null: false, foreign_key: true
      t.string     :start,    null: false, default: "false"

      t.timestamps
    end
  end
end
