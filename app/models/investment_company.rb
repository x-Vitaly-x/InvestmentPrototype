class InvestmentCompany < ApplicationRecord
  has_many :users_investors, :class_name => 'Users::Investor'
end
