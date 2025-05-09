let indexBody = document.getElementById('startBody');

let menuMusic = new Audio('../ressources/audios/menu_music.ogg')



// on Page open
console.log(`GAME | Welcome to the console! You can use "commands" (functions) to modify your gameplay. Here is a list of usable functions:
  - toggleLifeStatus() -- Changes player status to alive or dead
  - changeLevel(LEVEL) -- Changes level to given number between 1 and 5
  - changeStars(STARS) -- Changes amount of stars to given number starting from 1
  - clearPlayerData() -- Resets all data including levels (WARNING: This action is irreversible)`)
getUserInput();


// user input for audio
function getUserInput() {
  indexBody.innerHTML = 
  `
  
  <div id="clickBox" onclick="startSequence()">
    <h1>UNDERGROUND - THE AWAKENING<br><span id="clickText">Click anywhere to proceed<span></h1>
  </div>
  `
}

// Intro

function startSequence() {
    indexBody.innerHTML = 
    `
    <div id="introTextBox">
    <h1>WARNING</h1>
    <h2>This game contains flashing lights, loud noises and jumpscares. Proceed with caution.</h2>
    <h2>It is recommended to use headphones and fullscreen (F11) for the best experience.</h2>
    <div id="fullscreenButton" onclick="openFullscreen()">Click to enter Fullscreen mode</div>
    </div>
    `
    let introTextBox = document.getElementById('introTextBox');
    setTimeout(function() {
        introTextBox.style.animation = 'none';
        introTextBox.style.animation = 'fadeIn 0.5s 0s ease-in-out';
        introTextBox.style.opacity = 1;
    }, 500)
    setTimeout(function() {
        introTextBox.style.animation = 'none';
        introTextBox.style.animation = 'fadeOut 0.5s 0s ease-in-out';
        introTextBox.style.opacity = 0;
    }, 7000)
    setTimeout(function() {
        indexBody.innerHTML = 
        `
        <img id="openingCsBanner" src="../ressources/images/openingCutscene.jpg" alt="opening">
        <div id="skipBox">
        <h2>Press <div id="skipIcon">E</div> to skip</h2>
        </div>
        `
        let openingCsBanner = document.getElementById('openingCsBanner')
        openingCsBanner.style.animation = 'fadeIn 3s 1s ease-in-out,moveDown 30s 4s ease-in-out '
        setTimeout(function() {
          openingCsBanner.style.opacity = 1
        }, 2999);

        var emptyPageTO = setTimeout(function() {
                            indexBody.innerHTML = ''
                          }, 33000)

        var loadHomePageTO = setTimeout(function() {
                              loadHomePage();
                            }, 34000)
        
        let skipBox = document.getElementById('skipBox');
        skipBox.style.animation = 'none';
        skipBox.style.animation = 'fadeIn 0.5s 0s ease-in-out';
        skipBox.style.opacity = 1;
        document.addEventListener('keyup', function(event) {
          if (event.key == 'e') {
            skipBox.style.opacity = 0;
           loadHomePage();
           clearTimeout(emptyPageTO);
           clearTimeout(loadHomePageTO);
            return;
          }
        }, {once: true})
    }, 8000)
}

// Brings user to main menu
function loadHomePage() {
  menuMusic.play();
  menuMusic.loop = true;
  indexBody.style.backgroundImage = 'url("../ressources/images/startgif.gif")'
  indexBody.style.backgroundRepeat = 'no-repeat'
  indexBody.style.backgroundSize = '75%'
  indexBody.innerHTML = 
  `
  <img src="../ressources/images/distortion.gif" alt="distortion" id="distortionOverlay">
  
  <div id="title">
  <img width="450px" src="../ressources/images/title.png" alt="underground">
  <div id="buttonContainer">
    <div class="homeButtons" id="newGameButton" onclick="loadLevel()">New Game</div>
    <div class="homeButtons" id="continueButton">Continue</div>
    <div onclick="toggleSettings()" class="homeButtons" id="settingsButton">Settings</div>
  </div>
  <div id="settingsContainer"></div>
  </div>
  `
  if (PLAYER.level == 1) {
    document.getElementById('continueButton').style.opacity = 0.5;
  }
}

// open/close settings
function toggleSettings() {
  let settingsContainer = document.getElementById('settingsContainer')
  if (settingsContainer.innerHTML == '') {
    settingsContainer.style.display = 'block'
    settingsContainer.innerHTML = 
    `
    <h1>SETTINGS</h1>
      <div id="settingsFlexContainer">
        <div class="settingsRows">
        <h2>Music</h2>
        <input type="range" min="0" max="100" value="50" class="sliders" id="musicSlider">
        </div>
        <div class="settingsRows">
        <h2>Sounds</h2>
        <input type="range" min="1" max="100" value="50" class="sliders" id="soundsSlider">
        </div>
        <div class="settingsRows">
        <h2>Screen Size</h2>
        <h2 id="screenSizeSelect" onclick="toggleFullscreen()"></h2>
        </div>
      </div>
    `
    // toggle music volume on slider input
    document.getElementById('musicSlider').addEventListener('input', onMusicSliderInput)
    function onMusicSliderInput() {
      menuMusic.volume = document.getElementById('musicSlider').value / 100;
    }
    if (document.fullscreenElement != null) {
      document.getElementById('screenSizeSelect').innerHTML = '<span class="arrowStyle">〈</span> Fullscreen <span class="arrowStyle">〉</span>'
    } else {
      document.getElementById('screenSizeSelect').innerHTML = '<span class="arrowStyle">〈</span> Window <span class="arrowStyle">〉</span>'
    }
  } else {
    settingsContainer.innerHTML = '';
    settingsContainer.style.display = 'none'
  }
}

function toggleFullscreen() {
  if (document.fullscreenElement == null) {
    openFullscreen();
    document.getElementById('screenSizeSelect').innerHTML = '<span class="arrowStyle">〈</span> Fullscreen <span class="arrowStyle">〉</span>';
  } else {
    closeFullscreen();
    document.getElementById('screenSizeSelect').innerHTML = '<span class="arrowStyle">〈</span> Window <span class="arrowStyle">〉</span>';
  }
}



// ------------------------------------------------------------------------------------------------------
// FULLSCREEN CODE SNIPPET FROM W2SCHOOLS | Link: https://www.w3schools.com/howto/howto_js_fullscreen.asp
// ------------------------------------------------------------------------------------------------------

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}