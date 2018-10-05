class HomeController < ApplicationController
  def index
    if current_user
      if current_user.class == Users::Banker
        redirect_to banker_mortgages_path
      end
    end
  end

  def mortgages

  end
end
