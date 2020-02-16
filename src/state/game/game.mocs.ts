
import { IConfigGame, PastGames, PlayersAll, IPlayerSimple } from '../types/scored'
// import { GAME_STATE, ERROR__AT, GAME__AT, GAME_PLAYERS__AT, ROUND__AT, TURN__AT } from '../types/scored-enums'
import { END_MODE, PLAY_ORDER } from '../types/scored-enums'


export const gameConfigs : IConfigGame[] = [
  {
    id: 1,
    active: true,
    allowNegative: false,
    endMode: END_MODE.CURRENT_PLAYER,
    minScore: 0,
    maxScore: 0,
    name: 'Quirkle',
    playOrder: PLAY_ORDER.SEATING_POSTION,
    scoreBonuses: false,
    trackTime: true,
    url: 'https://en.wikipedia.org/wiki/Qwirkle'
  },
  {
    id: 2,
    active: true,
    allowNegative: false,
    endMode: END_MODE.CURRENT_PLAYER,
    minScore: 0,
    maxScore: 0,
    name: 'Scrabble',
    playOrder: PLAY_ORDER.SEATING_POSTION,
    scoreBonuses: false,
    trackTime: true,
    url: 'https://en.wikipedia.org/wiki/Scrabble'
  }
]


export const pastGames : PastGames = {
  index: 0,
  games: [],
  playerGames: []
}

const availablePlayers : IPlayerSimple[] = [
  {
    id: 1,
    name: 'Evan',
    active: true
  },
  {
    id: 2,
    name: 'Georgie',
    active: true
  },
  {
    id: 3,
    name: 'Mallee',
    active: true
  },
  {
    id: 4,
    name: 'Ada',
    active: true
  },
  {
    id: 5,
    name: 'Anika',
    active: true
  },
  {
    id: 6,
    name: 'Ryan',
    active: true
  },
  {
    id: 7,
    name: 'Ari',
    active: true
  },
  {
    id: 8,
    name: 'Ferdi',
    active: true
  },
  {
    id: 9,
    name: 'Gem',
    active: true
  },
  {
    id: 10,
    name: 'Linus',
    active: true
  },
  {
    id: 11,
    name: 'Michael',
    active: true
  },
  {
    id: 12,
    name: 'Tanya',
    active: true
  }
]

export const allPlayers : PlayersAll = {
  index: 0,
  players: availablePlayers,
  playerGames: []
}

