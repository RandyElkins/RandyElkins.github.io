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
<!-- - jQuery -->

### Approach Taken

I...
1. created a wireframe on paper
1. translated the wireframe into HTML
1. set up general styles via CSS
1. coded the logic for rendering the game
   - after many hours racking my brain, I found a battleship tutorial at <https://www.youtube.com/watch?v=U64vIhh0TyM>
   - I used a bunch of code from this video, but cleaned it up quite a bit to make it function better as well as refactored a lot of the code with a different approach, once I better understood the function

### Link to the Live Site



### Installation Instructions



### Unsolved Problems

I would like to add...
- "Play Again" functionality to reset the game without having to reload the page
- the ability to change your ship positions on-the-fly vs. having to reload the page and start over
- responsive design for smaller screens; perhaps even mobile devices
- logic to the computer's guesses
   - once it hits a target, it should select neighboring cells until it destroys that particular ship before randomly guessing where the next ship is located
- 2-player functionality
