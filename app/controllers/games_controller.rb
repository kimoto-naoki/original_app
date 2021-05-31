class GamesController < ApplicationController
  before_action :loged_in?
  before_action :current_user

  def start
    @player = Player.find(@current_user.id)
    if @player.start == "true"
      redirect_to games_path
    end
  end

  def beginning
    @player = Player.find(@current_user.id)
    @player.update(player_params.merge(start: params[:start]))    
    redirect_to games_path
  end

  def index
  end

private

  def player_params
    params.require(:player).permit(:life, :strength, :skill, :exp, :erapse, :cleared, :user_id, :start)
  end
end
