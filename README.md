# chatspace DB設計
# 用意するテーブル
userテーブル_ユーザー情報（名前、アドレス）
messageデーブル_チャット画面（メッセージ、画像、投稿者名、グループ名）
groupテーブル_グループ名
users-groupsデーブル_中間デーブル

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|string|null: false, add_index: true|
|email|string|null: false, unique: true|
### Association
- has_many :groups, through: users-groups
- has_many :message
_ has_many :users-groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|grpup_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|atring|null: false, unique: true|
### Association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :messages

## uses_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group