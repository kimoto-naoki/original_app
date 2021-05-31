## usersテーブル

| Column             | Type    | Options                     |
| ------------------ | ------- | --------------------------- |
| player_name        | string  | null: false                 |
| password           | string  | null: false                 |
| encrypted_password | string  | null: false                 |

### Association
- has_one :player



## playersテーブル

| Column    | Type       | Options                        |
| --------- | ---------- | ------------------------------ |
| level     | integer    | null: false, default: 1        |
| stamina   | integer    | null: false, default: 100      |
| life      | integer    | null: false, default: 100      |
| strength  | integer    | null: false, default: 100      |
| skill     | integer    | null: false, default: 100      |
| exp       | integer    | null: false, default: 0        |
| elapse    | integer    | null: false, default: 0        |
| cleared   | integer    | null: false, default: 0        |
| user      | references | null: false, foreign_key: true |
| start     | string     | null: false, default: "false"  |

### Association
- belongs_to :user
- has_one    :item
- has_one    :state
- has_one    :ability



## itemsテーブル

| Column    | Type       | Options                        |
| --------- | ---------- | ------------------------------ |
| stock1    | string     | default: "-未所持-"             |
| stock2    | string     | default: "-未所持-"             |
| stock3    | string     | default: "-未所持-"             |
| stock4    | string     | default: "-未所持-"             |
| stock5    | string     | default: "-未所持-"             |
| player    | references | null: false, foreign_key: true |

### Association
- belongs_to :player



## statesテーブル

| Column        | Type       | Options                  |
| ------------- | ---------- | ------------------------ |
| key_item      | string     | default: "---"           |
| phase         | string     | default: "start"         |
| growth_type   | string     | default: "normal"        |
| player        | references | null: false, foreign_key |

### Association
- belongs_to :player



## abilitysテーブル

| Column       | Type        | Options                  |
| ------------ | ----------- | ------------------------ |
| main_ability | string      | default: "nothing"       |
| sub_ability  | string      | default: "nothing"       |
| player       | references  | null: false, foreign_key |

### Association
- belongs_to :player

