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
                playerMoney = playerMoney - 10;
                console.log("playerMoney" , playerMoney);
                break;
            }

            // If no (false) ask question again by running fight() again
            else {
                fight();
            }
        }

        // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable.
        enemyHealth = enemyHealth - playerAttack;

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

        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;

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
            enemyHealth = 50;
            fight(pickedEnemyName);
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

startGame();