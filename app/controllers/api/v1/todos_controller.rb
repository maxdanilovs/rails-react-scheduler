class Api::V1::TodosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    todos = current_user.todos.all
    render json: todos
  end

  def create
    todo = Todo.new(todo_params)
    todo.user_id = current_user.id
    todo.save
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    if todo.user_id == current_user.id
      todo.update(completed: !todo.completed)
    end
  end

  def destroy
    todo = Todo.find(params[:id])
    if todo.user_id == current_user.id
      todo.destroy
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :date, :time)
  end
end
