class SessionsController < ApplicationController
  def new
  end

  # def create
  #   # If the user exists AND the password entered is correct.
  #   if user = User.authenticate_with_credentials(params[:email], params[:password])      # Save the user id inside the browser cookie. This is how we keep the user
  #     # logged in when they navigate around our website.
  #     session[:user_id] = user.id
  #     redirect_to user_path(user)
  #   else
  #   # If user's login doesn't work, send them back to the login form.
  #     redirect_to new_session_path
  #   end
  # end


  def create
    user = User.from_omniauth(request.env['omniauth.auth'])
    session[:user_id] = user.id
    redirect_to user_path(user)
  end

  def show
    @user = User.find_by_id(session[:user_id])
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

end
