let enemyHealth = 100;
let playerHealth = 100;

function log(message) {
  document.getElementById("log").innerHTML += "<p>" + message + "</p>";
}

function updateScreen(){
    document.getElementById("enemy-hp").textContent = enemyHealth;
    document.getElementById("player-hp").textContent = playerHealth;
}

function endBattle(message) { //this ends the battle after one character has won or lost.
    log(message);
    document.getElementById("attack-btn").disabled = true;
}

function attack() {
    enemyHealth = enemyHealth - 25; //this subtracts 25 from the enemy's health bar after using the attack button. 
    log("You fought the ???.");
    if (enemyHealth <= 0){
        enemyHealth = 0;
        updateScreen();
        endBattle("??? ran away, never to be seen again...")
        return;
    }
    // both the enemy and player's hit points
    playerHealth = playerHealth - 15;
    log("!!!");
    if (playerHealth <= 0){
        playerHealth = 0;
        updateScreen();
        endBattle("Keep trying, all HOPE isn't lost yet!")
        return;
    }
    updateScreen();
}

document.getElementById("attack-btn").addEventListener("click", attack); //button is cliked and subtracts health from characters

document.getElementById("start-btn").addEventListener("click", function () {
  showScreen("world");
});
document.getElementById("test-battle-btn").addEventListener("click", function () {
  showScreen("battle");
});