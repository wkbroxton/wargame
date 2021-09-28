/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['05', '05', '05', '05', '05', '05', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const faceLookup = {
  "J" : 11,
  "Q" : 12,
  "K" : 13,
  "A" : 14
}

const masterDeck = buildMasterDeck();
// const shuffledHand = showShuffledDeck();

/*----- app's state (variables) -----*/
let pDeck, cDeck, pHand, cHand;

let war; //= warBegins();

/*----- cached element references -----*/

init();

let pHandEl = document.querySelector('#pHand');
let cHandEl = document.querySelector('#cHand');
let warBtnEl = document.querySelector('#war');
let playBtnEl = document.querySelector('#play');


/*----- event listeners -----*/
playBtnEl.addEventListener('click', handlePlay);
warBtnEl.addEventListener('click', warBegins);

/*----- functions -----*/


function init() {
  let shuffledDeck = getNewShuffledDeck();
  pDeck = shuffledDeck.splice(0,26);
  cDeck = shuffledDeck;
  pHand = [];
  cHand = [];
  render();
    // getNewShuffledDeck();
}

function handlePlay(){

  let pCard = pDeck.shift();
  pHand.unshift(pCard);
  let cCard = cDeck.shift();
  cHand.unshift(cCard);
  render();
  winningHand();
}

function winningHand(){
  if (pHand[0].value === cHand[0].value) return renderWarButton();
  if (pHand[0].value > cHand[0].value) {
      pDeck.push(...cHand, ...pHand);
      cHand = [];
      pHand = [];
      pDeck.push(...pHand.splice(0));
  } else {
      cDeck.push(...pHand.splice(0), ...cHand.splice(0));
    }
    render();
  }

  function renderWarButton(){
      warBtnEl.style.visibility = "visible";
      playBtnEl.style.visibility = "hidden";
  }

  function warBegins() {
    pHand.unshift(pDeck.pop(), pDeck.pop(), pDeck.pop());
    cHand.unshift(cDeck.pop(), cDeck.pop(), cDeck.pop());
    render();
    winningHand();
  };


function render() {
  if (pHand.length > 0 && cHand.length > 0){
    let pHandTemplate = `<div class="card ${pHand[0].face}"></div>`;
    let cHandTemplate = `<div class="card ${cHand[0].face}"></div>`;
    pHandEl.innerHTML = pHandTemplate;
    cHandEl.innerHTML = cHandTemplate;
  }
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.unshift({
        // The ‘face’ property maps to the library’s CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the ‘value’ property for game of blackjack, not war
        value: Number(rank) || faceLookup[rank]
      });
    });
  });
  return deck;
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
