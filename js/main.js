/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();
const shuffledHand = showShuffledDeck();

/*----- app's state (variables) -----*/
let scores = ''
let results = ''
let winner = '';

pHandCard = shuffledDeck.splice(0,26);
cHandCard = shuffledDeck.splice(0,26);

/*----- cached element references -----*/

init();
 

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', init);

/*----- functions -----*/


function init() {
    renderBoard();
    showShuffledDeck();
}

function buildMasterDeck() {
    const deck = [];
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          face: `${suit}${rank}`,
        });
      });
    });
    return deck;
  }

  function shuffledDeck() {

  }

// Initialize all state, then call render 
    function showShuffledDeck();
    // splice deck into two different arrays- pHand & cHand

// Update all impacted state, then call render
