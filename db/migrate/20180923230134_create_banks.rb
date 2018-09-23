class CreateBanks < ActiveRecord::Migration[5.2]
  def change
    create_table :banks do |t|
      t.string :title
      t.string :type

      t.timestamps
    end
  end
end
