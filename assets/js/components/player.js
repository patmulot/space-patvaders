let player = {
    movePositionX: 0,
    movePositionY: 0,
    lives: 3,
    initPlayer: function() {
        let waveElement = document.querySelector(".wave");
        waveElement.textContent = enemy.waveNbr;
        let livesElement = document.querySelector(".lives");
        livesElement.textContent = player.lives;
        // initialize player position at middle of screen :
        player.movePositionX = 0 + (elements.movementValueX * 5);
        player.movePositionY = 0 + (elements.movementValueY * 5);
        // player strating position :
        let objElement = document.querySelector(".object");
        objElement.style.left = player.movePositionX + "px";
        objElement.style.top = player.movePositionY + "px";
        addEventListener("keydown", player.handleKeysOnObject);
    },
    // handleKeysOnObject: function (evt) {
    //   let objElement = document.querySelector(".object");
    //   if (evt.key == "d") {
    //     // player RIGHT -----------------------------------
    //     player.movePositionX += elements.movementValueX;
    //     let posX = player.movePositionX;
    //     shifting.stepRight(objElement, posX, elements.objectMaxWidth);
    //   } else if (evt.key == "q") {
    //     // player LEFT ----------------------------------
    //     player.movePositionX -= elements.movementValueX;
    //     let posX = player.movePositionX;
    //     shifting.stepLeft(objElement, posX);
    //   } else if (evt.key == "s") {
    //     // player BOTTOM --------------------------------
    //     player.movePositionY += elements.movementValueY;
    //     let posY = player.movePositionY;
    //     shifting.stepDown(objElement, posY, elements.objectMaxHeight);
    //   } else if (evt.key == "z") {
    //     // player TOP -----------------------------------
    //     player.movePositionY -= elements.movementValueY;
    //     let posY = player.movePositionY;
    //     shifting.stepUp(objElement, posY);
    //   }
    //   collision.detectCollision();
    // },
    handleKeysOnObject: function(evt) {
        // sounds.d2quarte();
        // Math.round(ton_chiffre*100)/100; //!
        let objElement = document.querySelector(".object");
        // player RIGHT -----------------------------------
        if (evt.key == "d") {
            if (player.movePositionX >= (elements.screenMaxWidth - elements.objectMaxWidth - 1)) {} else {
                player.movePositionX += elements.movementValueX;
                objElement.style.left = player.movePositionX + "px";
            }
            // player LEFT ----------------------------------
        } else if (evt.key == "q") {
            if (player.movePositionX < 1) {} else {
                player.movePositionX -= elements.movementValueX;
                objElement.style.left = Math.ceil(player.movePositionX) + "px";
            }
            // player BOTTOM --------------------------------
        } else if (evt.key == "s") {
            if (player.movePositionY >= (elements.screenMaxHeight - elements.objectMaxWidth - 1)) {} else {
                player.movePositionY += elements.movementValueY;
                objElement.style.top = player.movePositionY + "px";
            }
            // player TOP -----------------------------------
        } else if (evt.key == "z") {
            if (player.movePositionY < 1) {} else {
                player.movePositionY -= elements.movementValueY;
                objElement.style.top = player.movePositionY + "px";
            }
        }
        collision.detectCollision();
    },
    loseLife: function() {
        // sounds.octave();
        player.lives -= 1;
        let livesElement = document.querySelector(".lives");
        livesElement.textContent = player.lives;
        setTimeout("player.checkLosed()", 300);
    },
    checkLosed: function() {
        if (player.lives === 0) {
            alert("Partie terminée, vous avez perdu !");
            enemy.maxEnemiesNbr = 0;
            enemy.allEnemiesTab.splice(0, enemy.allEnemiesTab.length);
            let allEnemies = document.querySelectorAll(".enemy");
            for (let enemy of allEnemies) {
                let containerElement = document.querySelector(".screen_container");
                containerElement.removeChild(enemy);
            }
            window.location.reload();
        }
    },
}