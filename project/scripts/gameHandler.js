
/* import Reveal from '../node_modules/reveal.js';
import Markdown from '../node_modules/reveal.js/plugin/markdown/markdown.esm.js';

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize(); */

// configuration
let alarmSound = new Audio('../ressources/audios/alarm.wav');

let jumpscares = [
    '../ressources/characters/balloraJumpscare.gif',
    '../ressources/characters/funtimeFreddyJumpscare.gif',
    '../ressources/characters/funtimeFoxyJumpscare.gif'
]

// main
let GAME = {
    'running': false,
    'alarmActive': false
}
function introduction() {
    indexBody.innerHTML = `
    <div class="reveal">
			<div class="slides">
				<section>Slide 1</section>
				<section>Slide 2</section>
			</div>
		</div>
    <script src="../reveal.js/dist/reveal.js"></script>
    <script src="../reveal.js/plugin/notes/notes.js"></script>
    <script src="../reveal.js/plugin/markdown/markdown.js"></script>
    <script src="../reveal.js/plugin/highlight/highlight.js"></script>
    <script src="../reveal.js/dist/reveal.js"></script>
    <script>
        // More info about initialization & config:
        // - https://revealjs.com/initialization/
        // - https://revealjs.com/config/
        Reveal.initialize({
            hash: true,

            // Learn about plugins: https://revealjs.com/plugins/
            plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
        });
        let deck1 = new Reveal(document.querySelector('.deck1'), {
            embedded: true,
            keyboardCondition: 'focused', // only react to keys when focused
        });
        deck1.initialize();

    </script>
    `;
}

function loadLevel() {
    menuMusic.pause();
    indexBody.style.backgroundImage = 'none'
    indexBody.innerHTML =
        `
    <div id="clickBox">
        <h1>Night ${PLAYER.level}</h1>
    </div>
    
    `
    setTimeout(function () {
        indexBody.innerHTML =
            `
    <div id="mapContainer">
    <div class="mouseTrigger" id="leftTrigger" onmouseover="moveLeft()">.</div>
    <div class="mouseTrigger" id="rightTrigger" onmouseover="moveRight()">.</div>
    <img src="../ressources/levelRessources/elevator.gif" id="elevator" class="mapBg">
    <img src="../ressources/images/mousecontrol.png" class="controlIcon">
    <div>
    <div id="redAlarm"></div>
    <div id="jumpscareBox"></div>
    `
    }, 3000)

}

//mechanics
function moveLeft() {
    let elevator = document.getElementById('elevator')
    elevator.style.animation = 'none'
    if (elevator.style.right == '10em') {
        elevator.style.animation = 'slideFromRightToCenter 0.5s 0s linear, slideLeft 0.6s 0.51s linear'
    } else {
        elevator.style.animation = 'slideLeft 0.5s 0s linear'
    }
    elevator.style.right = '-5vw'
}

function moveRight() {
    let elevator = document.getElementById('elevator')
    elevator.style.animation = 'none'
    if (elevator.style.right == '-5vw') {
        elevator.style.animation = 'slideFromLeftToCenter 0.5s 0s linear, slideRight 0.6s 0.51s linear'
    } else {
        elevator.style.animation = 'slideRight 0.5s 0s linear'
    }
    elevator.style.right = '10em'
}

function win() {
    indexBody.innerHTML = ''
    setTimeout(function () {
        indexBody.innerHTML =
            `
            <img id="winScreen" src="../ressources/images/winScreen.gif" alt="You won!">
            `
            document.getElementById('winScreen').style.animation = 'fadeOut 1s 8s ease-in-out'
    }, 1000)
    if (PLAYER.level < 5) {
        PLAYER.level++;
        setTimeout(function() {
            loadLevel();
        }, 10000)
        
    } else {
        PLAYER.level = 1
        PLAYER.stars++;
        setTimeout(function() {
            loadHomePage();
        }, 10000)
    }
    
}

function jumpscare(anim) {
    let jumpscareBox = document.getElementById('jumpscareBox');
    jumpscareBox.innerHTML = `<img id="jsImg" src="${jumpscares[anim]}" alt="jumpscare">`;
    jumpscareBox.style.zIndex = 9;
    setTimeout(function () {
        jumpscareBox.innerHTML = ``;
        jumpscareBox.style.zIndex = -1;
        indexBody.innerHTML = '<div onclick="loadHomePage()" id="gameOverScreen"><img src="../ressources/levelRessources/distortion.gif" alt="Game Over"><h1 id="gameOverText">GAME OVER<br><span id="subText">Click anywhere to continue</span></h1></div>'
    }, 1000)
}

async function toggleAlarm() {
    // Activates/Deactivates the alarm in the room. Used for specific attacks.
    let redAlarmBox = document.getElementById('redAlarm')
    if (GAME.alarmActive) {
        alarmSound.loop = true;
        alarmSound.play()
        while (GAME.alarmActive) {
            redAlarmBox.style.opacity = 0.5;
            redAlarmBox.style.zIndex = 7;
            await timer(1000);
            redAlarmBox.style.opacity = 0;
            redAlarmBox.style.zIndex = -1;
            await timer(1000);
        }
    } else {
        alarmSound.pause()
        GAME.alarmActive = false;
    }

}

// timer code snippet from StackOverflow. Link: https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
function timer(ms) { return new Promise(res => setTimeout(res, ms)); }