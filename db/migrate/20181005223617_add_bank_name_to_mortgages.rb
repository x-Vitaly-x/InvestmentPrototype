class AddBankNameToMortgages < ActiveRecord::Migration[5.2]
  def change
    add_column :mortgages, :bank_name, :string
  end
end
