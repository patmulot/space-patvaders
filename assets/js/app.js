// alert("how to play: \n \n press 'Z' to move UP,\n press : 'D' to move RIGHT,\n press : 'D' to move DOWN, \n press : 'Q' to move LEFT, \n click on enmies position on screen to kill'em \n \n or...");
// alert("(mobile version : ) \n use Gameboy's controller : \n \n click/touch the directional cross to move, \n click/touch 'A' button to rotate, \n  click/touch  'B' button to fire");
// alert("------------------------------------------------\n-- Switch ON to start the game --\n------------------------------------------------\n \n Have fun !");
let app = {
  gameboyIsOn: false,
  init: function () {
    // ON OFF SWITCH :
    let onOffSwitchElement = document.querySelector(".switch_slider");
    onOffSwitchElement.addEventListener("click", app.handleSwitchOnOff);
    if (app.gameboyIsOn === true) {
      elements.initElements();
      player.initPlayer();
      // shifting.initShifting();
      buttons.initButtons();
      click.initClick();
      enemy.initEnemy();
      collision.initCollision();
      // sounds.loadFire();
      // app.testSound1();
    }
  },
  handleSwitchOnOff: function (evt) {
    console.log("test");
    let screenElement = document.querySelector("#gb_screen");
    let switchElement = document.querySelector(".switch_slider");
    let ledElement = document.querySelector("#gb_led");
    let playerElement = document.querySelector(".object");
    if (switchElement.classList.contains("switch_on")) {
      switchElement.blur();
      switchElement.classList.replace("switch_on", "switch_off");
      ledElement.style.backgroundColor = "rgb(255, 0, 0)";
      screenElement.style.backgroundColor = "rgb(79, 141, 22)";
      app.gameboyIsOn = true;
      playerElement.style.visibility = "visible";
      app.init();
    } else {
      switchElement.blur();
      switchElement.classList.replace("switch_off", "switch_on");
      ledElement.style.backgroundColor = "rgb(87, 16, 16)";
      screenElement.style.backgroundColor = "rgb(73, 107, 41)";
      playerElement.style.visibility = "hidden";
      app.gameboyIsOn = false;
      location.href = "index.html";
      // location.reaload(false);
    }
  },
};
document.addEventListener("DOMContentLoaded", app.init)