//Game States
//"WIN" - Player robot has defeated all enemy robots
//      *Fight all enemy robots
//      *Defeat each enemy robot
//"LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Mr. Roboto", "Amy Android", "Paige"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {
        // Fight?
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If skip ...
        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            // confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");

            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // Subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney" , playerMoney);
                break;
            }

            // If no (false) ask question again by running fight() again
            else {
                fight();
            }
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);

        // Log a resulting message to the console so we know that it worked.
         console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " hp remaining."
        );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " hp left.");
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " hp remaining."
        );

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " hp left.");
        }
    }
}

var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40, 60);
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
        if (playerHealth > 0) {
            window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + " .");
        }

        else {
            window.alert("You've lost your robot in battle.");
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter REFILL, UPGRADE, or LEAVE."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "Refill":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling your health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money! You have " + playerMoney + " dollars.");
            }

            break;
        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading the player's attack by 6 for 7 dollars.");
            
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money! You have " + playerMoney + " dollars.");
            }

            break;
        case "LEAVE":
        case "Leave":
        case "leave":
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

startGame();