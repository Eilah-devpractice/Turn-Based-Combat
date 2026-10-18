// player and enemy health
let enemyHealth = 100;
let playerHealth = 100;

//battle messages
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

//battle functions
function attack() {
    //enemy's hitpoints
    enemyHealth = enemyHealth - 25; //this subtracts 25 from the enemy's health bar after using the attack button. 
    log("You fought the ???.");
    if (enemyHealth <= 0){
        enemyHealth = 0;
        updateScreen();
        endBattle("??? ran away, never to be seen again...")
        return;
    }
//player's hit points
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
//buttons for each screen
document.getElementById("attack-btn").addEventListener("click", attack); //button is cliked and subtracts health from characters

document.getElementById("start-btn").addEventListener("click", function () {
  showScreen("world");
});
document.getElementById("test-battle-btn").addEventListener("click", function () {
  showScreen("battle");
});

//player movement

let playerX = 100;
let playerY = 100;
const speed = 10;

function movePlayer(event) {
  const key = event.key.toLowerCase();
  const worldScreen = document.getElementById("world-screen"); 
  if (!worldScreen.classList.contains("active")) {
    return;
  }

  if (key === "a") {
    playerX = playerX - speed;
  }
  if (key === "d") {
    playerX = playerX + speed;
  }
  if (key === "w") {
    playerY = playerY - speed;
  }
  if (event.key === "s") {
    playerY = playerY + speed;
  }

  const player = document.getElementById("player");
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

document.addEventListener("keydown", movePlayer); // the player moves when the key is pressed.