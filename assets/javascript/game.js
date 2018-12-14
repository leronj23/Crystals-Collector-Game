$(document).ready(function () {

    var defaultGameState = {
      numberOptions: [1,2,3,4],
      crystalsImages: [
        "assets/images/blue.png", "assets/images/pink.png", "assets/images/purple.png", "assets/images/yellow.png"
      ],
      randomGameNumber: null,
      totalScore: 0,
      wins: 0,
      loses: 0
    };

    var onGoingGame = {};

    function initializeGame() {
        $("#crystalContainer").empty();

        onGoingGame = JSON.parse((JSON.stringify(defaultGameState)));

        onGoingGame.numberOptions.fill(randomIntFromInterval(1, 12), 0,4);

        var processStart = [turnOffListener, displayScoreWinsLoses, loadCrystals, attachListener].forEach(function(fn) {
            fn(onGoingGame);
        });

        return true;
    }

    // Generate Random Number
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Display Score, Wins, & Loses
    function displayScoreWinsLoses({ randomGameNumber }) {
        // Display random game number
        $("#score").text(randomGameNumber);
    }

    // Load Crystals
    function loadCrystals({ numberOptions }) {
        numberOptions.forEach(function(numberOption, index) {
            $("#crystalContainer").append($("<img>")
                .addClass("crystal-image")
                .attr("src", crystalsImages[index])
                .attr("data-crystalvalue", numberOption));
        });
    }

    function turnOffListener() {
        $(document).off();
    }

    function attachListener(state) {
        $(document).on('click', ".crystal-image", function () {
            state.totalScore += parseInt(($(this).attr("data-crystalvalue")));

            $("#total").text(state.totalScore);
    
            if ((randomGameNumber - state.totalScore) == 0) {
    
                // Add to wins
                state.wins++;
    
                // Display number of wins
                $("#wins").text(state.wins);
    
                // Reset Game
                initializeGame();
                return;
            }
            if ((state.randomGameNumber - state.totalScore) < 0) {
    
                // Add to loses
                state.loses++;
    
                // Display number of wins
                $("#loses").text(state.loses);
    
                // Reset Game
                initializeGame();
            }
        });
    }

});
