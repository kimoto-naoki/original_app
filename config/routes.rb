Rails.application.routes.draw do
  root to: 'homes#index'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :users, only: [:new, :create]

  get 'route', to: 'games#route'
  resources :games, only: [:index]
  get '/start', to: 'games#start'
  patch '/start', to: 'games#beginning'
  get '/adventure', to: 'games#adventure'
end
