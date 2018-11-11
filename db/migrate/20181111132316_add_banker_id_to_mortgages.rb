class AddBankerIdToMortgages < ActiveRecord::Migration[5.2]
  def change
    add_column :mortgages, :banker_id, :integer
  end
end
