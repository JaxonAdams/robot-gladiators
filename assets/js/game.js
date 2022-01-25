//Game States
//"WIN" - Player robot has defeated all enemy robots
//      *Fight all enemy robots
//      *Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

// High Score
// When the game has ended and we've survived facing all the robots:
//  * Retrieve the current high score from localStorage
//  * Compare the player-robot score with the current high score
//  * If the current high score is higher:
//      * Send player the message that the player did not beat the high score
//  * If the player score is higher
//      * Set new high score object into localStorage
//      * Set new player-robot's name object into localStorage
//      * Send player the message that they beat the high score

var fightOrSkip = function() {
    // Fight?
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    promptFight = promptFight.toLowerCase();

    // conditional recursive function call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again!");
        return fightOrSkip();
    }

     // If skip ...
     if (promptFight === "skip") {
        // confirm skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

        // If yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // Subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money" , playerInfo.money);
            return true;
        }
    }

    return false;
}

var fight = function(enemy) {

    // keep track of who goes first
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while(playerInfo.health > 0 && enemy.health > 0) {
        
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name +
                " attacked " +
                enemy.name +
                ". " +
                enemy.name +
                " now has " +
                enemy.health +
                " health remaining."
            );

            // check enemy's health 
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        // player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name +
                " attacked " +
                playerInfo.name +
                ". " +
                playerInfo.name +
                " now has " +
                playerInfo.health +
                " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " .");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
}

var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("Would you like to enter the shop?");

                if (storeConfirm) {
                    shop();
                }
            }
        }
    
        else {
            window.alert("Your robot has been defeated! Game Over!");
            break;
        }
    }

    var endGame = function() {
        // if the player is still alive, they win
        if (playerInfo.health > 0) {
            window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + " .");
        }

        else {
            window.alert("You've lost your robot in battle.");
        }

        // check localStorage for high score, if it's not there, use 0
        var highScore = localStorage.getItem("highScore");
        if (highScore === null) {
            highScore = 0;
        }

        // if player has more money than the high score, player has new high score
        if (playerInfo.money > highScore) {
            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);

            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        } else {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }

        // ask the player if they'd like to play again
        var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
            // restart the game
            startGame();
        }

        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
    }

    // play again
    endGame();
}

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

// function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
}

var enemyInfo = [
    {
        name: "Mr. Roboto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robotron",
        attack: randomNumber(10, 14)
    }
];

startGame();