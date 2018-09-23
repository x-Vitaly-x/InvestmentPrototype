module Users
  class Investor < User
    belongs_to :investment_company
  end
end
