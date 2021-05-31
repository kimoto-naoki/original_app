Rails.application.routes.draw do
  root to: 'homes#index'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :users, only: [:new, :create]

  resources :games, only: [:index]
  get '/start', to: 'games#start'
  patch '/start', to: 'games#beginning'    
end
