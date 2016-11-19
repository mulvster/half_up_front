class UsersController < ApplicationController


  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      redirect_to user_path
    else
      redirect_to new_user_path
    end
  end

  def new
  end

  def edit
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :user_type, :email, :password, :password_confirmation)
  end

end
