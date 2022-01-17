
// DOM GAME TEXT

const paragraph = document.querySelector("#p1")
const paragraphTwo = document.querySelector("#p2")
const paragraphThree = document.querySelector("#p3")

const statsEl = document.getElementById("current-stats")


// PLAYER SHIP PROPERTIES

class Ship {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.defeated = false;
    }
    
    // PLAYER ATTACK FIRST ALIEN SHIP METHOD

    attack(opponent) {
        if(Math.random() <= this.accuracy) {
            opponent.hull -= this.firepower;
        // check to see if current enemy ship hull is 0, remove that enemy
        // if(opponent.hull <= 0) {
        //    enemyShips.shift()
        //    this.attack(enemyShips[0]) // window.alert do you want to keep attacking or retreat
        // } MOVE TO FIGHT FUNCTION
        } else {
            textEdit()
            console.log('You missed!')
        }
        
        // console.log(opponent.hull);
    }
    
}
// INSTANTIATING PLAYER SHIP

const ussAssembly = new Ship('USS Assembly', 20, 5, .7);

console.log(ussAssembly)

const hullValue = document.getElementById("hull-value")

// ENEMY SHIP PROPERTIES

class EnemyShip {
    constructor() {
        this.hull = Math.floor(Math.random()*4) + 3;
        this.firepower = Math.floor(Math.random()*3) + 2;
        this.accuracy = Math.random() * .2 + .6;
    }

    // ENEMY ATTACKS US METHOD

    attack(player) {
        if(Math.random() <= this.accuracy) {
            player.hull -= this.firepower;
        } else {
            console.log('Alien ship missed their shot!')
        }
        
        // console.log(opponent.hull);
    }
}

// INSTANTIATION OF ENEMY SHIPS 1-6

const enemyShipOne = new EnemyShip
const enemyShipTwo = new EnemyShip
const enemyShipThree = new EnemyShip
const enemyShipFour = new EnemyShip
const enemyShipFive = new EnemyShip
const enemyShipSix = new EnemyShip

// for(let i = 1; i < 7; i++) {
//     const enemyShip = new Ship(`enemyShip ${i}`
// }

// ARRAY OF ENEMY SHIPS

const enemyShips = [enemyShipOne, enemyShipTwo, enemyShipThree, enemyShipFour, enemyShipFive,
enemyShipSix];

console.log(enemyShips)



// FIGHT FUNCTION

const fight = () => {
    
    if(ussAssembly.hull > 0) { // if our ship is still alive
        paragraph.textContent = "You fired at the enemy ship."
        ussAssembly.attack(enemyShips[enemyShips.length - 1]) // attack the first-in-line enemy ship
        paragraphTwo.textContent = "Enemy ship hull is at " + enemyShips[enemyShips.length - 1].hull + "."
        hullValue.textContent = ussAssembly.hull

        if(enemyShips[enemyShips.length - 1].hull > 0) { // if current enemy is still alive
            paragraph.textContent = "You fired at the alien ship and it still has " + enemyShips[enemyShips.length - 1].hull + "hp!"
            enemyShips[enemyShips.length - 1].attack(ussAssembly) // enemy attacks our ship

            if (enemyShips[enemyShips.length -1].hull === 3 || 4 || 5 || 6) {
                paragraph.textContent = "You fired but missed."
            }
            
            paragraphThree.textContent = "Enemy ship hull is at " + enemyShips[enemyShips.length - 1].hull + "."
            
            let ussAssemblyHp = 20;
            
            if (ussAssemblyHp !== ussAssembly.hull) {
                paragraphTwo.textContent = "The alien ship landed a hit of "+ enemyShips[enemyShips.length - 1].firepower + "!"
                ussAssemblyHp = ussAssembly.hull
                hullValue.textContent = ussAssembly.hull

            } else {
                paragraphTwo.textContent = "The alien ship missed their shot."
            }
           
            paragraphThree.textContent = ""
            retreatButton.disabled = true;
            console.log("***********************************************************")
            
            if(ussAssembly.hull <= 0) { // if our ship is destroyed
                paragraph.textContent = "You have been eliminated.";
                paragraphTwo.textContent = "";
                paragraphThree.textContent = "";
                ussAssembly.defeated = true;
                endGame() // end the game
                restartButton.disabled = false;
                attackButton.disabled = true;
                retreatButton.disabled = true;
            }

        } else {
            paragraphThree.textContent = `You have destroyed an enemy ship. There are ${enemyShips.length - 1} remaining. Keep your offensive or retreat.`; 
            enemyShips.pop() // if the first enemy is destroyed, remove it from the array
            retreatButton.disabled = false;
            console.log("***********************************************************")
            if (!enemyShips.length) {
                endGame(); // if there are no enemies left, end the game
                restartButton.disabled = false;
                attackButton.disabled = true;
                retreatButton.disabled = true;
            }
        } 
    }

    console.log(enemyShips); 
 
}

// RETREAT FUNCTION
const retreat = () => {
    ussAssembly.defeated = true;
    endGame();
    restartButton.disabled = false
}

// Text edit
function textEdit() {
    paragraph.textContent = "You fired but missed."
}

// END GAME FUNCTION
const endGame = () => {
    if(ussAssembly.defeated) {
        paragraph.textContent = ""
        paragraphTwo.textContent = "GAME OVER"
        paragraphThree.textContent = ""
        attackButton.disabled = true;
        retreatButton.disabled = true;

    } else if (!enemyShips.length) {
        paragraph.textContent = ""
        paragraphTwo.textContent = "You have defeated the alien invaders."
        paragraphThree.textContent = ""
        attackButton.disabled = true;
        retreatButton.disabled = true;

    }

}

// ATTACK BUTTON

const attackButton = document.getElementById("attack")

attackButton.addEventListener('click', (evt) => {
    fight() /* purpose of fight method is to have us attack the alien ship, 
    if we survive, it hits us. if alien ship is still alive, we keep attacking 
    it by calling fight(). it is a single round of combat. */
})

// RETREAT BUTTON

const retreatButton = document.getElementById("retreat")

retreatButton.addEventListener('click', (evt) => {
    retreat() /* purpose of retreat method is to have the option to retreat after 
    every round. Enable it to be clickable everytime we are
    still alive. */
})

retreatButton.disabled = true

// RESTART BUTTON

const restartButton = document.getElementById("restart")

restartButton.addEventListener('click', (evt) => {
    location.reload();
})

restartButton.disabled = true