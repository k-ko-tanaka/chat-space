# chatspace DB設計
# 用意するテーブル
- usersテーブル_ユーザー情報（名前、アドレス）
- messagesテーブル_チャット画面（メッセージ、画像、投稿者名、グループ名）
- groupsテーブル_グループ名
- users-groupsテーブル_中間テーブル

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index: true|
|email|string|null: false, unique: true|
### Association
- has_many :groups, through: users_groups
- has_many :messages
_ has_many :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|string|   #修正|body|text| contentに変更  
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
### Association
- has_many :group_users   #修正_users_groups
- has_many :users, through: :group_users
- has_many :messages

## uses_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group