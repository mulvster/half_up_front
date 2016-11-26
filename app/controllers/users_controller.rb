class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      redirect_to new_user_path
    end
  end

  def new
  end

  def edit
    @user = User.find params[:id]
  end

  def show
    @user = User.find params[:id]
    @allowed_to_edit = (session[:user_id] == params[:id].to_i).to_s
    # puts "Godzilla .#{session[:user_id]},#{session[:user_id].class},#{params[:id]},#{params[:id].class},#{@allowed_to_edit}."
  end

  def update
    @user = User.find params[:id]
    puts "user updated"
    if @user.update(user_params)
      redirect_to user_path
    else
      redirect_to edit_user_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :country, :region, :province, :locality, :user_type, :email, :password, :password_confirmation, :profile_image)

  end
end
