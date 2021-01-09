# BATTLESHIP

## General Assembly Unit 1 Project

----------------

### Description

This BATTLESHIP game is essentially the classic naval combat game you may have played.
- There are 2 players: you vs. the computer
- Each player has 5 ships in their fleet
- Each player places their ships on the 10x10 game board non-diagonally (i.e. either horizontally or vertically)
- Starting with the user, players alternate turns firing on the opponent to sink the ships in the opponent's fleet
- The first to sink all the ships in the opponent's fleet wins

### Technologies Used

This game was created using
- HTML
- CSS
- Bootstrap 4.3.1
- JavaScript
- jQuery

### Approach Taken

I...
1. created a wireframe on paper
1. translated the wireframe into HTML
1. set up general styles via CSS
   - Some items of particular interest to me:
     - Background gradients [^1]
     - Gradient text [^2]
1. coded the logic for rendering the game
   - I didn't like what I had set up, and after many hours racking my brain, I found a battleship tutorial [^2]
   - I used a bunch of code from this video, but cleaned it up a little bit to make it function better as well as refactored a lot of the code with a different approach, once I better understood the logic

[^1]: Background Gradients: <https://uigradients.com/>

[^2]: Gradient Text: <https://www.youtube.com/watch?v=M1xEi_BBW1I>

[^3]: Battleship Tutorial: <https://www.youtube.com/watch?v=U64vIhh0TyM>

[^4]: Google Fonts <fonts.google.com>


General Sites Highly Used:

[^5]: w3schools.com <w3schools.com>

[^6]: Mozilla <developer.mozilla.org>

[^7]: CSS-Tricks <css-tricks.com>

[^8]: Stack Overflow <stackoverflow.com>

------------

### Link to the Live Site

Visit <https://randyelkins.github.io/> to play the game.

------------

### Installation Instructions

No installation required. Simply visit <https://randyelkins.github.io/> to play the game.

------------

### Unsolved Problems

I would like to add...
- "Play Again" functionality to reset the game without having to reload the page
- the ability to change your ship positions on-the-fly vs. having to reload the page and start over
- responsive design for smaller screens; perhaps even mobile devices
- logic to the computer's guesses
   - once it hits a target, it should select neighboring cells until it destroys that particular ship before randomly guessing where the next ship is located
- 2-player functionality
- Put the ship type inside the ship
- Fix the ship borders when on the grid
- List the active/sunk ships for each fleet
- Be able to move ships anytime before the game starts
- Highlight the grid of whose turn it is