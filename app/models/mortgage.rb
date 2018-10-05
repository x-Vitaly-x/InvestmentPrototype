class Mortgage < ApplicationRecord
  belongs_to :bank

  enum risk_classification: [
      'A', 'B', 'C'
  ]

  validates_presence_of :title, :risk_classification, :due_date, :amount, :interest_rate
end
