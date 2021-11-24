let click = {
    weaponWidth: 0,
    weaponHeight: 0,
    thrownCounter: 0,
    landedCounter: 0,
    fireDirection: 0,
    initClick: function() {
        let weaponElement = document.querySelector(".weapon");
        click.weaponWidth = weaponElement.offsetWidth;
        click.weaponHeight = weaponElement.offsetHeight;
        let screenElement = document.querySelector(".screen");
        // let screenElement = document.querySelector(".screen_container");
        screenElement.addEventListener("click", click.handleClickOnScreen);
    },
    handleClickOnScreen: function(evt) {
        // sounds.fire();
        // sounds.fire(sounds.fire);
        // thrown counter init
        click.thrownCounter++;
        let thrownElement = document.querySelector(".thrown");
        thrownElement.textContent = click.thrownCounter;
        click.createWeapon();
        // getting weapon's and object's height and width to adjust position on click
        let objectAdjustPosX = (document.querySelector(".object").offsetWidth) / 2;
        let objectAdjustPosY = (document.querySelector(".object").offsetHeight) / 2;
        let weaponAdjustPosX = (document.querySelector(".weapon_new").offsetWidth) / 2;
        let weaponAdjustPosY = (document.querySelector(".weapon_new").offsetHeight) / 2;
        let weaponElement = document.querySelector(".weapon_new");
        let cursorX = evt.offsetX;
        let cursorY = evt.offsetY;
        if (evt.isTrusted === true) {
            weaponElement.style.left = cursorX - objectAdjustPosX + weaponAdjustPosX + "px";
            weaponElement.style.top = cursorY - objectAdjustPosY + weaponAdjustPosY + "px";
        };
        let playerElement = document.querySelector(".player");
        let objectPosX = document.querySelector(".weapon_new").offsetLeft;
        let objectPosY = document.querySelector(".weapon_new").offsetTop;
        let pi = Math.PI;
        if (cursorY > (objectPosY + objectAdjustPosY - (weaponAdjustPosY * 2))) {
            radianDirection = Math.atan((cursorX - objectPosX - weaponAdjustPosX) / (cursorY - objectPosY - (weaponAdjustPosY * 2)));
            click.fireDirection = 180 - radianDirection * (180 / pi) + 90;
            playerElement.style.transform = "rotate(" + (click.fireDirection) + "deg)";
        } else {
            radianDirection = Math.atan((cursorX - objectPosX - weaponAdjustPosX) / (cursorY - objectPosY - (weaponAdjustPosY * 2)));
            click.fireDirection = -radianDirection * (180 / pi) + 90;
            playerElement.style.transform = "rotate(" + (click.fireDirection) + "deg)";
        }
        collision.shotEnd();
    },
    createWeapon: function() {
        let objectElement = document.querySelector(".screen_container");
        let newWeapon = document.createElement("div");
        newWeapon.classList.add("weapon_new");
        newWeapon.innerHTML = '<i class="ra ra-boomerang"></i>';
        newWeapon.style.left = (player.movePositionX + ((elements.objectMaxWidth / 2) - (click.weaponWidth / 2))) + "px";
        newWeapon.style.top = (player.movePositionY + ((elements.objectMaxHeight / 2) - (click.weaponHeight / 2))) + "px";
        objectElement.appendChild(newWeapon);
    },
    checkEndGame: function() {
        if (click.landedCounter == enemy.maxEnemiesNbr) {
            alert("bravo vous avez détruit les " + click.landedCounter + " enemis ! vague suivante ?");
            setTimeout(function() {
                enemy.previousEnemiesNbr += enemy.maxEnemiesNbr;
                enemy.maxEnemiesNbr += 2;
                enemy.maxEnemieSpeed = enemy.maxEnemieSpeed - 50;
                enemy.waveNbr++;
                let waveElement = document.querySelector(".wave");
                waveElement.textContent = enemy.waveNbr;
                click.landedCounter = 0;
                let landedElement = document.querySelector(".landed");
                landedElement.textContent = click.landedCounter;
                let thrownElement = document.querySelector(".thrown");
                click.thrownCounter = 0;
                thrownElement.textContent = click.thrownCounter;
            })
        }
    },
    removeWeapon: function() {
        let screenElement = document.querySelector(".screen_container");
        let weaponElement = document.querySelector(".weapon_new");
        screenElement.removeChild(weaponElement);
    },
}