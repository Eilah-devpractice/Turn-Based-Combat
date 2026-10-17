let enemyHealth = 100;
let playerHealth = 100;

function log(message) {
  document.getElementById("log").innerHTML += "<p>" + message + "</p>";
}

function updateScreen(){
    document.getElementById("enemy-hp").textContent = enemyHealth;
    document.getElementById("player-hp").textContent = playerHealth;
}

function attack() {
    enemyHealth = enemyHealth - 5; //this subtracts 5 from the enemy's health bar after using the attack button. 
    log("You fought the enemy.")
    // both the enemy and player's hit points
    playerHealth = playerHealth - 3;
    log("Yeowch!")
    updateScreen();
}

document.getElementById("attack-btn").addEventListener("click", attack);