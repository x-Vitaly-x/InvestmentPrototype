class InvestmentCompany < ApplicationRecord
  has_many :users, :class_name => 'Users::Investor'
  has_many :investments
end
