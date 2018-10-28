class CreateInvestments < ActiveRecord::Migration[5.2]
  def change
    create_table :investments do |t|
      t.integer :mortgage_id
      t.integer :user_id
      t.integer :investment_company_id
      t.decimal :amount, :precision => 12, :scale => 2
      t.string :type

      t.timestamps
    end
  end
end
