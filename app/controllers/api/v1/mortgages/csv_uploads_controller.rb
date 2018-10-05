class Api::V1::Mortgages::CsvUploadsController < ApplicationController
  before_action :authenticate_user!

  def create
    authorize! :create, :mortgage_csv_upload
    Mortgage.import_csv(params['csv_upload'], current_user.id, params['delete_old_entries'] == '1')
    render json: {}, status: 200
  rescue
    render json: {error: 'Failed to parse csv!'}, status: 500
  end
end
