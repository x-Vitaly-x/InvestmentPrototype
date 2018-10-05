module Users
  class Admin < User
    def get_role
      'admin'
    end
  end
end
