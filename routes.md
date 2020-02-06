# Routes

## /play

Handle all activities to do with playing a single game

### /play/new

Create a new game

### /play/config

Tweek the config for this instance of this game only

__Note:__ Config can't be altered after play starts

### /play/players/new

Add a new player to the game.

### /play/players/create

Add a new player to the app then add them to the game

### /play/players/rearrange

Players are stored in seating order. Rearranging players changes their relative seating position and thus the order on which their turn occurs.

If a game is active rearranging will take effect at the start of the next round

### /play/players/remove

Remove a player from from the game (player will no longer have turns - or rather, the app will no longer allow scoring of turns for that player.)

### /play/start

Start playing the game

### /play/score

Score the turn for the current player

### /play/skip

Skip turn of current player (give her/him a zero score and mark the turn as skipped)

### /play/paused

Pause the timer for the current game.

The only play related activity available on this tour/screen is resume

### /play/end

End the game

### /play/history

Show basic stats for past games played of the same type


-----

## /games

> "Games" in this context means a game with a specific set of rules. Not the act of playing a game.

Manage config of games (e.g. Five hundred, bridge, Scrabble and Quirkle)

### /games/new

Create config for new game

### /games/list

List games

### /games/list-all

List all games

### /games/[game-name|id]

Very brief history of this game's and display of config settings

### /games/[game-name|id]/config

Update game config

### /games/[game-name|id]/history

Listing of all instances of this game with brief stats for played games of this type

### /games/[game-name|id]/history/[date-time|id]

Full record of a specific instance of this game

### /games/[game-name|id]/remove

Remove this game and all information associated

### /games/[game-name|id]/remove/[date-time|id]

Remove all information about a specific instance of this game


-----

## /players

### /players/new

Add a new player to the app

### /players/[player-name|id]/update

Update the name of this player

### /players/[player-name|id]/stats

View details of a player's performance all games

#### /players/[player-name|id]/stats/[game-name|id]

View details of a player's performance for all instances of a specific game

#### /players/[player-name|id]/stats/[game-name|id]/[date-time|id]

View details of a player's performance for a specific instances this game