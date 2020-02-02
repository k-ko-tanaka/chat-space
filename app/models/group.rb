class Group < ApplicationRecord
  has_many :group_users  #add
  has_many :users, through: :group_users  #add
  validates :name, presence: true, uniqueness: true  #add

  has_many :messages  #add

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.content?
        last_message.content
      else
        '画像が投稿されています'
      end
    else
      'まだメッセージはありません。'
    end
  end
  
end