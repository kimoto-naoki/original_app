$(function() {

  // プレイヤーデータ生成
  function playerCreate(level,life,strength,skill,stock1,stock2,stock3,stock4,stock5){
    return  obj = {level: parseFloat(level),life: parseFloat(life), strength: parseFloat(strength), skill: parseFloat(skill),
        stock1: stock1, stock2: stock2, stock3: stock3, stock4: stock4, stock5: stock5}
  };

  // エンカウント処理
  function encount(name, image) {
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
  function battleResult(y, x, life){
    return new Promise((resolve) =>{
      $('#battle-text').text('敵をやっつけた！');
      $('#enemy').attr('src', '');
      setTimeout(()=> {
        $('#current-life').text(life)
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
  function getItem(item, itemText){
    return new Promise((resolve)=>{
      $('#battle-ground').show()
      $('#field-announce').show()
      $('#field-text').html(`${item}(くまうち)を手に入れた！<br>${itemText}`);
      $('#item1').html(`<h3>${item}</h3>`);
      $('#use-item1').text(item);
    })
  }

  // ゲームオーバー処理
  function gameOver(){
    $('#battle-ground').show();
    $('#field-announce').show();
    $('#field-text').css('text-align','center').css('font-size','18px')
    $('#field-text').html('ゲームオーバー！わたしの冒険はここで終わってしまった！');
    $('#confirm-btn').addClass('return-btn').text('戻る')
    $('.return-btn').on('click',function(){
      window.location.href = '/route';
    })
  }

  // ゲームクリア処理
  function gameClear(){
    $('#battle-ground').show();
    $('#field-announce').show();
    $('#field-text').css('text-align','center').css('font-size','18px')
    $('#field-text').html('ゲームクリア！おめでとうございます！');
    $('#confirm-btn').addClass('clear-btn').text('戻る')
    $('.clear-btn').on('click',function(){
      window.location.href = '/route';
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

  let useItem1 = "use-item1"
  let useItem2 = "use-item2"
  let useItem3 = "use-item3"
  let useItem4 = "use-item4"
  let useItem5 = "use-item5"
  // バトルに使う変数

  // マップ移動に使う変数
  let playerPosition = [8,6];
  // let playerPosition = [6,10]; #テストプレイ用の座標
  let movePosition;
  let mapData =  [
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
    [1,1,1,1,1,1,1,1,1,1,1,0,1]
  ];
  // マップ移動に使う変数



  $('#map-1').on('click',function(){
    $(this).hide();
    $('#modal').hide();
  });

  // 以下マップ移動クリック処理
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
      getItem("銘刀・熊討", "【 効果 】クマに大ダメージ")
      $(`#${movePosition[0]}-${movePosition[1]}`).removeClass('value-4').addClass('value-1');
      mapData[movePosition[0]][movePosition[1]] = 1;      
    } 
  });

  $('#under-key').on('click',function(){
    movePosition = [(playerPosition[0]+1), playerPosition[1]];
    if (mapData[movePosition[0]][movePosition[1]] === 1){
      $(`#${movePosition[0]}-${movePosition[1]}`).removeClass('value-1').addClass('value-2');
      $(`#${playerPosition[0]}-${playerPosition[1]}`).removeClass('value-2').addClass('value-1');
      mapData[playerPosition[0]][playerPosition[1]] = 1;
      playerPosition[0] = movePosition[0];
    }else if(mapData[movePosition[0]][movePosition[1]] === 3){
      gameClear();
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
  // 以上マップ移動クリック処理


  $('#command-attack').on('click',function(){
    giveDamage = player.strength + getRandom(0, 3) - getRandom(0, 3);
    receiveDamage = enemyStrength + getRandom(0, 3) - getRandom(0, 3);
    totalDamage += giveDamage;
    if(totalDamage > quotaDamage){
      playerAttack(giveDamage).then(function(){
        mapData[movePosition[0]][movePosition[1]] = 1;
        return battleResult(movePosition[0],movePosition[1], player.life);
      });
    }else if(player.life - receiveDamage < 0){
      player.life = 0
      playerAttack(giveDamage).then(function(){
        return enemyAttack(enemyName, receiveDamage)
      }).then(function(){
        setTimeout(()=>{
          $('#life-value').text(player.life)
          gameOver();
        },1000) 
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


  $('#command-defence').on('click', function(){
    receiveDamage = Math.floor((enemyStrength + getRandom(0, 3) - getRandom(0, 3)) / 2);
    player.life -= receiveDamage
    if (player.life > 0){
      $('#battle-text').text('');
      $('.command-list').hide();
      enemyAttack(enemyName, receiveDamage).then(function(){
        turnSet(1300, player.life);
      })
    }else{
      player.life = 0
      $('#battle-text').text('');
      $('.command-list').hide();
      enemyAttack(enemyName, receiveDamage).then(function(){
        setTimeout(()=>{
          $('#life-value').text(player.life)
          gameOver();
        },1000) 
      })
    }
  });
  
  $('#confirm-btn').on('click', function(){
    $('#field-announce').hide();
    $('#battle-ground').hide();
  });

  $('#command-escape').on('click',function(){
    $('#battle-text').text('命あっての物種じゃ。逃げろぉ！');
    $('.command-list').hide();
    setTimeout(()=>{
      $('#current-life').text(player.life)
      $('#life-display').hide()
      $('#battle-ground').hide()
      $('#announce').hide()
      $('#enemy-window').css({top: '-150%'},100);
    },2000)
  });

  $('#command-item').on('click',function(){
    $('.command-list').hide();
    $('.use-item-list').slideDown(100);    
  });

  $('#command-skill').on('click',function(){
    $('.command-list').hide();
    $('.use-skill-list').slideDown(100);    
  });

  $('#back-btn-item').on('click',function(){
    $('.use-item-list').hide()
    $('.command-list').slideDown(100);
  });

  $('#back-btn-skill').on('click',function(){
    $('.use-skill-list').hide()
    $('.command-list').slideDown(100);
  });

  $('#use-item1').on('click',function(){
    if ( $('#use-item1').text().indexOf('熊') != -1){
      $('#battle-text').text('');
      $('.use-item-list').hide();
      playerAttack(9999).then(()=>{
        mapData[movePosition[0]][movePosition[1]] = 1;
        battleResult(movePosition[0],movePosition[1], player.life);
      })
    }
  })
});