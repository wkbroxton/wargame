/*----- constants -----*/

const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const faceLookup = {
  "J" : 11,
  "Q" : 12,
  "K" : 13,
  "A" : 14
}

const masterDeck = buildMasterDeck();
const msgEl = document.querySelector('h1');

/*----- app's state (variables) -----*/

let pDeck, cDeck, pHand, cHand, war;

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

}

function handlePlay(){

  let pCard = pDeck.shift();
  pHand.unshift(pCard);
  let cCard = cDeck.shift();
  cHand.unshift(cCard);
  render();
  winningHand();
  winner();
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
    // winner();
  }  //winner

  function renderWarButton(){
      warBtnEl.style.visibility = "visible";
      playBtnEl.style.visibility = "hidden";{
        msgEl.innerHTML = "WELCOME TO THE WARZONE";
    } 
  }

  function warBegins() {
    pHand.unshift(pDeck.pop(), pDeck.pop(), pDeck.pop());
    cHand.unshift(cDeck.pop(), cDeck.pop(), cDeck.pop());
    render();
    winningHand();
    unrenderWarButton();
  };

 function unrenderWarButton(){
    if(pHand !== cHand){
      warBtnEl.style.visibility = "hidden";
      playBtnEl.style.visibility = "visible";{
        msgEl.innerHTML = "WHO SHALL BE VICTORIOUS?!?!";
    } 
    }
  }

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
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.unshift({
        face: `${suit}${rank}`,
        value: Number(rank) || faceLookup[rank]
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
 }

 function winner(){
   if (pDeck.length >= '35'){
     winner = pHand;
      msgEl.innerHTML = "Playstation Wins!";
      playBtnEl.innerHTML = "Play Again?"
  } else if(cDeck.length >= '35'){
     winner = cHand; {
      msgEl.innerHTML = "XBox Wins";
      playBtnEl.innerHTML = "Play Again?"
      }
    } 
  }
  

  // function playAgain(){
  //   if(winner === true)
  //   playBtnEl.innerHTML = "Play Again?";
  //   return init(); 
  //   } console.log("Hey You");
  