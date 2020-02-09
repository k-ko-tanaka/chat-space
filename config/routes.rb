Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]   #indexを追記
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create, :edit]   #groupsにネスト
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end  
  end
end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html