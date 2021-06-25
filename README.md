# original_app
## 概要
簡易的なダンジョン探索型ゲームが遊べるアプリです。  
ユーザー登録後、最初にゲームスタートを押すと開始ボーナスが与えられるので、
規定ポイント内で好きな能力値に割り振ってください。  
割り振りが終わるとゲーム内メインメニューに遷移します。  
  
冒険ボタンを押すとマップが生成され、ゴール地点に到達することでゲームクリアとなります。  

## 制作意図
これまで学習してきたことは主にRailsを用いたサーバーサイド側の知識だったので、
フロント側のスキルも磨きたいと思い、今の自分でどこまで「ゲーム」にできるかをチャレンジしてみました。

既存の知識も復習がてら活かしたかったので、ログイン機能を設け、１ユーザーにつき１つの
プレーヤーデータを紐づけてデータベースに保存するシステムを組んでいます。  
  
## 工夫点
ごくごく小さなゲーム規模の中で、少しでもプレイヤーごとの色が出せる要素として
ゲーム開始時に能力値をカスタマイズするシステムを取り入れました。
  
戦闘画面などのちょっとした演出で往年のゲームファンが懐かしさを感じられるように意識しました。

[![Image from Gyazo](https://i.gyazo.com/6a4b416a53fa5fb923f72b7bf9ea3e1d.gif)](https://gyazo.com/6a4b416a53fa5fb923f72b7bf9ea3e1d)


## 開発環境
Ruby/Ruby on Rails/MySQL/Github/Visual Studio Code

## 今後実装したい機能
- レスポンシブ対応
- 新たなマップ
- プレイヤーの行動次第でレベルアップ時の成長傾向が変わるシステム
- アビリティの実装
- クリアのリザルト情報がトップページに表示されるシステム





## usersテーブル

| Column             | Type    | Options                     |
| ------------------ | ------- | --------------------------- |
| player_name        | string  | null: false                 |
| password           | string  | null: false                 |
| encrypted_password | string  | null: false                 |

### Association
- has_one :player



## playersテーブル

| Column      | Type       | Options                        |
| ----------- | ---------- | ------------------------------ |
| level       | integer    | null: false, default: 1        |
| stamina     | integer    | null: false, default: 100      |
| life        | integer    | null: false, default: 100      |
| strength    | integer    | null: false, default: 100      |
| skill       | integer    | null: false, default: 100      |
| exp         | integer    | null: false, default: 0        |
| elapse      | integer    | null: false, default: 0        |
| phase       | string     | null: false, default: "start"  |
| flag_item   | string     | default: "---"                 |
| growth_type | string     | default: "normal"              |
| user        | references | null: false, foreign_key: true |

### Association
- belongs_to :user
- has_one    :item
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


## abilitysテーブル

| Column       | Type        | Options                  |
| ------------ | ----------- | ------------------------ |
| main_ability | string      | default: "nothing"       |
| sub_ability  | string      | default: "nothing"       |
| player       | references  | null: false, foreign_key |

### Association
- belongs_to :player

