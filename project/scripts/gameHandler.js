/** 
import Reveal from '../node_modules/reveal.js';
import Markdown from '../node_modules/reveal.js/plugin/markdown/markdown.esm.js';

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize(); 
*/

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
    menuMusic.pause();
    indexBody.innerHTML = ``
    indexBody.style.backgroundImage = 'none'
    setTimeout(function () {
        indexBody.style.backgroundImage = 'url("../ressources/images/slidesBg.png")'
        indexBody.style.backgroundSize = 'cover'
        indexBody.innerHTML = `
        <div class="reveal">
            <div class="slides">
 
                <section>
                    <h2>Welcome to your new job!</h2>
                    <p>We will now lead you through the basics to give you a great start to your awesome career.</p>
                </section>
 
                <section>
                    <h2>Your job at Kidz Entertainment!</h2>
                    <p>Kidz Entertainment is opening it's brand new location and your job is to recover old systems left in the underground facility by the former owner.</p>
                    <p>Use your portable computer to turn on and repair old systems (hover with your mouse over the button at the bottom)</p>
                </section>

                <section>
                    <h2>Safety First</h2>
                    <p>Due to financial issues and saving plans you are only equipped with the available systems in the facility including cameras and a sound system, but what could you possibly need that for?</p>
                    <p id="discl">Kidz Entertainment is not responsible for any damage and issues including, but not limited to, injury or death.</p>
                    <p>Have a great shift!<br>Press E to start</p>
                </section>
            </div>
        </div>
    `;

        if (!window.revealInitialized) {
            Reveal.configure({
                keyboard: {
                    69: loadLevel
                }
            })
            Reveal.initialize();
            
            window.revealInitialized = true;
        } else {
            Reveal.sync(); // Falls du Slides später hinzufügst
        }
        document.getElementsByClassName('reveal')[0].style.animation = 'fadeIn 0.5s 0s ease-in-out'
    }, 1000)

}

function loadLevel() {
    indexBody.style.backgroundImage = 'none'
    GAME.running = true;
    PLAYER.lifeStatus = 'alive';
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
    <h1 id="clock">12:00</h1>
    <div id="redAlarm"></div>
    <div id="jumpscareBox"></div>
    `
    runGame()
    }, 3000)

}
let timeClock = 0;
let gameLoop;
function runGame() {
    gameLoop = setInterval(function() {
        timeClock++;
        document.getElementById('clock').innerHTML = "0" + timeClock + ":00";
        if (timeClock == 6 && GAME.running) {
            win();
            clearInterval(gameLoop);
        }
    }, 2000)
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
        setTimeout(function () {
            loadLevel();
        }, 10000)

    } else {
        PLAYER.level = 1
        PLAYER.stars++;
        setTimeout(function () {
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