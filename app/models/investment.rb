class InvestmentValidator < ActiveModel::Validator
  def validate(investment)
    unless investment.amount <= investment.mortgage.amount_available
      investment.errors[:amount] << 'Investment limit exceeded!'
    end
  end
end

class Investment < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :mortgage
  belongs_to :investor, class_name: 'Users::Investor', foreign_key: :user_id
  belongs_to :investment_company

  validates_with InvestmentValidator
end
