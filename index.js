

window.goToWolrd = (world)=> {
    localStorage.setItem("current-world",world);
    window.location.href = "/DVE-Examples/worlds.html";
}