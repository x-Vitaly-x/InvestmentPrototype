class CreateMortgages < ActiveRecord::Migration[5.2]
  def change
    create_table :mortgages do |t|
      t.integer :bank_id
      t.string :title
      t.integer :risk_classification
      t.datetime :due_date
      t.decimal :amount, :precision => 12, :scale => 2
      t.decimal :interest_rate, :precision => 5, :scale => 2

      t.timestamps
    end
  end
end
