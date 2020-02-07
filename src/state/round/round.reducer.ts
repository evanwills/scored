import { Reducer } from 'redux'
import { ROUND__AT, TURN__AT } from './round.types'
import { } from './turns.action'
import { GAME__AT } from '../game/game.types'
import { sortTurns } from '../score/score.utils'
import { IAction, IRound, PLAY_ORDER, IPlayerSimple, IRoundTurns, ITurn, ITurnComplete, SCORE_SORT_METHOD } from '../utilities/types'

const initialRound : IRound = {
  firstPlayerID: -1,
  index: 0,
  playersInOrder: [],
  playOrderIndex: 0,
  turns: {
    index: 0,
    current: null,
    played: []
  }
}



// ========================================================
// START: Redux reducer



/**
 *
 * NOTE: this reduce relies heavily on roundMiddleWare() to ensure
 *       it gets actions with the right data
 *
 * @param state the slice of redux state concerned with rounds
 * @param action any action passing through redux
 */
export const round__R : Reducer = (state = initialRound, action) => {
  const {type, payload} = action
  switch (type) {
    case ROUND__AT.INITIALISE:
      // --------------------------------------------------
      // START: initialisation

      let playersInOrder : IPlayerSimple[] = [];

      switch (payload.playOrder) {
        case PLAY_ORDER.ROUND_WINNER:
          playersInOrder = getPlayersInOrder(
            payload.players,
            state.winnerID
          )
          break;

        // case PLAY_ORDER.TRICK:
          // Not sure how to implement this yet
          // break;

        case PLAY_ORDER.GAME_LEADER:
          playersInOrder = getPlayersInOrder(
            payload.players,
            state.leaderID
          )
          break;

        case PLAY_ORDER.NEXT:
          playersInOrder = getPlayersInOrder(
            payload.players,
            state.firstPlayerID,
            true
          )
          break;

        case PLAY_ORDER.SEATING_POSTION:
        default:
          playersInOrder = payload.players.filter((player : IPlayerSimple) => player.active)
          break;
      }

      return {
        ...initialRound,
        index: state.index += 1,
        playersInOrder: playersInOrder,
        // record the ID of the first player
        firstPlayerID: playersInOrder[0].id
      }

      //  END:  initialisation
      // --------------------------------------------------

    case ROUND__AT.FINALISE:
      // --------------------------------------------------
      // START: finalisation

      // get round rankings
      const _roundRank = sortTurns(state.turns.played, SCORE_SORT_METHOD.round)
      const _roundWinner = _roundRank[0].playerID

      // update each turn, setting the round ranking based
      // on the position in the sorted array
      // Then sort the turns based on top score to get the
      // current overall game rankings
      const _totalRank = sortTurns(_roundRank.map((turn: ITurnComplete, index : number) => {
        return {
          ...turn,
          rank: {
            ...turn.rank,
            round: index + 1
          }
        }
      }), SCORE_SORT_METHOD.total)

      const _gameLeader = _totalRank[0].playerID

      // Update each turn to store the player's current
      // overall ranking for the this game
      // Then sort the turns back into their play order so
      // they can be stored in the scores list
      const _rankedturns = sortTurns(_totalRank.map((turn : ITurnComplete, index: number) => {
        return {
          ...turn,
          rank: {
            ...turn.rank,
            total: index + 1
          }
        }
      }), SCORE_SORT_METHOD.round)

      return {
        ...state,
        turns: {
          ...state.turns,
          played: _rankedturns
        },
        // record the winner for the round
        winnerID: _roundWinner,
        // record the overall game leader
        leaderID: _gameLeader
      }

      // END: finalisation
      // --------------------------------------------------

    case TURN__AT.START:
      const _turnIndex = state.turns.index + 1
      const _playIndex = state.playOrderIndex + 1
      const _current : ITurn = {
        id: _turnIndex,
        end: -1,
        pauseDuration: 0,
        playerID: state.playersInOrder[0].id,
        playOrder: _playIndex,
        score: {
          round: 0,
          total: 0
        },
        start: action.meta.now
      }
      return {
        ...state,
        turns: {
          ...state.turns,
          index: _turnIndex,
          current: _current,
        }
      }
      break

    case TURN__AT.SCORE:
      return {
        ...state,
        turns: {
          ...state.turns,
          current: {
            ...state.turns.current,
            score: {
              round: payload.score,
              total: payload.totalScore + payload.score
            }
          }
        }
      }
      break

    case GAME__AT.RESUME:
      return {
        ...state,
        turns: {
          ...state.turns,
          current: {
            ...state.turns.current,
            pauseDuration: state.turns.current.pauseDuration + payload.pauseDuration
          }
        }
      }

    case TURN__AT.END:
      // Create a complted turn
      const completedTurn : ITurnComplete = {
        ...state.turns.current,
        end: action.meta.now,
        rank: -1,
        roundIndex: state.index
      }
      const _turns : IRoundTurns = {
        index: state.turns.index,
        current: null,
        played: [...state.turns.played, completedTurn]
      }

      return {
        ...state,
        turns: _turns,
        // remove the current player from the list of
        // players yet to have their turn
        playersInOrder: state.playersInOrder.filter(
          (player : IPlayerSimple) => (player.id !== completedTurn.playerID)
        )
      }

    case GAME__AT.INITIALISE:
      // It is assumed that all players listed for the game
      // will play the first round

      return {
        ...initialRound,
        index: 1,
        playersInOrder: payload.players,
        // record the ID of the first player
        firstPlayerID: payload.players[0].id
      }

    default:
      return state
  }
}



//  END:  Redux reducer
// ========================================================
// START: local utilities



/**
 * Get the index of the player who should start the next
 * round of play
 *
 * @param starterID ID of the player who should start this
 *                  round
 * @param players   List of all players in this game
 *                  (in seating order)
 * @param getNext   Don't return the index of the specified
 *                  player, return the index of the next
 *                  player in line.
 */
const getStarterIndex = (starterID: number, players: IPlayerSimple[], getNext : boolean = false) : number => {
  for (let a = 0; a < players.length; a += 1) {
    if (players[a].id === starterID) {
      if (getNext === true || players[a].active === false) {
        // find the next active player
        for (let b = a + 1; b < players.length; b += 1) {
          if (players[a].active === true) {
            return b
          }
        }
        // No active players at the end of the list so
        // try to find the next active player from the
        // beginning of the list
        for (let b = 0; b < a; b += 1) {
          if (players[b].active === true) {
            return b
          }
        }
      } else {
        // We found the right player! Return their index
        return a
      }
    }
  }
  // Something weird happened.
  // Couldn't find any valid starter.
  return 0
}

/**
 * Returns the players in the order they should play the next
 * round
 *
 * @param players players listed in their seating order
 *                      (based on their first round)
 * @param starterID     id of the player who should start the
 *                      next round
 */
const getPlayersInOrder = (
  players : IPlayerSimple[],
  starterID : number,
  getNext : boolean = false
) : IPlayerSimple[] => {
  const starterIndex = getStarterIndex(starterID, players, getNext)

  // Get new array with the starter player first
  const firstGroup = players.slice(starterIndex)

  // Get what was the start of the array (up to but not including
  // the player who should start the next round)
  const nextGroup = (starterIndex > 0) ? players.slice(0, starterIndex - 1) : [players[0]]

  // Return a new array with all the players but in a new order.
  // (But with the inactive players removed)
  return [...firstGroup, ...nextGroup].filter(player => player.active)
}



//  END:  local utilities
// ========================================================
