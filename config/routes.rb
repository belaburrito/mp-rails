Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :guests, only: [:create, :index]
    end
  end

  get '/*path' => 'homepage#index'

end
