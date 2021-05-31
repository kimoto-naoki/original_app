class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    
    if @user.save
      Player.create(user_id: @user.id)
      log_in(@user)
      redirect_to root_path
    else
      render :new
    end
  end

private

  def user_params
    params.require(:user).permit(:player_name, :password, :password_confirmation)
  end
end
