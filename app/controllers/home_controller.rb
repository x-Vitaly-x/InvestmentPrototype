class HomeController < ApplicationController
  def index
    if current_user
      if current_user.class == Users::Banker
        redirect_to banker_mortgages_path
      elsif current_user.class == Users::Investor
        redirect_to investor_investments_path
      end
    end
  end

  def mortgages

  end
end
