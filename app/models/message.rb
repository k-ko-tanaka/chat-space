class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?  #外部キー制約

  mount_uploader :image, ImageUploader  #Modelカラムにアップローダー紐付け
end
