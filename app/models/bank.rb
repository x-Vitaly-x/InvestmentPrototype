class Bank < ApplicationRecord
  has_many :users_bankers, :class_name => 'Users::Banker'
  has_many :mortgages

  validates :title, presence: true, uniqueness: true
end
