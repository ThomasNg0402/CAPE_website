//////////////////////////////
//////////// Game ////////////
//////////////////////////////
// Function so it can be rerun multiple times

document.body.onkeyup = function(e) {
    if (e.key == " "   
    ) {
      window.location.reload();
    };
}
//grab data
const APIKEY = '65c4301d86354ff420464897';
const link = 'https://pandemic-7eff.restdb.io/rest/statement';

const trueStatements = [];
const falseStatements = [];

// Using jQuery AJAX
var ajaxSettings = {
    "async": true,
    "crossDomain": true,
    "url": link,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    }
};

// Using Fetch API
const Apimethod = document.getElementById("api");
function getStatements() {
  let fetchSettings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
  };

  fetch(link, fetchSettings)
    .then(response => response.json())
    .then(data => {
      data.forEach(user => {
        console.log("user statement"+user.Statements);
        if (user.Boolean) {
          trueStatements.push(user.Statements);
        } else {
          falseStatements.push(user.Statements);
        }
      });
      
    })
    .catch(error => console.log(error));
}

// Call the function to fetch data using the Fetch API
getStatements();
var score = 0;
function virusGame(){
    var scoreDisplay = document.getElementById("scoreDisplay");
    var totalBubbles = 0;
    // Get div app
    const root = document.querySelector("#app");
    // Getting window size
    let { innerHeight, innerWidth } = window;
    console.log(innerHeight, innerWidth);
    // Restrain window size of game
    if (innerHeight < 300) {
    innerHeight = 350;
    }
    if (innerWidth < 300) {
    innerWidth = 750;
    }

    class Bubble {
    constructor() {
        this.handleBubbleClick = this.handleBubbleClick.bind(this);
        this.scoreamt = 0;
        this.bubbleSpan = undefined;
        this.height = 200;
        this.width = this.height;
        this.handleNewBubble();
        // Generates bubble in random location
        this.posY = this.randomNumber(innerHeight - 20, 20);
        this.posX = this.randomNumber(innerWidth - 20, 20);

        this.bubbleSpan.style.top = this.posY + "px";
        this.bubbleSpan.style.left = this.posX + "px";

        // setting height and width of the bubble

        this.bubbleEnd.call(this.bubbleSpan, this.randomNumber(7500, 10000));
    }

    // creates and appends a new bubble in the DOM
    handleNewBubble() {
        this.bubbleSpan = document.createElement("span");
        this.bubbleSpan.classList.add("bubble");
        // Generate a random number (0 or 1) to pick a list
        const randomIndex = Math.floor(Math.random() * 2);
        // Pick the list based on the random number
        const selectedList = randomIndex === 0 ? trueStatements : falseStatements;
        const index = Math.floor(Math.random() * selectedList.length);
        const randomtext=selectedList[index];
        if (randomIndex == 0){
            this.scoreamt = 1;
        }
        else{
            this.scoreamt = -1;
        }
        this.bubbleSpan.innerText = randomtext;
        this.color = this.randomGen(randomIndex);
        root.append(this.bubbleSpan);
        this.handlePosition();
        totalBubbles += 1;        

        // On click end bubble
        this.bubbleSpan.addEventListener("click", this.bubbleEnd);
        // On click end bubble
        this.bubbleSpan.addEventListener("click", this.handleBubbleClick);
    }
    handleBubbleClick() {
        console.log("Bubble clicked");
        console.log("score:",score);
        console.log("this.scoreamt:", this.scoreamt);
        score += this.scoreamt;
        console.log("score:", score);
    }
    handlePosition() {
        // positioning the bubble in different random X and Y
        const randomY = this.randomNumber(60, -60);
        const randomX = this.randomNumber(60, -60);

        this.bubbleSpan.style.backgroundColor = this.color;
        this.bubbleSpan.style.height = this.height + "px";
        this.bubbleSpan.style.width = this.height + "px";

        this.posY = this.randomNumber(innerHeight - 20, 20);
        this.posX = this.randomNumber(innerWidth - 20, 20);

        this.bubbleSpan.style.top = this.posY + "px";
        this.bubbleSpan.style.left = this.posX + "px";

        const randomSec = this.randomNumber(750, 500);
        setTimeout(this.handlePosition.bind(this), randomSec); // calling for re-position of bubble
    }

    randomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    randomGen(val){
        var color = [
            "green",
            "red"
        ]
        return color[val];
    }

    bubbleEnd(removingTime = 0) {
        if (removingTime > 0){
            score += this.scoreamt;
        }
        setTimeout(
        () => {
            requestAnimationFrame(() => this.classList.add("bubble--bust"));
        },
        removingTime
        );
        setTimeout(() => {
        requestAnimationFrame(() => this.remove());
        }, (removingTime+50));
    }
    }
    // creating many bubble instance
    var speed = 3000 - (root.childElementCount * 5);
    var loopThis = function () {
        requestAnimationFrame(() => new Bubble());
        scoreDisplay.innerText = "Score = "+score;
        document.getElementById("currentCount").innerText = "Number of bubbles: "+root.childElementCount;
        document.getElementById("totalBubbles").innerText = "Total bubbles so far: "+totalBubbles;
        speed = 2000 - (root.childElementCount * 5);
        // When it goes below 0
        if (score < 0){
            console.log("break");
            // Pauses for 0.5 seconds before clearing
            setTimeout(function(){
                console.log("Total bubbles: "+root.childElementCount);
                root.textContent = "";
            },500)
            // 1s for full reset (0.5s after bubbles clear)
            setTimeout(function(){
                scoreDisplay.innerText = "Total bubbles: "+totalBubbles-root.childElementCount;
                score = 0;
                // Set score
                document.getElementById("currentCount").innerText = "Number of bubbles: "+root.childElementCount;
                document.getElementById("totalBubbles").innerText = "Total bubbles so far: "+totalBubbles;
                score = 0;
            },1000)
        }
        else{
            // Continues the loop
            setTimeout(loopThis,speed);
        }
    }
    // Starts loop
    setTimeout(loopThis,speed);
}





// MEMORY GAME


function memoGame() {
    const infoPrompt = document.getElementById("infoDisplay");
    const game = document.getElementById("memory-game");
    let cardImages = ['../assets/mask.png', '../assets/social-distancing.png', '../assets/bactericide.png', '../assets/wash-your-hands.png', '../assets/shower.png', '../assets/cover-your-cough.png', '../assets/sick-stay.png', '../assets/pets@home.png'];
    // NOTE: only use multiples of 4 because the game gets pissy if you do multiples of 2. The below code duplicates the image in the 
    // list and appends to cardImages.
    // Use reduce and concat because lazy to actually run a loop
    cardImages = cardImages.reduce((acc, img) => acc.concat([img, img]), []);

    let flippedCards = [];

    // Shuffles the images
    cardImages.sort(() => 0.5 - Math.random());

    cardImages.forEach(img => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        // Get name (Eg. from ../assets/mask.png get mask.png)
        var itemName = img.split("/")[2];
        cardElement.innerHTML = `<img src="${img}" alt="${itemName}">`;

        cardElement.addEventListener('click', () => {
            if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
                cardElement.classList.add('flipped', 'spin'); 
                setTimeout(() => cardElement.classList.remove('spin'), 600); 
            
                flippedCards.push(cardElement);
            
                if (flippedCards.length === 2) {
                        setTimeout(checkForMatch, 500);
                }
            }
            if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
                cardElement.classList.add('flipped');
                flippedCards.push(cardElement);

                if (flippedCards.length === 2) {
                    setTimeout(checkForMatch, 500);
                }
            }
        });

        game.appendChild(cardElement);
    });
// Function to check if 2nd last card flipped has same png as last card flipped, if it is similar then they are added to list
    function checkForMatch() {
        const [cardOne, cardTwo] = flippedCards;

        if (cardOne.innerHTML === cardTwo.innerHTML) {
            // Match = True
            cardOne.removeEventListener('click', flipCard);
            cardTwo.removeEventListener('click', flipCard);
            // Hard coded responses because only 8 images and each has different text
            if (cardOne.firstChild.alt == "mask.png"){
                infoPrompt.innerText = "Wear your mask when going outside, especially in crowded areas.";
            }
            else if(cardOne.firstChild.alt == "social-distancing.png"){
                infoPrompt.innerText = "Keep a minimum of 2m apart from other people to practice good social distancing.";
            }
            else if(cardOne.firstChild.alt == "bactericide.png"){
                infoPrompt.innerText = "Regularly disinfect your hards with disinfectant, and also things you touch often, like your phone or wallet.";
            }
            else if(cardOne.firstChild.alt == "wash-your-hands.png"){
                infoPrompt.innerText = "Wash your hands often. Use soap if possible, and wash for at least 20 seconds.";
            }
            else if(cardOne.firstChild.alt == "shower.png"){
                infoPrompt.innerText = "Shower every time you come back from going out.";
            }
            else if(cardOne.firstChild.alt == "cover-your-cough.png"){
                infoPrompt.innerText = "Cover your coughs if you cough, especially in a public area, with a hankerchief or a tissue.";
            }
            else if(cardOne.firstChild.alt == "sick-stay.png"){
                infoPrompt.innerText = "If you are feeling unwell or tested positive, stay at home until you fully recover.";
            }
            else if(cardOne.firstChild.alt == "pets@home.png"){
                infoPrompt.innerText = "If you have any pets, ensure that they stay at home as much as possible. If you go out, ensure that you wash them after you return.";
            }
            else{
                console.log(cardOne.firstChild.alt);
                console.log(cardOne);
                infoPrompt.innerText = "Stay safe~!";
            }
        } else {
            // Match = False
            cardOne.classList.remove('flipped');
            cardTwo.classList.remove('flipped');
            infoPrompt.innerText = "";
        }

        flippedCards = [];
        if($('#memoGame .flipped').length === game.childElementCount){
        //return true
            console.log('true');
            setTimeout(() =>{
                runGame(0);
                game.textContent = "";
            },1000);
        }
    }
    // Flips card
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }
};
// Runs the game
function runGame(gameNo){
    // Hide the choose game menu
    document.getElementById("startPage").style.display = "none";
    // Runs virus game
    if (gameNo == 1){
        // Makes virus game visible
        document.getElementById("virusGame").style.display = "block";
        virusGame();
    }
    // Runs memory
    else if (gameNo == 2){
        // Makes memory game visible
        document.getElementById("memoGame").style.display = "block";
        memoGame();
    }
    // On game clear reset
    else if (gameNo == 0){
        // Shows choose game menu
        document.getElementById("startPage").style.display = "flex";
        // Hides both games to ensure both are hidden
        document.getElementById("memoGame").style.display = "none";
        document.getElementById("virusGame").style.display = "none";
    }
}

