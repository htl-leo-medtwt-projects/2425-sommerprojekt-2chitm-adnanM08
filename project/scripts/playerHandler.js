// variables


// Player configuration
let PLAYER = {
    'lifeStatus': 'alive', // Options: alive | dead
    'level': 1, // Level (night) the player is currently in. Options: 1 | 2 | 3 | 4 | 5
    'stars': 0, // How many stars the player has. Stars can be obtained by winning all Levels (nights)
}


// player functions (made console/user friendly with logs)
function toggleLifeStatus() {
    if (PLAYER.lifeStatus == 'alive') {
        PLAYER.lifeStatus = 'dead';
    } else {
        PLAYER.lifeStatus = 'alive';
    }
}

function changeLevel(lvl) {
    if (!Number.isNaN(lvl) && lvl > 0 && lvl <= 5) {
        PLAYER.lifeStatus = lvl;
        loadHomePage();
    } else {
        console.log('GAME | An error occured while executing "changeLevel()". Make sure that the parameter is a number between 1 and 5. Ex.: changeLevel(1).')
    }
}

function changeStars(num) {
    if (!Number.isNaN(num) && lvl >= 0) {
        PLAYER.stars = num;
    } else {
        console.log('GAME | An error occured while executing "changeStars()". Make sure that the parameter is a number greater than 0. Ex.: changeStars(1).')
    }
}

function clearPlayerData() {
    // prompt() feature from stackOverflow. Link: https://stackoverflow.com/questions/75180343/how-to-get-a-users-input-from-console-and-put-it-into-a-variable-in-js
    let res = prompt('WARNING | This resets all of your player data, sets you back to level 1 and reloads the game.\nType "yes" if you want to proceed, otherwise type "no" (not case sensitive).');
    if (res.toLowerCase() == 'yes' || res.toLowerCase() == 'y') {
        localStorage.clear();
        console.log('GAME | Data cleared successfully! Reloading game in 3 seconds.')
        setTimeout(function() {
            location.reload();
        })
    } else {
        console.log('GAME | Prompt cancelled. No data has been cleared.')
    }
}