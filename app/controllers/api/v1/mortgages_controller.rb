class Api::V1::MortgagesController < ApplicationController
  before_action :authenticate_user!

  def create
    @mortgage = current_user.bank.mortgages.new(mortgage_params)
    authorize! :create, :mortgages
    if @mortgage.save
      render('api/v1/mortgages/show', formats: :json)
    else
      render json: {errors: @mortgage.errors.full_messages}, status: 404
    end
  end

  def index
    authorize! :read, :mortgages
    if current_user.get_role == 'banker'
      @mortgages = current_user.bank.mortgages
    else
      @mortgages = Mortgage.all
    end
    render('api/v1/mortgages/index', formats: :json)
  end

  def destroy
    @mortgage = Mortgage.find(params[:id])
    authorize! :destroy, @mortgage
    @mortgage.destroy
    render json: {}, status: 200
  end

  private

  def mortgage_params
    params.require(:mortgage).permit(:title, :risk_classification, :due_date, :amount, :interest_rate)
  end

end
