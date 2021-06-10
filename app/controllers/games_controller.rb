class GamesController < ApplicationController
  before_action :login_check
  before_action :current_user
  before_action :set_player

  def route
    phase_check
  end


  def start
  end

  def beginning
    @player.update(player_params.merge(phase: params[:phase]))    
    phase_check
  end

  def index
  end

  def adventure
    map_1_create
    @items = Item.find(@player.id)
    # respond_to do |format|
    #   format.html{render 'games/adventure.html.erb'}
    #   format.js{render 'games/adventure.js.erb'}
    # end    
  end

  def create
  end

private

  def player_params
    params.require(:player).permit(:level, :life, :strength, :skill, :exp, :erapse, :phase, :flag_item, :growth_type, :user_id)
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
