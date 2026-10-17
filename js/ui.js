
// section for cycling through screens...
function showScreen(name) {
  const screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen) {
    screen.classList.remove("active");
  });
  document.getElementById(name + "-screen").classList.add("active"); 
}