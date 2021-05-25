class SessionsController < ApplicationController
  def new
    
  end

  def create
    user = User.find_by(player_name: params[:session][:player_name])
    if user && user.authenticate(params[:session][:password])
      log_in(user)
      redirect_to root_path
    else
      flash.now[:danger] = '入力情報が正しくありません'
      render :new
    end
  end

  def destroy
    log_out
    redirect_to root_path
  end
end
