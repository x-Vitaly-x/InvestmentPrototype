module Users
  class Investor < User
    belongs_to :investment_company
    accepts_nested_attributes_for :investment_company
    has_many :investments

    def get_role
      'investor'
    end
  end
end
