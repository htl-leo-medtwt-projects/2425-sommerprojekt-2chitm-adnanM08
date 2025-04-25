import Reveal from '..\node_modules\reveal.js';
import Markdown from '..\node_modules\reveal.js/plugin/markdown/markdown.esm.js';

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize();

let GAME = {
    'running': false
}
function introduction() {
    indexBody.innerHTML = `
    <div id="fullpage">
    <div class="section">Some section</div>
    <div class="section">Some section</div>
    <div class="section">Some section</div>
    <div class="section">Some section</div>
    </div>
    `;
}

// introduction slider configuration. Code from documentation. Link: https://alvarotrigo.com/fullPage/docs/#usage

var myFullpage = new fullpage('#fullpage', {
    // Navigation
    menu: '#menu',
    lockAnchors: false,
    anchors:['firstPage', 'secondPage'],
    navigation: false,
    navigationPosition: 'right',
    navigationTooltips: ['firstSlide', 'secondSlide'],
    showActiveTooltip: false,
    slidesNavigation: false,
    slidesNavPosition: 'bottom',

    // Scrolling
    css3: true,
    scrollingSpeed: 700,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 600,
    scrollBar: false,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: false,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    normalScrollElements: '#element1, .element2',
    scrollOverflow: true,
    scrollOverflowMacStyle: false,
    scrollOverflowReset: false,
    skipIntermediateItems: false,
    touchSensitivity: 15,
    bigSectionsDestination: null,
    adjustOnNavChange: true,

    // Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    // Design
    controlArrows: true,
    controlArrowsHTML: [
        '<div class="fp-arrow"></div>', 
        '<div class="fp-arrow"></div>'
    ],
    verticalCentered: true,
    sectionsColor : ['#ccc', '#fff'],
    paddingTop: '3em',
    paddingBottom: '10px',
    fixedElements: '#header, .footer',
    responsiveWidth: 0,
    responsiveHeight: 0,
    responsiveSlides: false,
    effects: false,
    effectsOptions: [Object],
    parallax: false,
    parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
    dropEffect: false,
    dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
    waterEffect: false,
    waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
    cards: false,
    cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

    // Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    lazyLoading: true,
    lazyLoadThreshold: 0,
    observer: true,
    credits: { enabled: true, label: 'Made with fullPage.js', position: 'right'},

    // Events
    beforeLeave: function(origin, destination, direction, trigger){},
    onLeave: function(origin, destination, direction, trigger){},
    afterLoad: function(origin, destination, direction, trigger){},
    afterRender: function(){},
    afterResize: function(width, height){},
    afterReBuild: function(){},
    afterResponsive: function(isResponsive){},
    afterSlideLoad: function(section, origin, destination, direction, trigger){},
    onSlideLeave: function(section, origin, destination, direction, trigger){},
    onScrollOverflow: function(section, slide, position, direction){}
});