function createImg(i, j){
    const img = document.createElement('img');
    img.classList.add('mainCard');
    img.src = `Deck/${i}/${deck[i][j]}.png`
    return img;
}
function handCard(player, points){
    return new Promise((resolve, reject) => {
        do{
            i = Math.floor(Math.random() * (deck.length - 1)) + 1;
        }while(deck[i].length == 1);
        j = Math.floor(Math.random() * (deck[i].length - 1)) + 1;
        cardsDrawed++;
        const img = createImg(i, j);
        middleSection.appendChild(img);
        deck[i].splice(j,1);
        cardOnTable = true;
        setTimeout( () => {
            moveToSide(img, player);
            resolve();
        }, 800);
    })
}

async function handFirstCards(){
    await handCard(dealersCards, dealerPoints);
    dealerPoints += i;
    console.log(dealerPoints);
    await handCard(playersCards, playerPoints);
    playerPoints += i;
    console.log(playerPoints);
    await handCard(dealersCards, dealerPoints);
    dealerPoints += i;
    console.log(dealerPoints);
    await handCard(playersCards, playerPoints);
    playerPoints += i;
    console.log(playerPoints);
    canDraw = true;
}

function deleteChildren(parent){
    for(let i = parent.length - 1; i >= 0; i--){
        parent[i].remove();
    }
}

function toggleElements(str){
    const oldH2 = container.querySelectorAll('.gameStartOver');
    if (oldH2 != undefined){
        deleteChildren(oldH2);
    }
    const h2 = document.createElement('h2');
    h2.innerText = str;
    h2.classList.add('d-flex', 'justify-content-center', 'mt-5', 'gameStartOver');
    container.children[1].children[1].append(h2);
    setTimeout(() => {
        if (h2 != undefined){
            h2.remove();
        }
        
    }, 1700);
    startBtn.classList.toggle('d-none');
    resetBtn.classList.toggle('d-none');
    drawBtn.classList.toggle('d-none');
    stopBtn.classList.toggle('d-none');
}

function moveToSide(img, position){
    img.remove();
    img.classList.add('col', 'sideCards');
    img.classList.remove('mainCard', 'd-none');
    img.id = 'smallCard';
    position.appendChild(img);
    cardOnTable = false;
}

let deck = [
    0,
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [4, 1, 2, 3, 4],
    [16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
];

const container = document.querySelector('.container');
const playersCards = document.querySelector('.playersCards');
const dealersCards = document.querySelector('.dealersCards');
const middleSection = document.querySelector('.fill');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const drawBtn = document.querySelector('#drawBtn');
const stopBtn = document.querySelector('#stopBtn');

let cardOnTable = false;
let i, j;
let dealerPoints = 0;
let playerPoints = 0;
let cardsDrawed = 0;
let canDraw = false

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canDraw = false;
    toggleElements('The game is begin now!!!');
    handFirstCards();
})

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const oldH2 = container.querySelectorAll('.gameStartOver');
     if (oldH2 != undefined){
        if (oldH2 != undefined){
            deleteChildren(oldH2);
        }
     }
    const h2 = document.createElement('h2');
    h2.innerText = 'Reseting...';
    h2.classList.add('d-flex', 'justify-content-center', 'mt-5', 'gameStartOver');
    container.children[1].children[1].append(h2);
    setTimeout(() => {
        if (h2 != undefined){
            h2.remove();
        }
        
    }, 1700);
    
    setTimeout( () => {
        deleteChildren(dealersCards.children);
        deleteChildren(playersCards.children);
        if(cardOnTable == true){
            middleSection.children[0].remove();
            cardOnTable = false;
        }
        cardsDrawed = 0;
        playerPoints = 0;
        dealerPoints = 0;
        deck = [
            0,
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [4, 1, 2, 3, 4],
            [16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        ];
        toggleElements('The game has been reset!!!');
    },700);
    
    
    
    // for (let i = 0; i < playersCards.length; i++){
    //     playersCards[i].remove();
    // }
})


drawBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(canDraw == true){
        if(cardOnTable == true){
            const img = middleSection.children[0];
            img.classList.add('d-none');   
         }
       
         handCard(playersCards);
         playerPoints += i;
        if (playerPoints >= 22){
            canDraw = false;
            const h2 = document.createElement('h2');
            h2.innerText = 'Dealer wins';
            h2.classList.add('mt-5', 'text-center', 'gameStartOver');
            const contBtn = document.createElement('button');
            contBtn.innerText = 'Continue';
            contBtn.classList.add('mt-5', 'w-auto', 'gameButtons', 'p-2', 'gameStartOver');
            container.children[1].children[1].children[0].append(h2);
            container.children[1].children[1].children[1].append(contBtn);
        }
    }
     
})