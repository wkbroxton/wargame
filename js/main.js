/*----- constants -----*/

const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const faceLookup = {
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14
}

const masterDeck = buildMasterDeck();
const msgEl = document.querySelector('h1');

/*----- app's state (variables) -----*/

let pDeck, cDeck, pHand, cHand, war;

/*----- cached element references -----*/

let pHandEl = document.querySelector('#pHand');
let cHandEl = document.querySelector('#cHand');
let warBtnEl = document.querySelector('#war');
let playBtnEl = document.querySelector('#play');
let replayBtnEl = document.querySelector('#replay');

let pCountEl = document.querySelector("#pCardCount")
let cCountEl = document.querySelector("#cCardCount")

/*----- event listeners -----*/

playBtnEl.addEventListener('click', handlePlay);
warBtnEl.addEventListener('click', warBegins);
replayBtnEl.addEventListener('click', reset);

/*----- functions -----*/

init();

function init() {
  let shuffledDeck = getNewShuffledDeck();
  pDeck = shuffledDeck.splice(0, 26);
  cDeck = shuffledDeck;
  pHand = [];
  cHand = [];
  render();

}

function handlePlay() {

  let pCard = pDeck.shift();
  pHand.unshift(pCard);
  let cCard = cDeck.shift();
  cHand.unshift(cCard);
  render();
  winningHand();
  winner();
}

function winningHand() {
  if (pHand[0].value === cHand[0].value) return renderWarButton();
  if (pHand[0].value > cHand[0].value) {
    msgEl.innerHTML = "PS5 Wins the Hand";
    pDeck.push(...cHand, ...pHand);
    cHand = [];
    pHand = [];
    pDeck.push(...pHand.splice(0));
  } else {
    msgEl.innerHTML = "XBox Wins the Hand";
    cDeck.push(...pHand.splice(0), ...cHand.splice(0));
  }
}

function renderWarButton() {
  warBtnEl.style.visibility = "visible";
  playBtnEl.style.visibility = "hidden";
  msgEl.innerHTML = "WELCOME TO THE WARZONE";
}

function warBegins() {
  pHand.unshift(pDeck.pop(), pDeck.pop(), pDeck.pop());
  cHand.unshift(cDeck.pop(), cDeck.pop(), cDeck.pop());
  render();
  winningHand();
  unrenderWarButton();
};

function unrenderWarButton() {
  if (pHand !== cHand) {
    warBtnEl.style.visibility = "hidden";
    playBtnEl.style.visibility = "visible"; {
      msgEl.innerHTML = "WHO SHALL BE VICTORIOUS?!?!";
    }
  }
}

function render() {
  if (pHand.length > 0 && cHand.length > 0) {
    let pHandTemplate = `<div class="card ${pHand[0].face}"></div>`;
    let cHandTemplate = `<div class="card ${cHand[0].face}"></div>`;
    pHandEl.innerHTML = pHandTemplate;
    cHandEl.innerHTML = cHandTemplate;
  } else {
    pHandEl.innerHTML = '';
    cHandEl.innerHTML = '';
  }
  pCountEl.innerText = pDeck.length + pHand.length;
  cCountEl.innerText = cDeck.length + cHand.length;
}


function buildMasterDeck() {
  const deck = [];
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
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

function winner() {
  if (pDeck.length >= 35) {
    playBtnEl.style.visibility = "hidden";
    msgEl.innerHTML = "Playstation Wins!";
    replayBtnEl.style.visibility = "visible";
    confetti({
      particleCount: 1000
    });
  } else if (cDeck.length >= 35) {
    playBtnEl.style.visibility = "hidden";
    msgEl.innerHTML = "XBox Wins";
    replayBtnEl.style.visibility = "visible";
    confetti({
      particleCount: 1000
    });
  }
}

function reset() {
  msgEl.innerHTML = "The WAR of 9th Gen Consoles";
  playBtnEl.style.visibility = "visible";
  warBtnEl.style.visibility = "hidden";
  replayBtnEl.style.visibility = "hidden";
  init();
}
