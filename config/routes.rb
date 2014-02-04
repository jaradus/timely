Timely::Application.routes.draw do
  
  devise_for :users

  post '/api_call' => 'home#api_call'
  get '/api_call' => 'home#api_call'

  get '/user/preferences' => 'user#preferences', as: 'edit_user_preferences'

  root to: 'home#index'

  get '/scooterTest' => 'home#scooterTest'



end
