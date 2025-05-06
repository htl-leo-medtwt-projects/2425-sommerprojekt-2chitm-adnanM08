
/* import Reveal from '../node_modules/reveal.js';
import Markdown from '../node_modules/reveal.js/plugin/markdown/markdown.esm.js';

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize(); */

let GAME = {
    'running': false
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
    indexBody.style.backgroundImage = 'none'
    indexBody.innerHTML = 
    `
    <div id="mapContainer">
    <img src="../ressources/levelRessources/elevator.gif" id="elevator">
    <div class="mouseTrigger" id="leftTrigger">.</div>
    <div class="mouseTrigger" id="rightTrigger">.</div>
    <div>
    `
}