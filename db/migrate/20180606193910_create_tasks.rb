class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
