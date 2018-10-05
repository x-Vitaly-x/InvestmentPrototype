module Users
  class Banker < User
    belongs_to :bank
    accepts_nested_attributes_for :bank

    def get_role
      'banker'
    end
  end
end
