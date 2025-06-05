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
let monitorSound = new Audio('../ressources/audios/monitorSound.ogg');
let buzzing = new Audio('../ressources/audios/buzzing.mp3');
let distraction = new Audio('../ressources/audios/metal_crawling.ogg');
let jumpscareAudio = new Audio('../ressources/audios/jumpscareSound.ogg')

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
    PLAYER.level = 1;
    localStorage.setItem('level', 1)
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
    menuMusic.pause();
    buzzing.play();
    buzzing.loop = true;
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
    <div id="cont">
    <h1 id="clock">12:00</h1>
    <img id="cameraClick" src="../ressources/images/cameraHoverButton.png" alt="Hover for Camera" onclick="toggleMonitor()">
    <div id="redAlarm"></div>
    <div id="cont">
    <div id="monitorContainer">
                <div id="monitorDesc">
                    Click on an empty box to play a sound.<br>Blinking box indicates movement.
                    <p id="cooldownText">COOLDOWN</p>
                </div>
                <div class="enemyCP activeCP" id="cp1" onClick="distract('stage1')"></div>
                <div class="enemyCP activeCP" id="cp2" onClick="distract('stage2')"></div>
                <div class="enemyCP activeCP" id="cp3" onClick="distract('stage3')"></div>
                <div class="enemyCP inactiveCP" id="cp15" onClick="distract('corridor1')"></div>
                <div class="enemyCP inactiveCP" id="cp25" onClick="distract('corridor2')"></div>
                <div class="enemyCP inactiveCP" id="cp35" onClick="distract('corridor3')"></div>
                <div class="enemyCP inactiveCP" id="cp4"></div>
            </div>
    </div>
    <div id="jumpscareBox"></div>
    `
        runGame()
    }, 3000)

}
let timeClock = 0;
let gameLoop;
let enemyLoop;
function runGame() {
    enemyLoop = setInterval(function () {
        moveEnemy();
    }, 10000)
    gameLoop = setInterval(function () {
        timeClock++;
        document.getElementById('clock').innerHTML = "0" + timeClock + ":00";
        if (timeClock == 6 && GAME.running) {
            win();
            timeClock = 0;
            clearInterval(enemyLoop)
            clearInterval(gameLoop);
        }
    }, 20000) // how long a round takes
}

let balloraLocation = 'stage1';
let foxyLocation = 'stage2';
let FreddyLocation = 'stage3';

function moveEnemy() {
    let enemy = Math.floor(Math.random() * 3) + 1;
    let clvl = PLAYER.level;
    let chance = Math.random();
    if (clvl == 1) {
        if (chance < 0.4) {
            updateLocation(enemy);
        }
    } else if (clvl == 2 || clvl == 3) {
        if (chance < 0.5) {
            updateLocation(enemy);
        }
    } else {
        if (chance < 0.8) {
            updateLocation(enemy);
        }
    }
}

function updateLocation(enemy) {
            if (enemy == 1) {
                if (balloraLocation == 'mainCorridor') {
                    balloraLocation = 'room';
                    GAME.alarmActive = true;
                    toggleAlarm();
                    setTimeout(function() {
                        if (balloraLocation == 'room') {
                            jumpscare(0)
                        }
                    }, 5000)
                } else if (balloraLocation == 'stage1') {
                    document.getElementById('cp15').classList.add('activeCP')
                    document.getElementById('cp15').classList.remove('inactiveCP')
                    document.getElementById('cp1').classList.add('inactiveCP')
                    document.getElementById('cp1').classList.remove('activeCP')
                    balloraLocation = 'corridor1'
                } else {
                    document.getElementById('cp4').classList.add('activeCP')
                    document.getElementById('cp4').classList.remove('inactiveCP')
                    document.getElementById('cp15').classList.add('inactiveCP')
                    document.getElementById('cp15').classList.remove('activeCP')
                    balloraLocation = 'mainCorridor'
                }
            } else if (enemy == 2) {
                if (foxyLocation == 'mainCorridor') {
                    foxyLocation = 'room';
                    GAME.alarmActive = true;
                    toggleAlarm();
                    setTimeout(function() {
                        if (foxyLocation == 'room') {
                            jumpscare(1)
                        }
                    }, 5000)
                } else if (foxyLocation == 'stage2') {
                    document.getElementById('cp25').classList.add('activeCP')
                    document.getElementById('cp25').classList.remove('inactiveCP')
                    document.getElementById('cp2').classList.add('inactiveCP')
                    document.getElementById('cp2').classList.remove('activeCP')
                    foxyLocation = 'corridor2'
                } else {
                    document.getElementById('cp4').classList.add('activeCP')
                    document.getElementById('cp4').classList.remove('inactiveCP')
                    document.getElementById('cp25').classList.add('inactiveCP')
                    document.getElementById('cp25').classList.remove('activeCP')
                    foxyLocation = 'mainCorridor'
                }
            } else {
                if (FreddyLocation == 'mainCorridor') {
                    FreddyLocation = 'room';
                    GAME.alarmActive = true;
                    toggleAlarm();
                    setTimeout(function() {
                        if (FreddyLocation == 'room') {
                            jumpscare(2)
                        }
                    }, 5000)
                } else if (FreddyLocation == 'stage3') {
                    document.getElementById('cp35').classList.add('activeCP')
                    document.getElementById('cp35').classList.remove('inactiveCP')
                    document.getElementById('cp3').classList.add('inactiveCP')
                    document.getElementById('cp3').classList.remove('activeCP')
                    FreddyLocation = 'corridor3'
                } else {
                    document.getElementById('cp4').classList.add('activeCP')
                    document.getElementById('cp4').classList.remove('inactiveCP')
                    document.getElementById('cp35').classList.add('inactiveCP')
                    document.getElementById('cp35').classList.remove('activeCP')
                    FreddyLocation = 'mainCorridor'
                }
            }
}

function distract(station) {
    if (distraction.paused) {
        distraction.play();
        document.getElementById('cooldownText').style.opacity = '1';
    if (station == 'stage1') {
        if (balloraLocation == 'corridor1') {
            balloraLocation = 'stage1';
            document.getElementById('cp1').classList.add('activeCP')
            document.getElementById('cp1').classList.remove('inactiveCP')
            document.getElementById('cp15').classList.add('inactiveCP')
            document.getElementById('cp15').classList.remove('activeCP')
        }
    } else if (station == 'stage2') {
        if (foxyLocation == 'corridor2') {
            foxyLocation = 'stage2';
            document.getElementById('cp2').classList.add('activeCP')
            document.getElementById('cp2').classList.remove('inactiveCP')
            document.getElementById('cp25').classList.add('inactiveCP')
            document.getElementById('cp25').classList.remove('activeCP')
        }
    } else if (station == 'stage3') {
        if (FreddyLocation == 'corridor3') {
            FreddyLocation = 'stage3';
            document.getElementById('cp3').classList.add('activeCP')
            document.getElementById('cp3').classList.remove('inactiveCP')
            document.getElementById('cp35').classList.add('inactiveCP')
            document.getElementById('cp35').classList.remove('activeCP')
        }
    } else if (station == 'corridor1') {
        if (balloraLocation == 'mainCorridor') {
            balloraLocation = 'corridor1';
            document.getElementById('cp15').classList.add('activeCP')
            document.getElementById('cp15').classList.remove('inactiveCP')
            document.getElementById('cp4').classList.add('inactiveCP')
            document.getElementById('cp4').classList.remove('activeCP')
        }
    } else if (station == 'corridor2') {
        if (foxyLocation == 'mainCorridor') {
            foxyLocation = 'corridor2';
            document.getElementById('cp25').classList.add('activeCP')
            document.getElementById('cp25').classList.remove('inactiveCP')
            document.getElementById('cp4').classList.add('inactiveCP')
            document.getElementById('cp4').classList.remove('activeCP')
        }
    } else if (station == 'corridor3') {
        if (balloraLocation == 'mainCorridor') {
            balloraLocation = 'corridor1';
            document.getElementById('cp35').classList.add('activeCP')
            document.getElementById('cp35').classList.remove('inactiveCP')
            document.getElementById('cp4').classList.add('inactiveCP')
            document.getElementById('cp4').classList.remove('activeCP')
        }
    }
    distraction.onended = function() {onDistractionEnd()};
    }
    
}

function onDistractionEnd() {
    document.getElementById('cooldownText').style.opacity = '0'
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
    buzzing.pause();
    alarmSound.pause();
    indexBody.innerHTML = '';
    setTimeout(function () {
        indexBody.innerHTML =
            `
            <img id="winScreen" src="../ressources/images/winScreen.gif" alt="You won!">
            `
        document.getElementById('winScreen').style.animation = 'fadeOut 1s 8s ease-in-out'
    }, 1000)
    if (PLAYER.level < 5) {
        PLAYER.level++;
        localStorage.setItem('level', PLAYER.level);
        setTimeout(function () {
            loadLevel();
        }, 10000)

    } else {
        PLAYER.level = 1
        localStorage.setItem('level', PLAYER.level);
        PLAYER.stars++;
        localStorage.setItem('stars', PLAYER.stars);
        setTimeout(function () {
            loadHomePage();
        }, 10000)
    }

}

function jumpscare(anim) {
    buzzing.pause();
    alarmSound.pause();
    jumpscareAudio.play();
    GAME.running = false;
    PLAYER.lifeStatus = 'dead';
    let jumpscareBox = document.getElementById('jumpscareBox');
    jumpscareBox.innerHTML = `<img id="jsImg" src="${jumpscares[anim]}" alt="jumpscare">`;
    jumpscareBox.style.zIndex = 9;
    setTimeout(function () {
        jumpscareBox.innerHTML = ``;
        jumpscareBox.style.zIndex = -1;
        indexBody.innerHTML = '<div onclick="loadHomePage()" id="gameOverScreen"><img src="../ressources/levelRessources/distortion.gif" alt="Game Over"><h1 id="gameOverText">GAME OVER<br><span id="subText">Click anywhere to continue</span></h1></div>'
    }, 1000)
}

let monitorOpen = false
function toggleMonitor() {
    monitorSound.play();
    if (monitorOpen) {
        monitorOpen = false;
        document.getElementById('monitorContainer').style.zIndex = '-1';
    } else {
        monitorOpen = true;
        blinkingBoxes();
        document.getElementById('cont').innerHTML += '<img id="monitorGif" src="../ressources/images/monitor.gif" alt="monitor">';
        let gif = document.getElementById('monitorGif');
        gif.style.zIndex = 9;
        setTimeout(function () {
            gif.remove();
            document.getElementById('monitorContainer').style.zIndex = '9';
        }, 700)
    }
}

async function blinkingBoxes() {
    let boxes = document.getElementsByClassName('activeCP')
    while (monitorOpen) {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = 'rgba(255, 255, 255, 0)';
        }
        await timer(1000)
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = 'rgb(255, 255, 255)';
        }
        await timer(1000)
    }
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