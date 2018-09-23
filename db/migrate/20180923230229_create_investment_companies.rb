class CreateInvestmentCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :investment_companies do |t|
      t.string :title
      t.string :type

      t.timestamps
    end
  end
end
