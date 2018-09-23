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


end