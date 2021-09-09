let collision = {
  // weapon size :
  weaponMaxWidth: 0,
  weaponMaxHeight: 0,
  // weapon position :
  weaponPositionX: 0,
  weaponPositionY: 0,
  // current enemy position :
  enemyPositionX: 0,
  enemyPositionY: 0,
  // current enemy size :
  enemieswidth: 0,
  enemiesHeight: 0,
  initCollision: function () {
    console.log("collision init OK");
    collision.weaponMaxWidth = document.querySelector(".weapon_new").offsetWidth;
    collision.weaponMaxHeight = document.querySelector(".weapon_new").offsetHeight;
    collision.weaponPositionX = document.querySelector(".weapon_new").offsetLeft;
    collision.weaponPositionY = document.querySelector(".weapon_new").offsetTop;
    collision.screenPositionX = document.querySelector(".screen_container").offsetLeft;
    collision.screenPositionY = document.querySelector(".screen_container").offsetTop;
  },
  detectCollision: function () {
    for (let enemyIndex = 0; enemyIndex < enemy.allEnemiesTab.length; enemyIndex++) {
      let enemyClassIndex = enemyIndex + 1;
      if ((Math.ceil(player.movePositionX)) === (Math.ceil(enemy.movePositionXtab["enemy_" + enemyClassIndex])) && (Math.ceil(player.movePositionY)) === (Math.ceil(enemy.movePositionYtab["enemy_" + enemyClassIndex]))) {
        if (enemy.allEnemiesTab[enemyIndex] !== 0) {
          player.loseLife();
          let playerElmement = document.querySelector(".player");
          playerElmement.style.backgroundColor = "red";
          setTimeout(function () {
            playerElmement.style.backgroundColor = "black";
          }, 1000);
        }
      }
    }
  },
  detectHitCollision: function () {
    let weaponElement = document.querySelector(".weapon_new");
    if (weaponElement) {
      for (let EnemyIndex = 0; EnemyIndex < enemy.allEnemiesTab.length; EnemyIndex++) {
        let weaponElement = document.querySelector(".weapon_new");
        collision.enemyPositionX = enemy.allEnemiesTab[EnemyIndex].offsetLeft;
        collision.enemyPositionY = enemy.allEnemiesTab[EnemyIndex].offsetTop;
        collision.enemieswidth = enemy.allEnemiesTab[EnemyIndex].offsetWidth;
        collision.enemiesHeight = enemy.allEnemiesTab[EnemyIndex].offsetHeight;
        let weaponPositionX = weaponElement.offsetLeft;
        let weaponPositionY = weaponElement.offsetTop;
        let currentClassIndex = EnemyIndex + 1; // classes index start at 1
        if (weaponPositionX > enemy.movePositionXtab["enemy_" + currentClassIndex] && weaponPositionX < enemy.movePositionXtab["enemy_" + currentClassIndex] + collision.enemieswidth) {
          if (weaponPositionY > enemy.movePositionYtab["enemy_" + currentClassIndex] && weaponPositionY < enemy.movePositionYtab["enemy_" + currentClassIndex] + collision.enemiesHeight) {
            // landed hits counter init
            click.landedCounter++; // adding +1 to counter
            let landedElement = document.querySelector(".landed");
            landedElement.textContent = click.landedCounter;
            // then remove enemy striked with class index
            enemy.removeEnemy(currentClassIndex);
            click.removeWeapon();
            break
          };
        };
      }
    }
  },
  shotEnd: function () {
    let weaponElement = document.querySelector(".weapon_new");
    for (let timeIndex = 0; timeIndex < 300; timeIndex += 5) {
      if (weaponElement) {
        setTimeout("collision.detectHitCollision()", 0 + timeIndex);
      };
    }
    setTimeout(function () {
      let weaponElement = document.querySelector(".weapon_new");
      if (weaponElement) {
        click.removeWeapon();
      };
    }, 305);
  },
}