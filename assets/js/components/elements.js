let elements = {
  // screen size :
  screenMaxWidth: 0,
  screenMaxHeight: 0,
  // objectMaxWidth size :
  objectMaxWidth: 0,
  objectMaxHeight: 0,
  // movement value :
  movementValueX: 0,
  movementValueY: 0,
  lives : 3,
  initElements: function () {
    console.log("initElements loaded"); //!)
    // initialize screen element :
    elements.screenMaxWidth = document.querySelector(".screen_container").offsetWidth;
    elements.screenMaxHeight = document.querySelector(".screen_container").offsetHeight;
    // initialize object element :
    elements.objectMaxWidth = document.querySelector(".object").offsetWidth;
    elements.objectMaxHeight = document.querySelector(".object").offsetHeight;
    // initialize screen element :
    elements.movementValueX = elements.screenMaxWidth / 10;
    elements.movementValueY = elements.screenMaxHeight / 10;
    console.log(elements.movementValueX);
    console.log(elements.screenMaxWidth);
    console.log("------------------");
  },
}