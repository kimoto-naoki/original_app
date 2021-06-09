$(function() {

  // プレイヤーデータ生成
  function playerCreate(level,life,strength,skill,stock1,stock2,stock3,stock4,stock5){
    return  obj = {level: parseFloat(level),life: parseFloat(life), strength: parseFloat(strength), skill: parseFloat(skill),
        stock1: stock1, stock2: stock2, stock3: stock3, stock4: stock4, stock5: stock5}
  };

  // エンカウント処理
  function encount(name, image) {
    // $('#battle-ground').css('display','block');
    $('#battle-ground').show();
    $('#announce').show();
    $('#enemy').attr('src', image);
    $('#enemy-window').animate({top: '12.5%'},100);
    $('#battle-text').text(`${name} があらわれた！`);
  };

  // ターン開始の処理
  function turnSet(msec, life){
    setTimeout(function(){
      $('#battle-text').text('どうする？');
      $('.command-list').slideDown(100);
      $('#life-display').css('display','block');
      $('#life-value').text(life)
    },msec)
  };

  // ランダム数値生成関数
  function getRandom(min, max){
    let random = Math.floor(Math.random() * (max + 1 - min) + min);
    return random
  };

  // 「こうげき」の演出
  function playerAttack(damage){
    return new Promise((resolve) =>{
      $('#battle-text').text('');
      $('.command-list').hide();
      $('#enemy').addClass('flash');
      setTimeout(function(){
        $('#enemy').removeClass('flash');
        resolve();
      },500);
    })
    .then(function(){      
      return new Promise((resolve) =>{
        $('#battle-text').text(`${damage}のダメージをあたえた！`);
        setTimeout(function(){
          resolve();
        },800);
      });
    })
  };

  // 敵の攻撃演出
  function enemyAttack(name, damage){
    return new Promise((resolve) =>{
      setTimeout(function(){
        $('#battle-text').text(`${name}のこうげき！`);
        resolve();
      },400);
    })
    .then(function(){
      return new Promise((resolve) =>{
        setTimeout(function(){
          $('#battle-ground').addClass('vibration');
          resolve()
        },500);
      });
    })
    .then(function(){
      return new Promise((resolve) =>{
        setTimeout(function(){
          $('#battle-ground').removeClass('vibration');
          $('#battle-text').text(`${damage}のダメージをうけた！`);
          resolve()
        },500);
      });
    })
  }

  // バトル終了処理
  function battleResult(y, x){
    return new Promise((resolve) =>{
      $('#battle-text').text('敵をやっつけた！');
      $('#enemy').attr('src', '');
      setTimeout(()=> {
        $('#life-display').hide()
        $('#battle-ground').hide()
        $('#announce').hide()
        $('#enemy-window').css({top: '-150%'},100);        
        $(`#${y}-${x}`).removeClass('value-5').addClass('value-1');
        resolve()
      },2000);
    })
  }

  // アイテム入手処理
  function getItem(){
    return new Promise((resolve)=>{
      $('#battle-ground').show()
      $('#field-announce').show()
      // $('#confirm-btn').show()
      $('#field-text').html('銘刀・熊討（くまうち）を手に入れた！<br>【 効果 】クマに大ダメージ');
    })
  }

  // バトルに使う変数
  let player = playerCreate($('#level').text(),$('#life').text(),$('#strength').text(),
  $('#skill').text(),$('#stock1').text(),$('#stock2').text(),$('#stock3').text(),$('#stock4').text(),$('#stock5').text())
  let enemy2 = {name: "クマ", life: 170, strength: 70, image: "/assets/kuma-14dd4e65d983e3dcb513c6df23bf16bc6b0b57acff84a3e533653f8c1f1ebd94.png"};
  let enemy1 = {name: "クマ", life: 150, strength: 70, image: "/assets/kuma-14dd4e65d983e3dcb513c6df23bf16bc6b0b57acff84a3e533653f8c1f1ebd94.png"};
  let enemyStrength = 0;
  let enemyName = ""
  let giveDamage = 0;
  let receiveDamage = 0
  let quotaDamage;
  // バトルに使う変数

  // マップ移動に使う変数
  let playerPosition = [12,12];
  // let playerPosition = [6,10];
  let movePosition;
  let mapData =  [
    [1,1,1,1,1,1,1,1,1,1,1,1,3],
    [1,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0],
    [1,1,1,1,5,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,0,0,0,0,0,0,0,0],
    [1,0,1,1,1,0,1,0,1,1,1,1,4],
    [1,0,0,0,1,0,1,0,1,0,0,0,0],
    [1,0,1,0,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,1,1,0,5,1,1],
    [0,0,1,0,1,0,0,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,0,1]
  ];
  // マップ移動に使う変数




  $('#map-1').on('click',function(){
    $(this).hide();
    $('#modal').hide();
  });

  $('#up-key').on('click',function(){
    movePosition = [(playerPosition[0]-1), playerPosition[1]];
    if (mapData[movePosition[0]][movePosition[1]] === 1){
      $(`#${movePosition[0]}-${movePosition[1]}`).removeClass('value-1').addClass('value-2');
      $(`#${playerPosition[0]}-${playerPosition[1]}`).removeClass('value-2').addClass('value-1');
      mapData[playerPosition[0]][playerPosition[1]] = 1;
      playerPosition[0] = movePosition[0];
    }else if(mapData[movePosition[0]][movePosition[1]] === 5){
      totalDamage = 0
      quotaDamage = 170
      enemyName = "クマ"
      enemyStrength = 70
      encount(enemy2.name, enemy2.image);
      turnSet(1500, player.life);
    }
  });

  $('#right-key').on('click',function(){
    movePosition = [(playerPosition[0]), playerPosition[1]+1];
    if (mapData[movePosition[0]][movePosition[1]] === 1){
      $(`#${movePosition[0]}-${movePosition[1]}`).removeClass('value-1').addClass('value-2');
      $(`#${playerPosition[0]}-${playerPosition[1]}`).removeClass('value-2').addClass('value-1');
      mapData[playerPosition[0]][playerPosition[1]] = 1;
      playerPosition[1] = movePosition[1];
    }else if (mapData[movePosition[0]][movePosition[1]] === 4){
      getItem();
    } 
  });

  $('#under-key').on('click',function(){
    movePosition = [(playerPosition[0]+1), playerPosition[1]];
    if (mapData[movePosition[0]][movePosition[1]] === 1){
      $(`#${movePosition[0]}-${movePosition[1]}`).removeClass('value-1').addClass('value-2');
      $(`#${playerPosition[0]}-${playerPosition[1]}`).removeClass('value-2').addClass('value-1');
      mapData[playerPosition[0]][playerPosition[1]] = 1;
      playerPosition[0] = movePosition[0];
    }
  });

  $('#left-key').on('click',function(){
    movePosition = [(playerPosition[0]), playerPosition[1]-1];
    if (mapData[movePosition[0]][movePosition[1]] === 1){
      $(`#${movePosition[0]}-${movePosition[1]}`).removeClass('value-1').addClass('value-2');
      $(`#${playerPosition[0]}-${playerPosition[1]}`).removeClass('value-2').addClass('value-1');
      mapData[playerPosition[0]][playerPosition[1]] = 1;
      playerPosition[1] = movePosition[1];
    }else if(mapData[movePosition[0]][movePosition[1]] === 5){
      totalDamage = 0
      quotaDamage = 150
      enemyName = "クマ"
      enemyStrength = 70
      encount(enemy1.name, enemy1.image);
      turnSet(1500, player.life);

      
    }
  });


  $('#command-attack').on('click',function(){
    giveDamage = player.strength + getRandom(0, 3) - getRandom(0, 3);
    receiveDamage = enemyStrength + getRandom(0, 3) - getRandom(0, 3);
    totalDamage += giveDamage;
    if(totalDamage > quotaDamage){
      playerAttack(giveDamage).then(function(){
        mapData[movePosition[0]][movePosition[1]] = 1;
        return battleResult(movePosition[0],movePosition[1]);
      });
    }else if(player.life - receiveDamage < 0){
      player.life = 0
      playerAttack(giveDamage).then(function(){
        return enemyAttack(enemyName, receiveDamage)
      }).then(function(){
        turnSet(1300, player.life);
      })
    }else{
      player.life -= receiveDamage
      playerAttack(giveDamage).then(function(){
        return enemyAttack(enemyName, receiveDamage)
      }).then(function(){
        turnSet(1300, player.life);
      })
    }
  })
  
  $('#confirm-btn').on('click', function(){
    $('#field-announce').hide();
    $('#battle-ground').hide();
  });


});