
Rails.application.routes.draw do
  get 'messages/index'
  resources :messages
  root "messages#index"
end