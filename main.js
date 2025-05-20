let player = {
    health: 100,
    maxHp: 100
}

let enemy = {
    hp: 100,
    maxHp: 100,
}

const attackButton = document.querySelector("#playerAttack");
const healButton = document.querySelector("#playerHeal");

let playerTurn = true;

attackButton.addEventListener("click", playerAttack);
healButton.addEventListener("click", playerHeal);

function updateUI() {
    document.querySelector("#playerHp").innerText = `Health: ${player.health}/${player.maxHp}`;
    document.querySelector("#enemyHp").innerText = `Health: ${enemy.hp}/${enemy.maxHp}`;
}

function log(message) {
    document.querySelector("#log").innerHTML = "";
    const p = document.createElement("p");
    p.innerText = message;
    let log = document.querySelector("#log").appendChild(p);

    while (log.children.length > 5) {
    log.removeChild(log.firstChild);
    }

}

function playerAttack() {
    if(playerTurn) {
        let damage = Math.floor(Math.random() * 10) + 5;
        enemy.hp = Math.max(0, enemy.hp - damage);
        updateUI();
        log(`You attacked the enemy for ${damage} damage!`);
        playerTurn = false;
        checkGameOver();
        if(enemy.hp > 0) {
            playerTurn = false;
        setTimeout(enemyTurn, 1000);
        }
    }
}

function playerHeal() {
    if(playerTurn) {
        let heal = Math.floor(Math.random() * 10) + 10;
        player.health = Math.min(player.maxHp, player.health + heal);
        updateUI();
        log(`You healed for ${heal} health!`);
        playerTurn = false;
        setTimeout(enemyTurn, 1000);
    }
}

function enemyTurn() {
    if(!playerTurn) {
        let action = Math.random() > 0.3 ? "attack" : "heal";
        if(action === "attack") {
            let damage = Math.floor(Math.random() * 10) + 5;
            player.health = Math.max(0, player.health - damage);
            log(`The enemy attacked you for ${damage} damage!`);
        } else {
            let heal = Math.floor(Math.random() * 10) + 10;
            enemy.hp = Math.min(enemy.maxHp, enemy.hp + heal);
            log(`The enemy healed for ${heal} health!`);
        }
        updateUI();
        checkGameOver();
        if(player.health > 0) {
            playerTurn = true;
        }
    }
}

function checkGameOver() {
    if(player.health <= 0) {
        log("You have been defeated!");
        document.querySelector("#playerAttack").disabled = true;
        document.querySelector("#playerHeal").disabled = true;
    } else if(enemy.hp <= 0) {
        log("You have defeated the enemy!");
        document.querySelector("#playerAttack").disabled = true;
        document.querySelector("#playerHeal").disabled = true;
    }
}
updateUI();