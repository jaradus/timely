Timely::Application.routes.draw do
  
  devise_for :users

  post '/api_call' => 'home#api_call'

  root to: 'home#index'


end
