Timely::Application.routes.draw do
  devise_for :users, :controllers => {:registrations => "registrations"}

  # devise_for :users

  post '/api_call' => 'home#api_call'
  get '/api_call' => 'home#api_call'

  get '/keywords' => 'user#user_keywords'
  delete '/keywords/:id' => 'user#keyword_destroy'
  post '/keywords' => 'user#keyword_create'

  get '/user/preferences' => 'user#preferences', as: 'edit_user_preferences'
  get '/user/id' => 'user#user_id'

  root to: 'home#index'

  get '/scooterTest' => 'home#scooterTest'

  resources :keywords
  # used to initialize first users


end
