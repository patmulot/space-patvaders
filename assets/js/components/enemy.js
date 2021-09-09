let enemy = {
  // enemies properties :
  movePositionX: -2.5,
  movePositionY: -2.5,
  allEnemiesTab: [],
  movePositionXtab: {},
  movePositionYtab: {},
  nbr: 1,
  maxEnemiesNbr: 10,
  previousEnemiesNbr: 0,
  maxEnemieSpeed: 900,
  waveNbr: 1,
  enemyColorValue: 0,
  enemyColorValueR: 0,
  enemyColorValueG: 0,
  enemyColorValueB: 0,
  // enemies methods :
  initEnemy: function () {
    enemy.objectMaxWidth = elements.objectMaxWidth;
    enemy.objectMaxHeight = elements.objectMaxHeight;
    setTimeout("enemy.createEnemy()", 2000);
    setTimeout("enemy.enemyMovement()", 2500);
  },
  createEnemy: function () {
    // sounds.octave();
    let templateEnemy = document.querySelector("#tpl_enemy");
    let clonedEnemy = templateEnemy.content.cloneNode(true);
    // targetting screen container element to create new divs enemies
    let screenElement = document.querySelector(".screen_container");
    let newEnemyElement = document.createElement("div");
    // adding classes on new enemies
    newEnemyElement.classList.add("enemy");
    newEnemyElement.classList.add("enemy_" + enemy.nbr);
    enemy.allEnemiesTab.push(newEnemyElement); // getting new enemy element into enimesTab
    enemy.randEnemyPos(newEnemyElement);
    // create enemy in dom at last position
    screenElement.prepend(newEnemyElement);
    // setting new enemy position :
    newEnemyElement.prepend(clonedEnemy);
    // modifying enemies elements color :
    enemy.enemyColor(newEnemyElement);
    // increment the current enemy number
    enemy.nbr++;
  },
  randEnemyPos: function(newEnemyElement) {
    // getting starting enemy position into his own tab's index
    let randPos = enemy.randomNbr1to4();
    if (randPos === 1) {
      enemy.movePositionXtab["enemy_" + enemy.nbr] = 0;
      enemy.movePositionYtab["enemy_" + enemy.nbr] = 0;
    } else if (randPos === 2) {
      enemy.movePositionXtab["enemy_" + enemy.nbr] = (elements.movementValueX * 9);
      enemy.movePositionYtab["enemy_" + enemy.nbr] = 0;
    } else if (randPos === 3) {
      enemy.movePositionXtab["enemy_" + enemy.nbr] = (elements.movementValueX * 9);
      enemy.movePositionYtab["enemy_" + enemy.nbr] = (elements.movementValueY * 9);
    } else if (randPos === 4) {
      enemy.movePositionXtab["enemy_" + enemy.nbr] = 0;
      enemy.movePositionYtab["enemy_" + enemy.nbr] = (elements.movementValueY * 9);
    }
    newEnemyElement.style.left = enemy.movePositionXtab["enemy_" + enemy.nbr] + "px";
    newEnemyElement.style.top = enemy.movePositionYtab["enemy_" + enemy.nbr] + "px";
  },
  enemyColor: function(newEnemyElement) {
    console.log(newEnemyElement);
    let enemyFaceElement = newEnemyElement.querySelector(".enemy_face");
    if (enemy.enemyColorValueR > 254 && enemy.enemyColorValueG >= 0) {
      enemy.enemyColorValueG -= 15;
      enemy.enemyColorValueB += 15;
    } else if (enemy.enemyColorValueG > 254 && enemy.enemyColorValueB >= 0) {
      enemy.enemyColorValueR += 15;
      enemy.enemyColorValueB -= 15;
    } else if (enemy.enemyColorValueB > 254 && enemy.enemyColorValueR >= 0) {
      enemy.enemyColorValueG += 15;
      if (enemy.enemyColorValueR !== 0) {
        enemy.enemyColorValueR -= 15;
      }
    } else {
      enemy.enemyColorValueB += 15;
    }
    // modifying enemies elements color :
    enemyFaceElement.style.backgroundColor = "rgb(" + (0 + enemy.enemyColorValueR) + ", " + (0 + enemy.enemyColorValueG) + ", " + (0 + enemy.enemyColorValueB) + ")";
  },
  randomNbr1to4: function () {
    return parseInt(Math.random() * (4 - 1 + 1) + 1);
  },
  enemyMovement: function () {
      sounds.a1fonda();
      for (let currentIndex = 0; currentIndex < enemy.allEnemiesTab.length; currentIndex++) {
      if (enemy.allEnemiesTab[currentIndex] === 0) {} else {
        let currentEnemy = enemy.allEnemiesTab[currentIndex];
        let enemyIndex = currentIndex + 1;
        let randMovement = enemy.randomNbr1to4();
        // MOVING RIGHT -----------------------------------
        if (randMovement == 1) {
          if (enemy.movePositionXtab["enemy_" + enemyIndex] >= (elements.screenMaxWidth - elements.objectMaxWidth - 1)) {} else {
            enemy.movePositionXtab["enemy_" + enemyIndex] += elements.movementValueX;
            currentEnemy.style.left = enemy.movePositionXtab["enemy_" + enemyIndex] + "px";
          }
          // MOVING LEFT ----------------------------------
        } else if (randMovement == 2) {
          if (enemy.movePositionXtab["enemy_" + enemyIndex] < 1) {} else {
            enemy.movePositionXtab["enemy_" + enemyIndex] += -elements.movementValueX;
            currentEnemy.style.left = enemy.movePositionXtab["enemy_" + enemyIndex] + "px";
          }
          // MOVING BOTTOM --------------------------------
        } else if (randMovement == 3) {
          if (enemy.movePositionYtab["enemy_" + enemyIndex] >= (elements.screenMaxHeight - enemy.objectMaxHeight - 1)) {} else {
            enemy.movePositionYtab["enemy_" + enemyIndex] += elements.movementValueY;
            currentEnemy.style.top = enemy.movePositionYtab["enemy_" + enemyIndex] + "px";
          }
          // MOVING TOP -----------------------------------
        } else if (randMovement == 4) {
          if (enemy.movePositionYtab["enemy_" + enemyIndex] < 1) {} else {
            enemy.movePositionYtab["enemy_" + enemyIndex] += -elements.movementValueY;
            currentEnemy.style.top = enemy.movePositionYtab["enemy_" + enemyIndex] + "px";
          }
        }
        enemy.enemyVisage(enemy.allEnemiesTab[currentIndex]);
      }
    }
    if ((enemy.allEnemiesTab.length) < (enemy.maxEnemiesNbr + enemy.previousEnemiesNbr)) {
      setTimeout("enemy.createEnemy()", 500);
    }
    setTimeout("enemy.enemyMovement()", enemy.maxEnemieSpeed);
    setTimeout("collision.detectCollision()", 900);
  },
  removeEnemy: function (currentClassIndex) {
    sounds.dying();
    let enemyIndex = currentClassIndex - 1;
    enemy.allEnemiesTab[enemyIndex] = 0;
    let containerElement = document.querySelector(".screen_container");
    let currentEnemy = document.querySelector(".enemy_" + currentClassIndex);
    containerElement.removeChild(currentEnemy);
    click.checkEndGame();
  },
  enemyVisage: function (currentEnemy) {
    let enemyMoutchElement = currentEnemy.querySelector(".enemy_mouth");
    let enemyEyeLElement = currentEnemy.querySelector(".enemy_eyeL");
    let enemyEyeRElement = currentEnemy.querySelector(".enemy_eyeR");
    if (enemyMoutchElement.classList.contains("enemy_mouth_O")) {
      enemyMoutchElement.classList.remove("enemy_mouth_O");
      enemyEyeLElement.classList.remove("enemy_eyeLm");
      enemyEyeRElement.classList.remove("enemy_eyeRm");
    } else {
      enemyMoutchElement.classList.add("enemy_mouth_O");
      enemyEyeLElement.classList.add("enemy_eyeLm");
      enemyEyeRElement.classList.add("enemy_eyeRm");
    }
  }
}