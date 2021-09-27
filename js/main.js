/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();
// const shuffledHand = showShuffledDeck();

/*----- app's state (variables) -----*/
let pDeck, cDeck, pHand, cHand;

/*----- cached element references -----*/

init();
 

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', init);

/*----- functions -----*/


function init() {
  let shuffledDeck = getNewShuffledDeck();
  pDeck = shuffledDeck.splice(0,26);
  cDeck = shuffledDeck;
  render();
    // getNewShuffledDeck();
}

function hnadlePlay(){
  let pCard = pDeck.shift();
  pHand.push(pCard);
  let cCard = cDeck.shift();
  pHand.push(cCard);
}


function render() {

}

function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
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
// Initialize all state, then call render 

// function renderBoard() {
  
// }
  
// splice deck into two different arrays- pHand & cHand

// Update all impacted state, then call render

