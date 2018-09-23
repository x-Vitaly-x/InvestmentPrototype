class AddCompanyIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :investment_company_id, :integer
    add_column :users, :bank_id, :integer
  end
end
