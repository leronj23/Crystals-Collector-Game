$(document).ready(function () {

    // Vars
    var numberOptions = [];
    var crystalsImages = ["assets/images/blue.png", "assets/images/pink.png", "assets/images/purple.png", "assets/images/yellow.png"];
    var randomGameNumber = randomIntFromInterval(19, 120);
    var totalScore = 0;
    var wins = 0;
    var loses = 0;

    // Loop to generate random numbers for each crystal
    function generateCrystalRandomNumber() {
        for (var i = 0; i < 4; i++) {

            numberOptions.push(randomIntFromInterval(1, 12))
        }

        console.log(numberOptions);

        // Display Score, Wins, & Loses
        displayScoreWinsLoses();
    }
    generateCrystalRandomNumber();

    // Generate Random Number
    function randomIntFromInterval(min, max) // min and max included
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Display Score, Wins, & Loses
    function displayScoreWinsLoses() {

        // Display random game number
        $("#score").text(randomGameNumber);

        // Load Crystals
        loadCrystals();
    }

    // Load Crystals
    function loadCrystals() {

        //  Loop to generate the crystals
        for (var i = 0; i < numberOptions.length; i++) {

            // Create an image tag
            var imageCrystal = $("<img>");

            // Add the crystal css class to the image tag
            imageCrystal.addClass("crystal-image");

            // Add the crystal image
            imageCrystal.attr("src", crystalsImages[i]);

            // Add a data value for each crystal
            imageCrystal.attr("data-crystalvalue", numberOptions[i]);

            //console.log(imageCrystal.attr("data-crystalvalue"));

            // Add each crystal to the crystal container
            $("#crystalContainer").append(imageCrystal);
        }
    }

    // Class name is now the button.
    //$(".crystal-image").on("click", function () {

    // Cannot use the above click event because it wont fire due to using empty() on line 115
    $(document).on('click', ".crystal-image", function () {

        console.log($(this).attr("data-crystalvalue"));

        var crystalValue = ($(this).attr("data-crystalvalue"));
        totalScore += parseInt(crystalValue);

        // Display total score
        $("#total").text(totalScore);

        // Check status of Random Game Number
        if ((randomGameNumber - totalScore) == 0) {

            // Add to wins
            wins++;

            // Display number of wins
            $("#wins").text(wins);

            // Reset Game
            resetGame();
        }
        else if ((randomGameNumber - totalScore) < 0) {

            // Add to loses
            loses++;

            // Display number of wins
            $("#loses").text(loses);

            // Reset Game
            resetGame();
        }
    });

    // Reset Game
    function resetGame() {

        numberOptions = [];
        randomGameNumber = randomIntFromInterval(19, 120);
        totalScore = 0;

        // Display total score
        $("#total").text("");

        $("#crystalContainer").empty();

        // Loop to generate random numbers for each crystal
        generateCrystalRandomNumber();
    }
});