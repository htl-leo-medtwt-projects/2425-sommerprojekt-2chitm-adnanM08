let indexBody = document.getElementById('startBody');

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
}

// on Page open
startSequence();