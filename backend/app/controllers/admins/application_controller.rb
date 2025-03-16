class Admins::ApplicationController < ActionController::Base

  def after_sign_in_path_for(resource)
    '/sDet4Stsg1S-admin'
  end
end