let indexBody = document.getElementById('startBody');

// on Page open
startSequence();

// Intro

function startSequence() {
    indexBody.innerHTML = 
    `
    <div id="introTextBox">
    <h1>WARNING</h1>
    <h2>This game contains flashing lights, loud noises and jumpscares. Proceed with caution.</h2>
    <h2>It is recommended to use headphones and fullscreen (F11) for the best experience.</h2>
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
    }, 4000)
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