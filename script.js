/*
***************************************
PROGRAM NAME - One Piece Tower Defense Game

PROGRAMMER - Dylan Ha

VERSION - 1.0 

DATE - Started 11/27/1990
       Phase I completed 11/30/1990

BUGS - list your bugs here

DESCRIPTION - One Piece Tower Defense Game by Dylan Ha!
              
REFERENCES - NONE


SELF-ASSESSMENT - I believe this program deserves a 4++ because it demonstrates strong proficiency in object-oriented programming and game development concepts. The code snippets provided show a well-structured implementation of classes, including the Level, Enemy, and Tower classes. The code follows best practices by separating concerns and utilizing inheritance to create subclasses of towers.

The implementation includes key game mechanics such as enemy spawning, enemy movement along a path, enemy health management, tower placement, tower attack cooldowns, and damage calculation. The code also incorporates animations for enemies and towers, allowing for visual feedback during gameplay.

Additionally, the program showcases an understanding of game logic and progression, including wave-based level advancement, tracking player currency, and win/lose conditions.

Throughout the code, there are clear comments explaining the purpose and functionality of different sections, enhancing readability and maintainability. The code also shows consideration for extensibility, making it easier to add new features or modify existing ones.

Overall, the program demonstrates a solid grasp of programming principles and game development concepts, resulting in a functional and engaging tower defense game. Therefore, I believe it deserves a rating of 4++.
                  
                  
                  
********************************

*/

// Game state
let gameState; // Current state of the game

// Buttons
let startButton; // Start button element
let introductionButton; // Introduction button element
let howPlayButton; // How to Play button element
let settingsButton; // Settings button element
let gameMenuButton; // Game menu button element
let welcomeWanoButton; // Welcome to Wano button element
let StrongestButton; // Strongest button element
let GrandlineButton; // Grandline button element
let OvertakenButton; // Overtaken button element
let stopSongButton; // Stop song button element
let returnButton; // Return button element

// Images and Backgrounds
let startScreenBG; // Start screen background image
let introductionImage; // Introduction image
let howToPlay; // How to Play image
let settingsConfig; // Settings configuration
let settingsImage; // Settings image
let startScreenFont; // Start screen font
let welcomeWano; // Welcome to Wano image

// Game Variables
let level; // Current level of the game
let tower; // Current tower
let towers = []; // List of towers
let currency = 500; // Current currency
let enemy; // Current enemy

// Sprites
let navy1; // Navy sprite 1
let navy2; // Navy sprite 2
let navy3; // Navy sprite 3
let luffySprite; // Luffy sprite
let zoroSprite; // Zoro sprite
let sanjiSprite; // Sanji sprite
let namiSprite; // Nami sprite
let usoppSprite; // Usopp sprite

// Tower Placement
let selectedTowerType = ""; // Currently selected tower type
let isPlacingTower = false; // Flag indicating if a tower is being placed

// Path
let path = [
  { x: 1179, y: 1064 }, // Path coordinate 1
  { x: 1179, y: 335 }, // Path coordinate 2
  { x: 731, y: 335 }, // Path coordinate 3
  { x: 731, y: 708 }, // Path coordinate 4
  { x: 9, y: 708 } // Path coordinate 5
];


/**
 * Preloads the necessary assets for the game.
 * Loads images, animations, sprites, fonts, and sounds.
 */
function preload() {
  // Load images
  startScreenBG = loadImage('onepieceBG.jpg'); // Start screen background image
  introductionImage = loadImage('IntroductionImage.jpg'); // Introduction image
  howToPlay = loadImage('howToPlay.jpg'); // How to Play image
  settingsConfig = loadImage('settingsConfig.jpg'); // Settings configuration image
  settingsImage = loadImage('settings.jpg'); // Settings image
  levelSelect = loadImage('levelSelector.jpg'); // Level selector image
  levelOneBG = loadImage('levelOne.png'); // Level one background image
  levelTwoBG = loadImage('levelTwoBG.jpg'); // Level two background image
  levelThreeBG = loadImage('levelThreeBG.jpg'); // Level three background image
  gameOverBackground = loadImage('gameOver.jpg'); // Game over background image
  luffyHappy = loadImage('luffyHappy.webp'); // Luffy happy image
  navigateBG = loadImage('navigator.jpg'); // Navigator background image
  victory = loadImage('victory.jpg'); // Victory background image

  // Load attack animations
  luffyAttack = loadImage('luffyAttack.gif'); // Luffy attack animation
  zoroAttack = loadImage('zoroAttack.gif'); // Zoro attack animation
  sanjiAttack = loadImage('sanjiAttack.gif'); // Sanji attack animation
  namiAttack = loadImage('namiAttack.gif'); // Nami attack animation
  usoppAttack = loadImage('usoppAttack.gif'); // Usopp attack animation

  // Load sprites
  luffySprite = loadImage('luffy.png'); // Luffy sprite image
  zoroSprite = loadImage('zoro.png'); // Zoro sprite image
  sanjiSprite = loadImage('sanji.png'); // Sanji sprite image
  namiSprite = loadImage('nami.png'); // Nami sprite image
  usoppSprite = loadImage('usopp.png'); // Usopp sprite image
  navy1 = loadImage('navy1.png'); // Navy sprite 1 image
  navy2 = loadImage('navy2.png'); // Navy sprite 2 image
  navy3 = loadImage('navy3.png'); // Navy sprite 3 image

  // Load font
  startScreenFont = loadFont('DragonHunter-9Ynxj.otf'); // Start screen font

  // Load sounds
  welcomeWano = loadSound('Wano.mp3'); // Wano sound
  Strongest = loadSound("The Very Very Strongest.mp3"); // The Very Very Strongest sound
  Grandline = loadSound("To The Grand Line.mp3"); // To The Grand Line sound
  Overtaken = loadSound("Overtaken.mp3"); // Overtaken sound
  clickSFX = loadSound('minecraft_click.mp3'); // Minecraft click sound
}

/**
 * Sets up the game environment and initializes the necessary components.
 * Creates the canvas, sets the initial game state, and sets up buttons.
 */
function setup() {
  createCanvas(1920, 1080); // Create the canvas
  gameState = "startMenu"; // Set the initial game state
  welcomeWano.loop(); // Loop the Wano sound
  setupButtons(); // Setup the buttons
}

/**
 * Sets up the buttons for the game.
 * Creates button objects with their positions, dimensions, labels, font size, and additional properties.
 */
function setupButtons() {
  startButton = new Button(width / 8 + 45, height / 3, 400, 300, "Click Here to Continue", 24); // Start button
  introductionButton = new Button(1105, height / 1.5, 400, 300, "Continue", 24); // Introduction button
  howPlayButton = new Button(1225, height / 1.4, 400, 300, "Continue", 24); // How to Play button
  settingsButton = new Button(width / 2 - width / 3 - 50, height / 6.3, 400, 300, "Settings", 24); // Settings button
  gameMenuButton = new Button(width / 2 + width / 6 - 55, height / 6.3, 400, 300, "Game Menu", 24); // Game menu button
  welcomeWanoButton = new Button(width / 2 - width / 3 - 50, height / 6.3, 400, 300, "Welcome to \n Wano", 24); // Welcome Wano button
  StrongestButton = new Button(width / 2 + width / 6 - 55, height / 6.3, 400, 300, "The Very \n Strongest", 24); // Strongest button
  GrandlineButton = new Button(width / 2 - width / 3 - 50, height / 2, 400, 300, "GrandLine", 24); // GrandLine button
  OvertakenButton = new Button(width / 2 + width / 6 - 55, height / 2, 400, 300, "Overtaken", 24); // Overtaken button
  stopSongButton = new Button(width / 2 - 150, height / 2 - 300, 300, 200, "Stop All Songs", 24); // Stop all songs button
  returnButton = new Button(width / 2 - 150, height / 2, 300, 200, "Return to Continue \n to the game", 24); // Return button
  levelOne = new Button(width / 2 - 250, height / 2, 500, 350, "Proceed To Level 1", 24); // Level one button
  levelTwo = new Button(width / 2 - 250, height / 2, 500, 350, "Proceed To Level 2", 24); // Level two button
  levelThree = new Button(width / 2 - 250, height / 2, 500, 350, "Proceed To Level 3", 24); // Level three button
  luffyTowerCreate = new Button(1650, 200, 200, 100, "Create Luffy Tower \n Cost: 200", 16, "LuffyTower"); // Luffy tower create button
  zoroTowerCreate = new Button(1650, 350, 200, 100, "Create Zoro Tower \n Cost: 150", 16, "ZoroTower"); // Zoro tower create button
  sanjiTowerCreate = new Button(1650, 500, 200, 100, "Create Sanji Tower \n Cost: 140", 16, "SanjiTower"); // Sanji tower create button
  namiTowerCreate = new Button(1650, 650, 200, 100, "Create Nami Tower \n Cost: 100", 16, "NamiTower"); // Nami tower create button
  usoppTowerCreate = new Button(1650, 800, 200, 100, "Create Usopp Tower \n Cost: 90", 16, "UsoppTower"); // Usopp tower create button
  returnToGameMenu = new Button(width / 2 - 250, height / 2 - 200, 500, 400, "Return To the Game Menu", 30); // Return to game menu button
  navigate = new Button(width / 2 - 150, height / 6.3, 300, 200, "Navigate Through \n Past Screens", 20); // Navigate button

  introductionNavigate = new Button(width / 2 - 175, height / 5, 350, 200, "Introduction", 20); // Introduction navigate button
  howToPlayMenuNavigate = new Button(width / 2 - 175, height / 5 + 250, 350, 200, "How To Play", 20); // How to Play navigate button
  configMenuNavigate = new Button(width / 2 - 175, height / 5 + 500, 350, 200, "Config", 20); // Config navigate button

  nextLevelOne = new Button(width / 2 + 500, height / 2 + 50, 200, 100, "Level Two", 20); // Next level one button
  nextLevelTwo = new Button(width / 2 + 500, height / 2 + 50, 200, 100, "Level Three", 20); // Next level two button
  backLevelTwo = new Button(width / 2 - 500, height / 2 + 50, 200, 100, "Level One", 20); // Back level two button
  backLevelThree = new Button(width / 2 - 500, height / 2 + 50, 200, 100, "Level Two", 20); // Back level three button
}

/**
 * Draws the game based on the current game state.
 * Displays different elements and buttons accordingly.
 */
function draw() {
  if (gameState === "startMenu") {
    startMenu();
    startButton.display(); // Display the start button
  }

  if (gameState === "introduction") {
    introduction();
    introductionButton.display(); // Display the introduction button
  }

  if (gameState === "howToPlay") {
    howPlay();
    howPlayButton.display(); // Display the how to play button
  }

  if (gameState === "config") {
    config();
    settingsButton.display(); // Display the settings button
    gameMenuButton.display(); // Display the game menu button
    navigate.display(); // Display the navigate button
  }

  if (gameState === "settings") {
    settings();
    welcomeWanoButton.display(); // Display the welcome Wano button
    StrongestButton.display(); // Display the Strongest button
    GrandlineButton.display(); // Display the GrandLine button
    OvertakenButton.display(); // Display the Overtaken button
    stopSongButton.display(); // Display the stop all songs button
    returnButton.display(); // Display the return button
  }

  if (gameState === "gameMenu") {
    gameMenu();
    levelOne.display(); // Display the level one button
    nextLevelOne.display(); // Display the next level one button
  }

  if (gameState === "gameMenu2") {
    gameMenu2();
    levelTwo.display(); // Display the level two button
    nextLevelTwo.display(); // Display the next level two button
    backLevelTwo.display(); // Display the back level two button
  }

  if (gameState == "gameMenu3") {
    gameMenu3();
    levelThree.display(); // Display the level three button
    backLevelThree.display(); // Display the back level three button
  }

  if (gameState === "navigate") {
    navigation();
    introductionNavigate.display(); // Display the introduction navigate button
    howToPlayMenuNavigate.display(); // Display the how to play navigate button
    configMenuNavigate.display(); // Display the config navigate button
  }

  if (gameState == "levelOne" || gameState == "levelTwo" || gameState == "levelThree") {
    StartLevel();
    luffyTowerCreate.display(); // Display the Luffy tower create button
    zoroTowerCreate.display(); // Display the Zoro tower create button
    sanjiTowerCreate.display(); // Display the Sanji tower create button
    namiTowerCreate.display(); // Display the Nami tower create button
    usoppTowerCreate.display(); // Display the Usopp tower create button

    level.update(); // Level Class Update Method Called
    level.display(); // Level class display method called

    for (let i = 0; i < towers.length; i++) { //updates all the towers in the towers array
      let tower = towers[i];
      tower.update(); 

      let attacking = false; // Flag to track if the tower is attacking

      for (let j = 0; j < level.enemies.length; j++) {
        let enemy = level.enemies[j]; // lets variable enemy = the ith index in the enemies arrray in the level class
        if (tower.canHitEnemy(enemy, tower.x, tower.y)) { // checks if the tower can hit the enemy
          tower.attack(enemy); // attack method in tower class
          attacking = true; // Set the flag to true if the tower is attacking an enemy
        }
      }

      if (attacking) {
        tower.displayAttackAnimation(); // show attacking animation if the tower is attacking
      } else {
        tower.display(); // else display normal sprite
      }
    }

    for (let i = 0; i < level.enemies.length; i++) { //updates and displays the enemies
      let enemy = level.enemies[i]; 
      enemy.update();
      enemy.display();
    }
  }

  if (gameState == "gameOver") {
    gameOver();
    returnToGameMenu.display(); // Display the return to game menu button
  }

  if (gameState == "gameWon") {
    gameWon();
    returnToGameMenu.display(); // Display the return to game menu button
  }

  if (gameState === "victory") {
    finishGame(); // finishes the game / shows end screen
  }
}



/**
 * Displays the start menu screen.
 */
function startMenu() {
  background(startScreenBG); // Set the background to the start screen background image
  textFont(startScreenFont); // Set the text font to the start screen font
  textAlign(CENTER, CENTER);
  smooth();
  textSize(64);
  text("Welcome to One Piece \n Tower Defense !", width / 4, height / 8); // Display the welcome message
  textSize(38);
  text("Created by: Dylan Ha", width / 4, height / 4.5); // Display the creator's name
}

/**
 * Sets the game state and changes the background image.
 * @param {string} gameStateWanted - The desired game state.
 * @param {object} image - The background image for the new game state.
 */
function setGameState(gameStateWanted, image) {
  gameState = gameStateWanted; // Set the game state to the desired game state
  clear();
  background(image); // Set the background image for the new game state
}

/**
 * Displays the introduction screen.
 */
function introduction() {
  clear();
  background(introductionImage); // Set the background to the introduction image
}

/**
 * Displays the how to play screen.
 */
function howPlay() {
  clear();
  background(howToPlay); // Set the background to the how to play image
}

/**
 * Displays the config screen.
 */
function config() {
  clear();
  background(settingsConfig); // Set the background to the config image
}

/**
 * Displays the settings screen.
 */
function settings() {
  clear();
  background(settingsImage); // Set the background to the settings image
}

/**
 * Displays the navigation screen.
 */
function navigation() {
  clear();
  background(navigateBG); // Set the background to the navigation image
}

/**
 * Displays the game menu screen.
 */
function gameMenu() {
  clear();
  background(levelSelect); // Set the background to the game menu image
}

/**
 * Displays the second game menu screen.
 */
function gameMenu2() {
  clear();
  background(levelTwoBG); // Set the background to the second game menu image
}

/**
 * Displays the third game menu screen.
 */
function gameMenu3() {
  clear();
  background(levelThreeBG); // Set the background to the third game menu image
}

/**
 * Stops all the sound effects.
 */
function stopSound() {
  welcomeWano.stop(); // Stop the "Welcome to Wano" sound
  Strongest.stop(); // Stop the "The Very Strongest" sound
  Grandline.stop(); // Stop the "To The Grand Line" sound
  Overtaken.stop(); // Stop the "Overtaken" sound
}

/**
 * Sets up and displays the level one screen.
 */
function StartLevel() {
  clear();
  background(levelOneBG); // Set the background to the level one image
}

/**
 * Displays the game over screen.
 */
function gameOver() {
  clear();
  background(gameOverBackground); // Set the background to the game over image
  gameState = "gameOver"; // Set the game state to "gameOver"
}

/**
 * Displays the game won screen.
 */
function gameWon() {
  clear();
  background(luffyHappy); // Set the background to the happy Luffy image
  gameState = "gameWon"; // Set the game state to "gameWon"
}

/**
 * Displays the victory screen.
 */
function finishGame() {
  clear();
  background(victory); // Set the background to the victory image
}

/**
 * Checks if the player can afford an item based on the price.
 * @param {number} price - The price of the item.
 * @returns {boolean} - Whether the player can afford the item or not.
 */
function canAfford(price) {
  if (currency >= price) {
    return currency >= price; // Return true if the player can afford the item
  }
}

/**
 * Creates a tower of the specified type at the given coordinates.
 * @param {string} towerType - The type of tower to create.
 * @param {number} x - The x-coordinate of the tower's position.
 * @param {number} y - The y-coordinate of the tower's position.
 */
function createTower(towerType, x, y) {
  switch (towerType) {
    case "LuffyTower":
      if (canAfford(200)) {
        currency -= 200; // Deduct the tower cost from the player's currency
        luffyTowerCreated = new LuffyTower(x, y); // Create a new Luffy Tower object
        towers.push(luffyTowerCreated); // Add the tower to the towers array
      }
      break;
    case "ZoroTower":
      if (canAfford(150)) {
        currency -= 150; // Deduct the tower cost from the player's currency
        zoroTowerCreated = new ZoroTower(x, y); // Create a new Zoro Tower object
        towers.push(zoroTowerCreated); // Add the tower to the towers array
      }
      break;
    case "SanjiTower":
      if (canAfford(140)) {
        currency -= 140; // Deduct the tower cost from the player's currency
        sanjiTowerCreated = new SanjiTower(x, y); // Create a new Sanji Tower object
        towers.push(sanjiTowerCreated); // Add the tower to the towers array
      }
      break;
    case "NamiTower":
      if (canAfford(100)) {
        currency -= 100; // Deduct the tower cost from the player's currency
        namiTowerCreated = new NamiTower(x, y); // Create a new Nami Tower object
        towers.push(namiTowerCreated); // Add the tower to the towers array
      }
      break;
    case "UsoppTower":
      if (canAfford(90)) {
        currency -= 90; // Deduct the tower cost from the player's currency
        usoppTowerCreated = new UsoppTower(x, y); // Create a new Usopp Tower object
        towers.push(usoppTowerCreated); // Add the tower to the towers array
      }
      break;
    default:
      return null;
  }
}



/**
 * Button Class
 *
 * Summary:
 *   Represents a clickable button in the game.
 *
 * Description:
 *   The Button class contains properties and methods related to a clickable button in the game.
 *   It handles displaying the button, detecting if it is being hovered over, and returning the hover state.
 *
 * Properties:
 *   - x: The X-coordinate of the button.
 *   - y: The Y-coordinate of the button.
 *   - width: The width of the button.
 *   - height: The height of the button.
 *   - text: The text displayed on the button.
 *   - textSize: The text size of the button.
 *   - isHovered: A flag to track if the button is being hovered over.
 *   - scale: A scale factor for the button size.
 *   - towerType: The tower type associated with the button.
 *
 * Methods:
 *   - display(): Displays the button.
 *   - buttonHovered(): Returns the hover state of the button.
 */

class Button {
  constructor(x, y, w, h, text, textSize, towerType) {
    this.x = x; // X-coordinate of the button
    this.y = y; // Y-coordinate of the button
    this.width = w; // Width of the button
    this.height = h; // Height of the button
    this.text = text; // Text displayed on the button
    this.textSize = textSize; // Text size of the button
    this.isHovered = false; // Flag to track if the button is being hovered over
    this.scale = 1; // Scale factor for button size
    this.towerType = towerType; // The tower type associated with the button
  }

  /**
   * display()
   *
   * Summary:
   *   Displays the button.
   *
   * Description:
   *   This method is called to display the button. It checks if the mouse is within the button bounds,
   *   sets the hovered flag accordingly, and applies scaling effect and colors based on the hover state.
   *   It then draws the button rectangle and text using the specified properties.
   *
   * Parameters:
   *   None.
   *
   * Returns:
   *   None.
   */
  display() {
    // Check if the mouse is within the button bounds
    if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
      this.isHovered = true; // Set the hovered flag to true
    } else {
      this.isHovered = false; // Set the hovered flag to false
    }

    let backgroundColor = this.isHovered ? color(255, 100) : color(0, 0); // Button background color based on hover state
    let borderColor = color(0); // Button border color

    if (this.isHovered) {
      this.scale = lerp(this.scale, 1.1, 0.2); // Apply scaling effect when hovered
    } else {
      this.scale = lerp(this.scale, 1, 0.2); // Reset scaling effect when not hovered
    }

    push();
    translate(this.x, this.y);
    scale(this.scale);

    let adjustX = (this.width * this.scale - this.width) / 2; // Adjusted X-coordinate for centering
    let adjustY = (this.height * this.scale - this.height) / 2; // Adjusted Y-coordinate for centering

    fill(backgroundColor);
    stroke(borderColor);
    strokeWeight(2);
    rect(-adjustX, -adjustY, this.width, this.height, 10); // Draw the button rectangle

    fill(0);
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    text(this.text, this.width / 2 - adjustX, this.height / 2 - adjustY); // Draw the button text

    pop();
  }

  /**
   * buttonHovered()
   *
   * Summary:
   *   Returns the hover state of the button.
   *
   * Description:
   *   This method returns the hover state of the button. It is used to check if the button is being hovered over.
   *
   * Parameters:
   *   None.
   *
   * Returns:
   *   A boolean value indicating whether the button is being hovered over.
   */
  buttonHovered() {
    return this.isHovered; // Return the hovered state of the button
  }
}



/**
 * mouseClicked()
 *
 * Summary:
 *   Handles the logic for mouse click events.
 *
 * Description:
 *   This function is called automatically by p5.js whenever the mouse is clicked. It
 *   contains a series of conditional statements that determine the behavior based on
 *   the current game state and the button that was clicked. It plays click sound effects
 *   and sets the game state accordingly.
 *
 * Parameters:
 *   None.
 *
 * Returns:
 *   None.
 */
function mouseClicked() {
  // Check if gameState is "config" and navigate button is hovered
  if (gameState === "config" && navigate.buttonHovered()) {
    clickSFX.play();
    setGameState("navigate", navigateBG);
  }
  // Check if gameState is "navigate" and introductionNavigate button is hovered
  else if (gameState === "navigate" && introductionNavigate.buttonHovered()) {
    clickSFX.play();
    setGameState("startMenu", startScreenBG);
  }
  // Check if gameState is "navigate" and howToPlayMenuNavigate button is hovered
  else if (gameState === "navigate" && howToPlayMenuNavigate.buttonHovered()) {
    clickSFX.play();
    setGameState("introduction", introductionImage);
  }
  // Check if gameState is "navigate" and configMenuNavigate button is hovered
  else if (gameState === "navigate" && configMenuNavigate.buttonHovered()) {
    clickSFX.play();
    setGameState("howToPlay", howToPlay);
  }

  // Check if gameState is "startMenu" and startButton is hovered
  if (gameState === "startMenu" && startButton.buttonHovered()) {
    clickSFX.play();
    setGameState("introduction", introductionImage);
  }
  // Check if gameState is "introduction" and introductionButton is hovered
  else if (gameState === "introduction" && introductionButton.buttonHovered()) {
    clickSFX.play();
    setGameState("howToPlay", howToPlay);
  }
  // Check if gameState is "howToPlay" and howPlayButton is hovered
  else if (gameState === "howToPlay" && howPlayButton.buttonHovered()) {
    clickSFX.play();
    setGameState("config", settingsConfig);
  }
  // Check if gameState is "config"
  else if (gameState === "config") {
    // Check if settingsButton is hovered
    if (settingsButton.buttonHovered()) {
      clickSFX.play();
      setGameState("settings", settingsImage);
    }
    // Check if gameMenuButton is hovered
    else if (gameMenuButton.buttonHovered()) {
      clickSFX.play();
      setGameState("gameMenu", levelSelect);
    }
  }

  // Check if gameState is "gameWon" and returnToGameMenu button is hovered
  if (gameState === "gameWon" && returnToGameMenu.buttonHovered()) {
    clickSFX.play();
    setGameState("gameMenu", levelOneBG);
  }

  // Check if gameState is "gameOver" and returnToGameMenu button is hovered
  if (gameState === "gameOver" && returnToGameMenu.buttonHovered()) {
    clickSFX.play();
    setGameState("gameMenu", levelOneBG);
  }
  // Check if gameState is "settings"
  else if (gameState === "settings") {
    // Check if welcomeWanoButton is hovered
    if (welcomeWanoButton.buttonHovered()) {
      clickSFX.play();
      stopSound();
      welcomeWano.loop();
    }
    // Check if StrongestButton is hovered
    else if (StrongestButton.buttonHovered()) {
      clickSFX.play();
      stopSound();
      Strongest.loop();
    }
    // Check if GrandlineButton is hovered
    else if (GrandlineButton.buttonHovered()) {
      clickSFX.play();
      stopSound();
      Grandline.loop();
    }
    // Check if OvertakenButton is hovered
    else if (OvertakenButton.buttonHovered()) {
      clickSFX.play();
      stopSound();
      Overtaken.loop();
    }
    // Check if stopSongButton is hovered
    else if (stopSongButton.buttonHovered()) {
      clickSFX.play();
      stopSound();
    }
    // Check if returnButton is hovered
    else if (returnButton.buttonHovered()) {
      clickSFX.play();
      setGameState("config", settingsConfig);
    }
  }
    
  else if (gameState === "gameMenu" && levelOne.buttonHovered()) {
    clickSFX.play();
    setGameState("levelOne", levelOneBG);
    level = new Level(0);
    tower = new LuffyTower(850, 610, "LuffyTower");
    towers.push(tower);
  }
  // Check if gameState is "gameMenu" and nextLevelOne button is hovered
  else if (gameState === "gameMenu" && nextLevelOne.buttonHovered()) {
    clickSFX.play();
    setGameState("gameMenu2", levelTwoBG);
  }
  // Check if gameState is "gameMenu2" and levelTwo button is hovered
  else if (gameState === "gameMenu2" && levelTwo.buttonHovered()) {
    setGameState("levelTwo", levelOneBG);
    clickSFX.play();
    level = new Level(1);
    tower = new LuffyTower(850, 610, "LuffyTower");
    towers.push(tower);
  }
  // Check if gameState is "gameMenu2" and backLevelTwo button is hovered
  else if (gameState === "gameMenu2" && backLevelTwo.buttonHovered()) {
    clickSFX.play();
    setGameState("gameMenu", levelSelect);
  }
  // Check if gameState is "gameMenu2" and nextLevelTwo button is hovered
  else if (gameState === "gameMenu2" && nextLevelTwo.buttonHovered()) {
    clickSFX.play();
    setGameState("gameMenu3", levelThreeBG);
  }
  // Check if gameState is "gameMenu3" and levelThree button is hovered
  else if (gameState === "gameMenu3" && levelThree.buttonHovered()) {
    setGameState("levelThree", levelOneBG);
    clickSFX.play();
    level = new Level(2);
    tower = new LuffyTower(850, 610, "LuffyTower");
    towers.push(tower);
  }
  // Check if gameState is "gameMenu3" and backLevelThree button is hovered
  else if (gameState === "gameMenu3" && backLevelThree.buttonHovered()) {
    clickSFX.play();
    setGameState("gameMenu2", levelTwoBG);
  }

  // Check if gameState is "levelOne", "levelTwo", or "levelThree"
  if (gameState === "levelOne" || gameState === "levelTwo" || gameState === "levelThree") {
    // Check if luffyTowerCreate button is hovered
    if (luffyTowerCreate.buttonHovered()) {
      clickSFX.play();
      selectedTowerType = "LuffyTower";
      isPlacingTower = true;
    }
    // Check if zoroTowerCreate button is hovered
    else if (zoroTowerCreate.buttonHovered()) {
      clickSFX.play();
      selectedTowerType = "ZoroTower";
      isPlacingTower = true;
    }
    // Check if sanjiTowerCreate button is hovered
    else if (sanjiTowerCreate.buttonHovered()) {
      clickSFX.play();
      selectedTowerType = "SanjiTower";
      isPlacingTower = true;
    }
    // Check if namiTowerCreate button is hovered
    else if (namiTowerCreate.buttonHovered()) {
      clickSFX.play();
      selectedTowerType = "NamiTower";
      isPlacingTower = true;
    }
    // Check if usoppTowerCreate button is hovered
    else if (usoppTowerCreate.buttonHovered()) {
      clickSFX.play();
      selectedTowerType = "UsoppTower";
      isPlacingTower = true;
    }
    // Check if isPlacingTower is true
    else if (isPlacingTower) {
      clickSFX.play();
      tower = createTower(selectedTowerType, mouseX, mouseY);
      selectedTowerType = "";
      isPlacingTower = false;
    }
  }
}


/**
 * Level Class
 *
 * Summary:
 *   Represents a level in the game.
 *
 * Description:
 *   The Level class contains properties and methods related to a specific level in the game.
 *   It keeps track of the level number, wave count, enemy spawning, currency rewards, and more.
 *
 * Properties:
 *   - levelNumber: The number of the level.
 *   - waveCount: The current wave count.
 *   - maxWaves: The maximum number of waves for the level.
 *   - currencyReward: The currency reward for defeating enemies.
 *   - enemySpawnInterval: The number of frames between enemy spawns.
 *   - enemySpawnTimer: The timer to track enemy spawning.
 *   - enemies: An array to store the active enemies.
 *   - lifeCounter: The remaining life counter for the level.
 *
 * Methods:
 *   - update(): Updates the level's logic.
 *   - display(): Displays relevant information for the level.
 *   - spawnEnemy(): Spawns enemies based on the current wave count.
 */

class Level {
  constructor(levelNumber) {
    this.levelNumber = levelNumber;
    this.waveCount = 0;
    this.maxWaves = (levelNumber + 1) * 30;
    this.currencyReward = 2;
    this.enemySpawnInterval = 60; // Number of frames between enemy spawns
    this.enemySpawnTimer = 0;
    this.enemies = [];
    this.lifeCounter = 100;
  }

  /**
   * update()
   *
   * Summary:
   *   Updates the level's logic.
   *
   * Description:
   *   This method is called to update the level's logic. It checks if the game is over or won,
   *   spawns enemies, updates existing enemies, and handles enemy defeat or reaching the end.
   *
   * Parameters:
   *   None.
   *
   * Returns:
   *   None.
   */
  update() {
    // Check if the life counter is zero or below
    if (this.lifeCounter <= 0) {
      gameOver();
      return;
    }

    // Check if the maximum waves are reached and there are no more enemies
    if (this.waveCount >= this.maxWaves && this.enemies.length === 0) {
      if (this.levelNumber === 2) {
        setGameState("victory", victory);
        finishGame();
      } else {
        gameWon();
        return; // Exit the update loop if the game is won
      }
    }

    // Spawn enemy if the wave count is less than the maximum waves
    if (this.waveCount < this.maxWaves) {
      this.spawnEnemy();
    }

    // Update enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update();

      // Check if the enemy has reached the end
      if (enemy.hasReachedEnd) {
        this.lifeCounter -= enemy.level * 4;
        this.enemies.splice(i, 1);
      }
      // Check if the enemy is defeated
      else if (enemy.isDefeated) {
        this.enemies.splice(i, 1);
        currency += this.currencyReward;
      }
    }
  }

  /**
   * display()
   *
   * Summary:
   *   Displays relevant information for the level.
   *
   * Description:
   *   This method is called to display the wave count, remaining life counter, and currency for the level.
   *
   * Parameters:
   *   None.
   *
   * Returns:
   *   None.
   */
  display() {
    push();
    textSize(50);
    fill('#FFFFFF')
    text(this.lifeCounter, 220, 45); // Display life counter
    text(currency, 500, 45); // Display currency
    text(this.waveCount, 1400, 35); // Display wave count
    pop();
  }

  /**
   * spawnEnemy()
   *
   * Summary:
   *   Spawns enemies based on the current wave count.
   *
   * Description:
   *   This method is called to spawn enemies based on the current wave count.
   *   It calculates the number of enemies per wave and the delay between spawning each enemy.
   *   It creates new enemy instances and adds them to the enemies array.
   *
   * Parameters:
   *   None.
   *
   * Returns:
   *   None.
   */
  spawnEnemy() {
    const enemiesPerWave = 2 * this.waveCount;
    const enemyDelay = 800; // Delay in milliseconds between spawning each enemy

    let enemyIndex = 0;
    const spawnNextEnemy = () => { // The spawnNextEnemy function is recursively called using setTimeout until the desired number of enemies is reached for the current wave.
      if (enemyIndex < enemiesPerWave) {
        const enemyLevel = Math.floor(random(1, 4));
        const enemy = new Enemy(path, enemyLevel);
        this.enemies.push(enemy);
        enemyIndex++;
        setTimeout(spawnNextEnemy, enemyDelay);
      }
    };

    // Check if the current wave is completed before spawning more enemies
    if (this.enemies.length === 0) {
      spawnNextEnemy();
      this.waveCount++;
      currency += 20 * this.waveCount;
    }
  }
}


/**
 * Enemy Class
 *
 * Summary:
 *   Represents an enemy unit in the game.
 *
 * Description:
 *   The Enemy class contains properties and methods related to an enemy unit in the game.
 *   It handles the movement, health, and animation of the enemy.
 *
 * Properties:
 *   - speed: The speed of the enemy.
 *   - level: The level of the enemy.
 *   - isDefeated: A flag to track if the enemy is defeated.
 *   - hasReachedEnd: A flag to track if the enemy has reached the end of the path.
 *   - health: The health of the enemy.
 *   - position: The position of the enemy as a vector.
 *   - currentWaypoint: The index of the current waypoint in the path.
 *   - range: The range of the enemy.
 *   - runningFrames: An array of image frames for the enemy's running animation.
 *   - frameRate: The frame rate for the animation.
 *   - frameTimer: A timer to track the frame rate.
 *   - currentFrame: The index of the current frame in the animation.
 *
 * Methods:
 *   - update(): Updates the enemy's position and animation.
 *   - display(): Displays the enemy on the screen.
 *   - takeDamage(damage): Reduces the enemy's health by the specified damage amount.
 */

class Enemy {
  constructor(path, level) {
    this.speed = 1; // Speed of the enemy
    this.level = level; // Level of the enemy
    this.isDefeated = false; // Flag to track if the enemy is defeated
    this.hasReachedEnd = false; // Flag to track if the enemy has reached the end of the path
    this.health = 150 + level * 50; // Health of the enemy
    this.position = createVector(path[0].x, path[0].y); // Position of the enemy as a vector
    this.currentWaypoint = 1; // Index of the current waypoint in the path
    this.range = 100; // Range of the enemy

    // Set the running frames based on the enemy level
    if (this.level === 3) {
      this.runningFrames = [
        loadImage('smoker/tile000.png'),
        loadImage('smoker/tile001.png'),
        loadImage('smoker/tile002.png'),
        loadImage('smoker/tile003.png'),
        loadImage('smoker/tile004.png')
      ];
    } else if (this.level === 2) {
      this.runningFrames = [
        loadImage('navygunman/tile000.png'),
        loadImage('navygunman/tile001.png'),
        loadImage('navygunman/tile002.png'),
        loadImage('navygunman/tile003.png'),
        loadImage('navygunman/tile004.png'),
        loadImage('navygunman/tile005.png')
      ];
    } else if (this.level === 1) {
      this.runningFrames = [
        loadImage('navybaseguard/tile010.png'),
        loadImage('navybaseguard/tile011.png'),
        loadImage('navybaseguard/tile012.png'),
        loadImage('navybaseguard/tile013.png')
      ];
    }

    this.frameRate = 10; // Frame rate for the animation
    this.frameTimer = 0; // Timer to track the frame rate
    this.currentFrame = 0; // Index of the current frame in the animation
  }

  /**
   * update()
   *
   * Summary:
   *   Updates the enemy's position and animation.
   *
   * Description:
   *   This method updates the enemy's position based on its speed and the current waypoint.
   *   It also updates the animation frame of the enemy.
   *
   * Parameters:
   *   None.
   *
   * Returns:
   *   None.
   */
  update() {
    if (this.isDefeated === false && this.hasReachedEnd === false) {
      // Move towards the current waypoint
      let targetX = path[this.currentWaypoint].x;
      let targetY = path[this.currentWaypoint].y;

      if (this.position.x < targetX) {
        this.position.x += this.speed;
      } else if (this.position.x > targetX) {
        this.position.x -= this.speed;
      }

      if (abs(this.position.y - targetY) <= this.speed) {
        // Close enough to the target Y-coordinate, snap to it
        this.position.y = targetY;
      } else if (this.position.y < targetY) {
        this.position.y += this.speed;
      } else if (this.position.y > targetY) {
        this.position.y -= this.speed;
      }

      // Check if the enemy has reached the current waypoint
      if (this.position.x === targetX && this.position.y === targetY) {
        if (this.currentWaypoint === path.length - 1) {
          this.hasReachedEnd = true;
        } else {
          this.currentWaypoint++;
        }
      }

      this.frameTimer++;
      if (this.frameTimer >= this.frameRate) {
        this.currentFrame = (this.currentFrame + 1) % this.runningFrames.length;
        this.frameTimer = 0;
      }
    }
  }

  /**
   * display()
   *
   * Summary:
   *   Displays the enemy on the screen.
   *
   * Description:
   *   This method displays the enemy on the screen using the current frame of its running animation.
   *
   * Parameters:
   *   None.
   *
   * Returns:
   *   None.
   */
  display() {
    const currentFrameImage = this.runningFrames[this.currentFrame];
    const scaleFactor = 1.5; // Adjust this value to change the scale

    const scaledWidth = currentFrameImage.width * scaleFactor;
    const scaledHeight = currentFrameImage.height * scaleFactor;

    image(
      currentFrameImage,
      this.position.x - scaledWidth / 2,
      this.position.y - scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );
  }

  /**
   * takeDamage(damage)
   *
   * Summary:
   *   Reduces the enemy's health by the specified damage amount.
   *
   * Description:
   *   This method reduces the enemy's health by the specified damage amount.
   *   If the enemy's health reaches 0 or below, it sets the isDefeated flag to true.
   *
   * Parameters:
   *   - damage: The amount of damage to be inflicted on the enemy.
   *
   * Returns:
   *   None.
   */
  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.isDefeated = true;
    }
  }
}


/**
 * Class representing a Tower in the game.
 * @class
 */
class Tower {
  /**
   * Create a new Tower object.
   * @param {number} x - The x-coordinate of the tower.
   * @param {number} y - The y-coordinate of the tower.
   * @param {string} towerType - The type of tower.
   */
  constructor(x, y, towerType) {
    this.x = x;
    this.y = y;
    this.cooldown = 60;
    this.currentCooldown = this.cooldown;
    this.towerType = towerType;
  }

  /**
   * Update the tower state.
   */
  update() {
    if (this.currentCooldown > 0) {
      this.currentCooldown--;
    }
  }

  /**
   * Display the tower.
   */
  display() {
    console.log("Displays Towers from tower class.")
  }

  /**
   * Check if the tower can hit an enemy.
   * @param {Enemy} enemy - The enemy to check.
   * @param {number} towerX - The x-coordinate of the tower.
   * @param {number} towerY - The y-coordinate of the tower.
   * @returns {boolean} - True if the tower can hit the enemy, false otherwise.
   */
  canHitEnemy(enemy, towerX, towerY) {
    let dx = enemy.position.x - towerX; // Calculate the horizontal distance between the enemy and tower
    let dy = enemy.position.y - towerY; // Calculate the vertical distance between the enemy and the tower
    let distance = Math.sqrt((dx * dx) + (dy * dy)); // Pythagorean theorem
    return distance <= this.range; // returns true or false if the tower can hit the enemy or not.
  }

  /**
   * Attack an enemy.
   * @param {Enemy} enemy - The enemy to attack.
   */
  attack(enemy) {
    if (this.currentCooldown === 0) {
      enemy.takeDamage(this.damage); // pass this.damage to the takeDamage function in the "enemy" class
      this.currentCooldown = this.cooldown; // resets the cooldown
    }
  }

  /**
   * Display the attack animation.
   */
  displayAttackAnimation() {
    image(this.attackGif, this.x - this.attackGif.width / 2 - 50, this.y - this.attackGif.width / 2, this.attackGif.width * 2, this.attackGif.height * 1.3);
  }
}


/**
 * Class representing a Luffy Tower, which is a type of Tower.
 * @class
 * @extends Tower
 */
class LuffyTower extends Tower {
  /**
   * Create a new LuffyTower object.
   * @param {number} x - The x-coordinate of the tower.
   * @param {number} y - The y-coordinate of the tower.
   */
  constructor(x, y) {
    super(x, y, "LuffyTower");
    this.range = 190;
    this.damage = 50;
    this.cooldown = 30;
    this.attackGif = luffyAttack;
  }

  /**
   * Display the LuffyTower.
   */
  display() {
    image(luffySprite, this.x - (luffySprite.width / 2), this.y - (luffySprite.height / 2));
  }
}

/**
 * Class representing a Zoro Tower, which is a type of Tower.
 * @class
 * @extends Tower
 */
class ZoroTower extends Tower {
  /**
   * Create a new ZoroTower object.
   * @param {number} x - The x-coordinate of the tower.
   * @param {number} y - The y-coordinate of the tower.
   */
  constructor(x, y) {
    super(x, y, "ZoroTower");
    this.range = 155;
    this.damage = 43;
    this.cooldown = 35;
    this.attackGif = zoroAttack;
  }

  /**
   * Display the ZoroTower.
   */
  display() {
    image(zoroSprite, this.x - (zoroSprite.width / 2), this.y - (zoroSprite.height / 2));
  }
}

/**
 * Class representing a Sanji Tower, which is a type of Tower.
 * @class
 * @extends Tower
 */
class SanjiTower extends Tower {
  /**
   * Create a new SanjiTower object.
   * @param {number} x - The x-coordinate of the tower.
   * @param {number} y - The y-coordinate of the tower.
   */
  constructor(x, y) {
    super(x, y, "SanjiTower");
    this.range = 160;
    this.damage = 35;
    this.cooldown = 25;
    this.attackGif = sanjiAttack;
  }

  /**
   * Display the SanjiTower.
   */
  display() {
    image(sanjiSprite, this.x - (sanjiSprite.width / 2), this.y - (sanjiSprite.height / 2));
  }
}

/**
 * Class representing a Nami Tower, which is a type of Tower.
 * @class
 * @extends Tower
 */
class NamiTower extends Tower {
  /**
   * Create a new NamiTower object.
   * @param {number} x - The x-coordinate of the tower.
   * @param {number} y - The y-coordinate of the tower.
   */
  constructor(x, y) {
    super(x, y, "NamiTower");
    this.range = 130;
    this.damage = 25;
    this.cooldown = 25;
    this.attackGif = namiAttack;
  }

  /**
   * Display the NamiTower.
   */
  display() {
    image(namiSprite, this.x - (namiSprite.width / 2), this.y - (namiSprite.height / 2));
  }
}

/**
 * Class representing an Usopp Tower, which is a type of Tower.
 * @class
 * @extends Tower
 */
class UsoppTower extends Tower {
  /**
   * Create a new UsoppTower object.
   * @param {number} x - The x-coordinate of the tower.
   * @param {number} y - The y-coordinate of the tower.
   */
  constructor(x, y) {
    super(x, y, "UsoppTower");
    this.range = 150;
    this.damage = 20;
    this.cooldown = 25;
    this.attackGif = usoppAttack;
  }

  /**
   * Display the UsoppTower.
   */
  display() {
    image(usoppSprite, this.x - (usoppSprite.width / 2), this.y - (usoppSprite.height / 2));
  }
}
