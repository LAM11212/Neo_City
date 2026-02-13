const bat = document.getElementById("lilBat");
const jumpscare = document.getElementById("jumpscare");
let batClicked = false;
const jumpscare_audio = new Audio('Old Foxy Jump Scare.mp3');

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