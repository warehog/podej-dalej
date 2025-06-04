Rails.application.routes.draw do
  namespace :api do
    resources :posts, only: [:index, :show, :create, :update, :destroy] do
      resources :attachments, only: [:destroy]
    end
  end

  devise_for :admins, path: 'sDet4Stsg1S-auth'
  mount RailsAdmin::Engine => '/sDet4Stsg1S-admin', as: 'rails_admin'
end
