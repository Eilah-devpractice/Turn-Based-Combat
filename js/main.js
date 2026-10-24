// To explain all of the inline comments: I am a bit of a scatterbrain but I know what I'm doing :)

// player and enemy health
let enemyHealth = 100;
let playerHealth = 125;

//battle messages
function log(message) {
  document.getElementById("log").innerHTML += "<p>" + message + "</p>";
}

function updateScreen(){ // screen should update w/ the correct values
    document.getElementById("enemy-hp").textContent = enemyHealth;
    document.getElementById("player-hp").textContent = playerHealth;
}

function endBattle(message) { //this ends the battle after one character has won or lost.
    log(message);
    document.getElementById("attack-btn").disabled = true;
}
function resetBattle() {
  enemyHealth = 100;
  playerHealth = 125; // more hp than enemy
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
        enemyHealth = 0; // makes it so that the enemy's hp shows as 0 (not a negative num)
        updateScreen();
        endBattle("??? ran away, never to be seen again...")
        setTimeout(function () {
          enemyAlive = false;
          document.getElementById("world-enemy").style.display = "none"; // enemy wont show up if defeated
          showScreen("world"); // world shows without enemy in it
        }, 3000);
        return;
    }
//player's hit points
    playerHealth = playerHealth - 20; // enemy will always attack
    log("!!!");
    if (playerHealth <= 0){
        playerHealth = 0;
        updateScreen();
        endBattle("YOU LOST...");
        setTimeout(function () {
          showScreen("death");
        }, 3000); // time it takes in milliseconds to change the screen
        return;
    }
    updateScreen();
}
//buttons for each screen
document.getElementById("attack-btn").addEventListener("click", attack); //button is clicked and subtracts health from characters

document.getElementById("start-btn").addEventListener("click", function () {
  showScreen("world");
});

document.getElementById("test-battle-btn").addEventListener("click", function () {
  showScreen("battle");
});
document.getElementById("retry-btn").addEventListener("click", function () {
  resetBattle();
  playerX = 100;
  playerY = 100;
  placePlayer();
  showScreen("world");
});


//player movement
let playerX = 100;
let playerY = 100;
const speed = 10;
const playerSize = 128;
let enemyAlive = true; // enemy status
// puts the player image at playerX / playerY
function placePlayer() {
  const player = document.getElementById("player");
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

// starts a battle
function startBattle() {
  resetBattle();
  showScreen("battle");
}

// checks if the player overlaps the enemy

// i wanted to add collision detection to start the battle, so that is what's below.
function checkCollision() {
  if (!enemyAlive) {
    return;
  }

  const enemy = document.getElementById("world-enemy");

  const touching =
    playerX < enemy.offsetLeft + enemy.offsetWidth &&
    playerX + playerSize > enemy.offsetLeft &&
    playerY < enemy.offsetTop + enemy.offsetHeight &&
    playerY + playerSize > enemy.offsetTop;

  if (touching) {
    startBattle(); //battle begins once the player is in contact with enemy.
  }
}

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

  placePlayer();
  checkCollision();
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
document.querySelectorAll("#dpad button").forEach(function (button) { // allows character to move
  button.addEventListener("click", function () {
    move(button.dataset.direction); 

  });
});