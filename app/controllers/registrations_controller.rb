class RegistrationsController < Devise::RegistrationsController
  def new
    if params[:signup] == 'banker'
      self.resource = Users::Banker.new_with_session({}, session)
    else
      self.resource = Users::Investor.new_with_session({}, session)
    end
    yield resource if block_given?
    respond_with resource
  end

  # POST /resource
  def create
    build_resource(sign_up_params)
    if resource.class == Users::Banker
      resource.bank = Bank.new(bank_params)
    else
      resource.investment_company = InvestmentCompany.new(investment_company_params)
    end
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  private

  # Notice the name of the method
  def sign_up_params
    params.require(:user).permit(:type, :email, :password, :password_confirmation)
  end

  def bank_params
    params.require(:bank).permit(:title)
  end

  def investment_company_params
    params.require(:investment_company).permit(:title)
  end

end