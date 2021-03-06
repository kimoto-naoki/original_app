module GamesHelper

  def phase_check
    case @player.phase
    when "index"
      render :index
    when "start"
      render :start
    end
  end

  def map_1_create
    @map_number = 'map-1'
    @map_data = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,1,0,0,0],
      [1,1,1,1,1,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,0,0],
      [1,1,1,1,5,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0],
      [3,0,1,1,1,0,1,0,1,1,1,1,4],
      [0,0,0,0,1,0,1,0,1,0,1,0,0],
      [1,0,1,0,1,1,1,1,1,0,1,0,1],
      [1,0,1,0,0,0,1,0,0,0,1,0,1],
      [1,1,1,0,1,1,1,1,1,1,5,1,1],
      [0,0,1,0,1,0,0,0,0,0,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,0,2]
    ]

    @playerPosition = [12,12]
    @mapData = @map_data
    @enemyData = [
      {name: "クマ", life: 150, strength: 70, image: "/assets/kuma-14dd4e65d983e3dcb513c6df23bf16bc6b0b57acff84a3e533653f8c1f1ebd94.png"},
      {name: "クマ", life: 170, strength: 70, image: "/assets/kuma-14dd4e65d983e3dcb513c6df23bf16bc6b0b57acff84a3e533653f8c1f1ebd94.png"}
    ]


  end
end