class ApplicationController < ActionController::Base

  # so that you get a normal error response
  rescue_from CanCan::AccessDenied do |exception|
    render json: {error: "access violation"}, status: 403
    ## to avoid deprecation warnings with Rails 3.2.x (and incidentally using Ruby 1.9.3 hash syntax)
    ## this render call should be:
    # render file: "#{Rails.root}/public/403", formats: [:html], status: 403, layout: false
  end
end
