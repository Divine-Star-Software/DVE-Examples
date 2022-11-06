const loadWorld = (world) => {
  const script = document.createElement("script");
  script.type = "module";
  script.src = `./js/${world}/index.js`;
  script.defer = true;
  document.body.append(script);
  localStorage.setItem("current-world", world);
};

const world = localStorage.getItem("current-world");
if (world) {
  loadWorld(world);
}

const guiButtons = document.getElementById("gui-buttons");
const homeButton = document.createElement("button");
homeButton.className = "gui-button";
homeButton.innerText = "Home";
homeButton.addEventListener("click", () => {
  localStorage.removeItem("current-world");
  window.location.href = "/index.html";
});

guiButtons.append(homeButton);
