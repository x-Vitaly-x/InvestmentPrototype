class Api::V1::InvestmentsController < ApplicationController
  before_action :authenticate_user!

  def index
    authorize! :read, :investments
    @investments = current_user.investment_company.investments
    render('api/v1/investments/index', formats: :json)
  end

  def create
    authorize! :create, :investments
    @investment = current_user.investment_company.investments.new(investment_params)
    @investment.user_id = current_user.id
    if @investment.save
      render('api/v1/investments/show', formats: :json)
    else
      render json: {errors: @investment.errors.full_messages}, status: 404
    end
  end

  def destroy
  end

  private

  def investment_params
    params.require(:investment).permit(:amount, :mortgage_id)
  end
end
