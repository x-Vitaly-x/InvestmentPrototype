module Users
  class Banker < User
    belongs_to :bank
  end
end
