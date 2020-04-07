Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :todos, only: [:index, :create, :update, :destroy]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
