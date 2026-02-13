const bat = document.getElementById("lilBat");
const jumpscare = document.getElementById("jumpscare");
let batClicked = false;
const jumpscare_audio = new Audio('Old Foxy Jump Scare.mp3');
const midSection = document.querySelector('main');
const logo = document.querySelector('.logo');
const FPS = 60;
midSection.style.height = window.innerHeight + "px";
midSection.style.width = window.innerWidth + "px";

// logo moving velocity
let xPos = 10;
let yPos = 10;
let xVel = 2;
let yVel = 2;

function update() {
    logo.style.left = xPos + "px";
    logo.style.top = yPos + "px";
}

setInterval(() => {
    if(xPos + logo.clientWidth >= midSection.clientWidth || xPos <= 0) {
        xVel = -xVel;
        logo.style.fill = newColor();
    }
    if(yPos + logo.clientHeight >= midSection.clientHeight || yPos <= 0) {
        yVel = -yVel;
        logo.style.fill = newColor();
    }

    xPos += xVel;
    yPos += yVel;
    update();
}, 1000 / FPS);

function newColor() {
    let red = Math.floor(Math.random() * 256) + 1;
    let green = Math.floor(Math.random() * 256) + 1;
    let blue = Math.floor(Math.random() * 256) + 1;

    let finalColor = "rgb(" +red.toString() + ", " + green.toString() + ", " + blue.toString() + ")";
    console.log(finalColor);
    return finalColor;
}

bat.addEventListener('click', function() {
    if(batClicked) return;
    batClicked = true;
    jumpscare.style.display = 'block';
    jumpscare_audio.play();

    setTimeout(function() {
        jumpscare.style.display = 'none';
        batClicked = false;
    }, 600);
});