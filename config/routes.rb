Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tasks, defaults: {format: :json}
  devise_for :users, controllers: {registrations: "registrations"}

  get 'investment_options', to: 'home#investment_options'
  get 'current_investments', to: 'home#current_investments'
  get 'deposit_withdraw', to: 'home#deposit_withdraw'
  get 'settings', to: 'home#settings'

  root to: 'home#index'
end
