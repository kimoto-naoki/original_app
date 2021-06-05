class GamesController < ApplicationController
  before_action :login_check
  before_action :current_user
  before_action :set_player

  def route    
    render @player.phase
  end


  def start
  end

  def beginning
    @player.update(player_params.merge(phase: params[:phase]))    
    render @player.phase
  end

  def index
  end

  def adventure
    map_1_create
  end

private

  def player_params
    params.require(:player).permit(:life, :strength, :skill, :exp, :erapse, :phase, :flag_item, :growth_type, :user_id)
  end

  def login_check
    unless logged_in?
      return redirect_to root_path
    end
  end

  def set_player
    @player = Player.find(current_user.id)
  end
end
