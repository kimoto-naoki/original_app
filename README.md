## usersテーブル

| Column             | Type   | Options                   |
| ------------------ | ------ | ------------------------- |
| player_name        | string | null: false               |
| email              | string | null: false, unique: true |
| encrypted_password | string | null: false,              |

### Association
- has_many :statuses



## playersテーブル

| Column    | Type       | Options                        |
| --------- | ---------- | ------------------------------ |
| level     | integer    | null: false                    |
| stamina   | integer    | null: false                    |
| life      | integer    | null: false                    |
| strength  | integer    | null: false                    |
| skill     | integer    | null: false                    |
| exp       | integer    | null: false, default: 0        |
| elapse    | integer    | null: false, default: 0        |
| cleared   | integer    | null: false, default: 0        |
| user      | references | null: false, foreign_key: true |

### Association
- belongs_to :user
- has_one    :item
- has_one    :state
- has_one    :ability



## itemsテーブル

| Column    | Type       | Options                        |
| --------- | ---------- | ------------------------------ |
| stock1    | string     |                                |
| stock2    | string     |                                |
| stock3    | string     |                                |
| stock4    | string     |                                |
| stock5    | string     |                                |
| player    | references | null: false, foreign_key: true |

### Association
- belongs_to :player



## statesテーブル

| Column        | Type       | Options                  |
| ------------- | ---------- | ------------------------ |
| straw         | string     |                          |
| phase         | string     | default: "start"         |
| growth_type   | string     | default: "normal"        |
| player        | references | null: false, foreign_key |

### Association
- belongs_to :player



## abilitysテーブル

| Column       | Type        | Options                  |
| ------------ | ----------- | ------------------------ |
| main_ability | string      |                          |
| sub_ability  | string      |                          |
| player        | references | null: false, foreign_key |

### Association
- belongs_to :player

