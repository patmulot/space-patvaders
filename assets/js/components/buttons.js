let buttons = {
  // object size :
  objectMaxWidth: 5,
  objectMaxHeight: 5,
  // obect position start :
  movePositionX: 0,
  movePositionY: 0,
  rotationValue: 0,
  initButtons: function () {
    // MOVING BUTTONS :
    let rightBtnElement = document.querySelector(".btn_move-right");
    rightBtnElement.addEventListener("click", buttons.handleClickArrow);
    let leftBtnElement = document.querySelector(".btn_move-left");
    leftBtnElement.addEventListener("click", buttons.handleClickArrow);
    let upBtnElement = document.querySelector(".btn_move-up");
    upBtnElement.addEventListener("click", buttons.handleClickArrow);
    let downBtnElement = document.querySelector(".btn_move-down");
    downBtnElement.addEventListener("click", buttons.handleClickArrow);
    // A/B BUTTONS :
    let bBtnElement = document.querySelector(".B_btn");
    bBtnElement.addEventListener("click", buttons.handleBtnB);
    let aBtnElement = document.querySelector(".A_btn");
    aBtnElement.addEventListener("click", buttons.handleBtnA);
  },
  handleClickArrow: function (evt) {
    let rightBtnElement = document.querySelector(".btn_move-right");
    rightBtnElement.blur();
    let objElement = document.querySelector(".object");
    if (evt.currentTarget.classList.contains("btn_move-right")) {
      // MOVING RIGHT -----------------------------------
      if (player.movePositionX >= (elements.screenMaxWidth - elements.objectMaxWidth - 1)) {} else {
        player.movePositionX += elements.movementValueX;
        objElement.style.left = player.movePositionX + "px";
        let rightBtnElement = document.querySelector(".btn_move-right");
        rightBtnElement.blur();
      }
    } else if (evt.currentTarget.classList.contains("btn_move-left")) {
      // MOVING LEFT ----------------------------------
      if (player.movePositionX < 1) {} else {
        player.movePositionX -= elements.movementValueX;
        objElement.style.left = player.movePositionX + "px";
        let leftBtnElement = document.querySelector(".btn_move-left");
        leftBtnElement.blur();
      }
    } else if (evt.currentTarget.classList.contains("btn_move-down")) {
      // MOVING BOTTOM --------------------------------
      if (player.movePositionY >= (elements.screenMaxHeight - elements.objectMaxWidth - 1)) {} else {
        player.movePositionY += elements.movementValueY;
        objElement.style.top = player.movePositionY + "px";
        let downBtnElement = document.querySelector(".btn_move-down");
        downBtnElement.blur();
      }
    } else if (evt.currentTarget.classList.contains("btn_move-up")) {
      // MOVING TOP -----------------------------------
      if (player.movePositionY < 1) {} else {
        player.movePositionY -= elements.movementValueY;
        objElement.style.top = player.movePositionY + "px";
        let upBtnElement = document.querySelector(".btn_move-up");
        upBtnElement.blur();
      }
    };
    collision.detectCollision();
  },
  handleBtnB: function (evt) {
    let bBtnElement = document.querySelector(".B_btn");
    bBtnElement.blur();
    // thrown counter init
    click.thrownCounter++;
    let thrownElement = document.querySelector(".thrown");
    thrownElement.textContent = click.thrownCounter;
    click.createWeapon();
    // getting weapon's and object's height and width to adjust position on click
    let weaponElement = document.querySelector(".weapon_new");
    // init the weapon position
    let weaponPosX = document.querySelector(".weapon_new").offsetLeft;
    let weaponPosY = document.querySelector(".weapon_new").offsetTop;
    // let playerElement = document.querySelector(".object");
    let playerPosX = player.movePositionX;
    let playerPosY = player.movePositionY;
    let objectAdjustPosX = (document.querySelector(".object").offsetWidth) / 2;
    let objectAdjustPosY = (document.querySelector(".object").offsetHeight) / 2;
    let weaponAdjustPosX = (document.querySelector(".weapon_new").offsetWidth) / 2;
    let weaponAdjustPosY = (document.querySelector(".weapon_new").offsetHeight) / 2;
    let maxScreenWidth = (elements.screenMaxWidth / 2);
    let maxScreenHeight = (elements.screenMaxHeight / 2);
    let coefX = 1;
    let coefY = 1;
    let lengthTargetX = -objectAdjustPosX;
    let lengthTargetY = -objectAdjustPosY;
    if (buttons.rotationValue >= 0 && buttons.rotationValue < 90) {
      coefX = (buttons.rotationValue / 90);
      coefY = 1 - (buttons.rotationValue / 90);
      lengthTargetX = (playerPosX + objectAdjustPosX - weaponAdjustPosX) * coefX;
      lengthTargetY = (playerPosY + objectAdjustPosY - weaponAdjustPosY) * coefY;
    } else if (buttons.rotationValue >= 90 && buttons.rotationValue < 180) {
      coefX = 1 + ((buttons.rotationValue - 90) / 90);
      coefY = ((buttons.rotationValue - 90) / 90);
      lengthTargetX = (playerPosX + objectAdjustPosX - weaponAdjustPosX) * coefX;
      lengthTargetY = (playerPosY + objectAdjustPosY - weaponAdjustPosY) * coefY;
    } else if (buttons.rotationValue >= 180 && buttons.rotationValue < 270) {
      coefX = 2 - ((buttons.rotationValue - 180) / 90);
      coefY = ((buttons.rotationValue - 90) / 90);
      lengthTargetX = (maxScreenWidth - weaponAdjustPosX) * coefX;
      lengthTargetY = (playerPosY + objectAdjustPosY - weaponAdjustPosY) * coefY;
    } else if (buttons.rotationValue >= 270 && buttons.rotationValue <= 360) {
      coefX = 1 - ((buttons.rotationValue - 270) / 90);
      coefY = 2 - ((buttons.rotationValue - 270) / 90);
      lengthTargetX = (playerPosX + objectAdjustPosX - weaponAdjustPosX) * coefX;
      lengthTargetY = (maxScreenHeight - weaponAdjustPosY) * coefY;
    }
    weaponElement.style.left = lengthTargetX + "px";
    weaponElement.style.top = lengthTargetY + "px";
    collision.shotEnd();
  },
  handleBtnA: function (evt) {
    let bAtnElement = document.querySelector(".A_btn");
    bAtnElement.blur();
    let playerElement = document.querySelector(".player");
    buttons.rotationValue += 89;
    playerElement.style.transform = "rotate(" + buttons.rotationValue + "deg)";
    buttons.rotationValue++;
    if (buttons.rotationValue >= 360) {
      buttons.rotationValue = 0;
    }
  },
}