function shuffleCards(){
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
    cardsDrawed = 0;
    if (!reset){
        const oldH2 = container.querySelectorAll('.gameStartOver');
        if (oldH2 != undefined){
         deleteChildren(oldH2);
        }
        const h2 = document.createElement('h2');
        h2.innerText = 'Cards Shuffled';
        h2.classList.add('d-flex', 'justify-content-center', 'mt-5', 'gameStartOver');
        container.children[1].children[1].append(h2);
        setTimeout(() => {
            if (h2 != undefined){
                h2.remove();
            }
            
        }, 1700);
    }
}

function roundEndNotif(str){
    canDraw = false;
    const h2 = document.createElement('h2');
    h2.innerText = str;
    h2.classList.add('mt-5', 'text-center', 'gameStartOver');
    const contBtn = document.createElement('button');
    contBtn.innerText = 'Continue';
    contBtn.classList.add('mt-5', 'w-auto', 'gameButtons', 'p-2', 'gameStartOver');
    container.children[1].children[1].children[0].append(h2);
    container.children[1].children[1].children[1].append(contBtn);
    contBtn.addEventListener('click',(e) => {
        e.preventDefault();
        deleteChildren(document.querySelectorAll('.sideCards'));
        playerPoints = 0;
        dealerPoints = 0;
        hasAceD = 0;
        hasAceP = 0;
        h2.remove();
        contBtn.remove();
        handFirstCards();
    })
}

function createImg(i, j){
    const img = document.createElement('img');
    img.classList.add('mainCard');
    img.src = `Deck/${i}/${deck[i][j]}.png`
    return img;
}

function handCard(player, faceUp){
    return new Promise((resolve, reject) => {
        do{
            i = Math.floor(Math.random() * (deck.length - 1)) + 1;
        }while(deck[i].length == 1);
        j = Math.floor(Math.random() * (deck[i].length - 1)) + 1;
        cardsDrawed++;
        if (cardsDrawed == 52){
            shuffleCards();
        }
        const img = createImg(i, j);
        
        if (faceUp == false){
            img.classList.add('d-none');
            const backCard = document.createElement('img');
            backCard.classList.add('mainCard', 'backCardSmall');
            backCard.src = 'Deck/Back/back.png';
            middleSection.appendChild(backCard);
            setTimeout( () => {
                moveToSide(img, player);
                img.classList.add('d-none');
                moveToSide(backCard, player);
                backCard.classList.remove('backCardSmall');
                resolve();
            }, 800);

        }
        else{
            middleSection.appendChild(img);
            deck[i].splice(j,1);
            cardOnTable = true;
            setTimeout( () => {
                moveToSide(img, player);
                resolve();
            }, 800);
        } 
    })
}

async function handFirstCards(){
    if (reset == false){
        await handCard(dealersCards, true);
        dealerPoints += i;
        if (i == 1){
            hasAceD = true;
            dealerPoints += 10;
        }
        
        console.log(dealerPoints);
    }
    if (reset == false){
        await handCard(playersCards, true);
        playerPoints += i;
        if (i == 1){
            hasAceP = true;
            playerPoints += 10;
        }
        console.log(playerPoints);
    }
    if (reset == false){
        await handCard(dealersCards, false);
        dealerPoints += i;
        if (i == 1 && hasAceD == false){
            hasAceD = true;
            dealerPoints += 10;
        }
        console.log(dealerPoints);
    }
    if (reset == false){
        await handCard(playersCards, true);
        playerPoints += i;
        if (i == 1 && hasAceP == false){
            hasAceP = true;
            playerPoints += 10;
        }
        console.log(playerPoints);
    }
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

const container = document.querySelector('.container');
const playersCards = document.querySelector('.playersCards');
const dealersCards = document.querySelector('.dealersCards');
const middleSection = document.querySelector('.fill');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const drawBtn = document.querySelector('#drawBtn');
const stopBtn = document.querySelector('#stopBtn');

let reset = true;
let cardsDrawed = 0;
let deck;
shuffleCards();
reset = false;
let cardOnTable = false;
let i, j;
let dealerPoints = 0;
let playerPoints = 0;
let canDraw = false;
let hasAceD = false;
let hasAceP = false;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    canDraw = false;
    toggleElements('The game is begin now!!!');
    handFirstCards();
})

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    reset = true;
    const oldH2 = container.querySelectorAll('.gameStartOver');
        if (oldH2 != undefined){
            deleteChildren(oldH2);
        }
    const h2 = document.createElement('h2');
    h2.innerText = 'Reseting...';
    h2.classList.add('d-flex', 'justify-content-center', 'mt-5', 'gameStartOver');
    container.children[1].children[1].append(h2);
    setTimeout(() => {
        if (h2 != undefined){
            h2.remove();
        }
        
    }, 700);
    
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
        hasAceD = 0;
        hasAceP = 0;
        shuffleCards();
        console.log(deck);
        toggleElements('The game has been reset!!!');
        reset = false;
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
        if(i == 1 && hasAceP == false){
            playerPoints += 10;
            hasAceP = true;
        }
        if (playerPoints > 21){
            if (hasAceP == true){
                playerPoints -= 10;
                hasAceP = false;
            }
            else{
                roundEndNotif('Dealer Wins');
            }
        }
    }
     
})

stopBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if(canDraw == true){
        while(dealerPoints < 17){
            await handCard(dealersCards, false);
            dealerPoints += i;
            if(i == 1 && hasAceD == false){
                dealerPoints += 10;
                hasAceD = true;
            }
            if (dealerPoints > 21){
                if (hasAceD == true){
                    dealerPoints -= 10;
                    hasAceD = false;
                }
            }
        }
        for (let i = 1; i < dealersCards.children.length; i++){
            dealersCards.children[i].classList.toggle('d-none');
        }
        if (playerPoints > dealerPoints || dealerPoints > 21){
            roundEndNotif('Congratulations! You won!');
        }
        else if(dealerPoints > playerPoints){
            roundEndNotif('Dealer Won');
        }
        else{
            roundEndNotif('Its a Draw!!');
        }
    }
})
