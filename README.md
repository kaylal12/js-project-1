# JS Tic Tac Toe Game

In this project I have created a simple tic tac toe game using javascript.

## Goals:

* Be deployed online, where the rest of the world can access it
* Render a game board in the browser
* Switch turns between X and O (or whichever markers you select)
* Visually display which side won if a player gets three in a row or show a draw/"cat’s game" if neither wins
* Use jQuery for DOM manipulation and event handling
* Use AJAX for data storage and retrieval

## Process

To start off, I created a wireframe of what i wanted my webpage to look like:

[Wireframe](img/Wireframe.jpg)
[User Stories](img/userstories.JPG)

It is a simple wireframe that shows me where everything will be placed and makes it easier for me to know what I need to do when actually writing out the code.

After finishing the wireframe, I created the html file. I started by making divs and then creating the css file to help stylize my page into a box model of what it should be.

Once finishing that, I left the styling as is to being working on the functionality of the game.

I first tried to figure out what each piece needed to do. The play button needed to start the game, enabling the squares to be played on. The reset button needed to clear the board and start the game over. There needed to be two players that would switch turns. The squares needed to be enabled and show the current players token.

My first road block was creating the function to check for wins. I decided to set a board variable with an array of arrays, which would be set up like a 3x3 board. I then had to include this in the square event, which would give whatever square that was clicked a "1" for player one's piece and a "2" for player two's piece.

When the game was fully functioning, I included a message box to show who's turn it was and display the winner (or "cat's game") when the game was over.

Communicating with the back-end was the most difficult part to this project and at this point, is still not fully functioning.
Registering, logging in, creating games and marking cells seems to be working. However, I have not been able to
include a way to list and show the games.

As of right now, the game is fully functioning (can play, see a winner, stop playing when there is a winner, show ties, show wins, etc), however, it is not fully commicating with the back-end.

## Unsolved Problems

* Reset button does not create a new game
* Game cannot be retrieved and shown

**[Play Tic Tac Toe!](http://kaylal12.github.io/js-project-1/)**





