class Investment < ApplicationRecord
  belongs_to :mortgage
  belongs_to :investor, class_name: 'Users::Investor', foreign_key: :user_id
  belongs_to :investment_company
end
