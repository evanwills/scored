import { Reducer } from 'redux'

import { IPlayerSimple, IRoundTurns, ITurn, ITurnComplete, IRound, IIdPayload } from '../types/scored'
import { PLAY_ORDER, SCORE_SORT_METHOD, GAME__AT, ROUND__AT, TURN__AT, ROUND_STATE } from '../types/scored-enums'
// import { } from '../../types/round.types'

// import { } from '../round/turns.action'
import { sortTurns } from '../score/score.utils'
import { initialRound, initialTurn } from './round.initital-states'
import { isPlayersPayload__TG } from '../types/typeguards'
import { getItemIndexByID } from '../utilities/item-by-id.utils'
// import {} from '../game/start-end.reducer'
// import { pastGames } from '../game/game.mocs'



// ========================================================
// START: Redux reducer



/**
 *
 * NOTE: this reduce relies heavily on round__MW() to ensure
 *       it gets actions with the right data
 *
 * @param state the slice of redux state concerned with rounds
 * @param action any action passing through redux
 */
export const round__R : Reducer = (state = initialRound, action) : IRound => {
  const {type, payload} = action
  console.log('inside round__R()')
  console.log('type: ', action.type)

  switch (type) {
    case GAME__AT.START:
      console.log('inside round__R() > GAME__AT.START ("' + GAME__AT.START + '")')
      console.log('state:', state)
      console.log('action:', action)
      // It is assumed that all players listed for the
      // previous game will play the first round

      if (isPlayersPayload__TG(payload) && payload.players.length > 1) {
        return {
          ...initialRound,
          firstPlayerID: payload.players.id,
          index: 0,
          playersInOrder: payload.players,
          // record the ID of the first player
          stateMachine: ROUND_STATE.ROUND_INITIALISED
        }
      } else {
        throw new Error('payload is not IPlayerPayload')
      }
      break;

    case ROUND__AT.INITIALISE:
      // --------------------------------------------------
      // START: initialisation
      console.log('inside ROUND__AT.INITIALISE ("' + ROUND__AT.INITIALISE + '")')
      console.log('state:', state)
      console.log('action:', action)

      let starterID : number = ((action.payload as IIdPayload).id > 0) ? action.payload.id : state.firstPlayerID
      let increment : boolean = false

      switch (payload.playOrder) {
        case PLAY_ORDER.ROUND_WINNER:
          starterID = state.winnerID
          break;

        // case PLAY_ORDER.TRICK:
          // Not sure how to implement this yet
          // break;

        case PLAY_ORDER.GAME_LEADER:
          starterID = state.leaderID
          break;

        case PLAY_ORDER.NEXT:
          increment = true
          break;
      }

      const playersInOrder = getPlayersInOrder(
        payload.players,
        starterID,
        increment
      )

      return {
        ...state,
        firstPlayerID: playersInOrder[0].id,
        index: state.index += 1,
        playersInOrder: playersInOrder.filter((player : IPlayerSimple) => player.active),
        playOrderIndex: 1,
        // record the ID of the first player
        stateMachine: ROUND_STATE.ROUND_INITIALISED
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
      const _totalRank = sortTurns(
        _roundRank.map(
          (turn: ITurnComplete, index : number) => {
            // set the ranking for this round
            return {
              ...turn,
              rank: {
                round: index + 1,
                overall: turn.rank.overall
              }
            }
          }
        )
        ,SCORE_SORT_METHOD.total
      )

      const _gameLeader = _totalRank[0].playerID

      // Update each turn to store the player's current
      // overall ranking for the this game
      // Then sort the turns back into their play order so
      // they can be stored in the scores list
      const _rankedturns = sortTurns(
        _totalRank.map(
          (turn : ITurnComplete, index: number) => {
            // set the overall game ranking
            return {
              ...turn,
              rank: {
                round: turn.rank.round,
                overall: index + 1,
              }
            }
          }
        )
        ,SCORE_SORT_METHOD.round
      )

      return {
        ...state,
        // record the overall game leader
        leaderID: _gameLeader,
        stateMachine: ROUND_STATE.ROUND_FINALISED,
        turns: {
          ...state.turns,
          played: _rankedturns
        },
        // record the winner for the round
        winnerID: _roundWinner,
      }

      // END: finalisation
      // --------------------------------------------------

    case TURN__AT.START:
      const _turnIndex = state.turns.index + 1
      const _playIndex = state.playOrderIndex + 1
      const _current : ITurn = {
        id: _turnIndex,
        end: -1,
        isBonusRound: false,
        pauseDuration: 0,
        playerID: state.playersInOrder[0].id,
        playOrder: _playIndex,
        score: {
          round: 0,
          total: 0
        },
        start: action.meta.now
      }
      return {  // should be IRound state
        ...state,
        turns: {
          ...state.turns,
          index: _turnIndex,
          current: _current,
        }
      }

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
        current: initialTurn,
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
    }

    return state
}



//  END:  Redux reducer
// ========================================================
// START: local utilities




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
  let starterIndex = getItemIndexByID(starterID, players)
  if (starterIndex < 0) {
    console.log('players:', players)
    throw new Error('could not find item with ID ' + starterID + ' in list of players')
  }
  if (getNext === true) {
    if (starterIndex = players.length - 1) {
      starterIndex = 0
    }
  }
  console.log('starterID:', starterID)
  console.log('players:', players)
  console.log('getNext:', getNext)
  console.log('players.slice(' + starterIndex + '):', players.slice(starterIndex))
  console.log('players.slice(0, ' + starterIndex + '):', players.slice(0, starterIndex))
  // Get new array with the starter player first
  const firstGroup = players.slice(starterIndex)

  // Get what was the start of the array (up to but not including
  // the player who should start the next round)
  const nextGroup = (starterIndex > 0) ? players.slice(0, starterIndex) : [players[0]]

  // Return a new array with all the players but in a new order.
  // (But with the inactive players removed)
  return [...firstGroup, ...nextGroup].filter(player => player.active)
}



//  END:  local utilities
// ========================================================
