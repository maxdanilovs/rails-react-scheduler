class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.date :date
      t.boolean :completed, default: false
      t.string :title
      t.references :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end
