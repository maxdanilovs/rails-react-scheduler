class AddTimeToTodo < ActiveRecord::Migration[5.2]
  def change
    add_column :todos, :time, :string, default: "00:00"
  end
end
