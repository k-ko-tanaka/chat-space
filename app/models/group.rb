class Group < ApplicationRecord
  has_many :group_users  #add
  has_many :users, through: :group_users  #add
  validates :name, presence: true, uniqueness: true  #add

  has_many :messages　#add
end