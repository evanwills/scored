import { PlayersAll, GamePlayers } from '../types/scored'

export const initialPlayers : PlayersAll = {
  index: 0,
  players: [
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
  ],
  playerGames: []
}

export const initialGamePlayers : GamePlayers = {
  playersSeatOrder: [],
  finalResult: []
}
