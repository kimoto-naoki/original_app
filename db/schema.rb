# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_31_092814) do

  create_table "abilities", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "main_ability", default: "nothing"
    t.string "sub_ability", default: "nothing"
    t.bigint "player_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_abilities_on_player_id"
  end

  create_table "items", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "stock1", default: "-未所持-"
    t.string "stock2", default: "-未所持-"
    t.string "stock3", default: "-未所持-"
    t.string "stock4", default: "-未所持-"
    t.string "stock5", default: "-未所持-"
    t.bigint "player_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["player_id"], name: "index_items_on_player_id"
  end

  create_table "players", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "level", default: 1, null: false
    t.integer "stamina", default: 100, null: false
    t.integer "life", default: 100, null: false
    t.integer "strength", default: 100, null: false
    t.integer "skill", default: 100, null: false
    t.integer "exp", default: 0, null: false
    t.integer "elapse", default: 0, null: false
    t.string "phase", default: "start", null: false
    t.string "flag_item", default: "---"
    t.string "growth_type", default: "normal"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_players_on_user_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "player_name", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "abilities", "players"
  add_foreign_key "items", "players"
  add_foreign_key "players", "users"
end
