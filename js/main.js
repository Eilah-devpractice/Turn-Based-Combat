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
function resetBattle() {
  enemyHealth = 100;
  playerHealth = 100;
  document.getElementById("log").innerHTML = "";
  document.getElementById("attack-btn").disabled = false;
  updateScreen();
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
const playerSize = 128;

function move(direction) {
  const worldScreen = document.getElementById("world-screen");
  if (!worldScreen.classList.contains("active")) {
    return;
  }

  const player = document.getElementById("player");

  if (direction === "left") {
    playerX = playerX - speed;
    player.style.transform = "scaleX(1)";
  }
  if (direction === "right") {
    playerX = playerX + speed;
    player.style.transform = "scaleX(-1)";
  }
  if (direction === "up") {
    playerY = playerY - speed;
  }
  if (direction === "down") {
    playerY = playerY + speed;
  }

  playerX = Math.max(0, Math.min(playerX, 1500 - playerSize)); // player shouldnt move away from the box
  playerY = Math.max(0, Math.min(playerY, 500 - playerSize));

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}
// player on laptop/desktop can move with both the arrow keys & the wasd keys.
function handleKey(event) {
  const key = event.key.toLowerCase();

  if (key === "a" || key === "arrowleft") {
    move("left");
  }
  if (key === "d" || key === "arrowright") {
    move("right");
  }
  if (key === "w" || key === "arrowup") {
    move("up");
  }
  if (key === "s" || key === "arrowdown") {
    move("down");
  }
}

document.addEventListener("keydown", handleKey);

//function for buttons when clicked by user
document.querySelectorAll("#dpad button").forEach(function (button) {
  button.addEventListener("click", function () {
    move(button.dataset.direction);
  });
});