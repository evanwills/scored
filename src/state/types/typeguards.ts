import {
  IHasName,
  IMessagePayload,
  IPayload,
  IIdPayload, IIdNamePayload, INamePayload,
  IPlayerPayload, IPlayersPayload, IPlayerSimple, IPlayOrderPayload,
  IPositionPayload,
  IResumePayload,
  IScorePayload, ITotalScorePayload,
  ITurn, ITurnComplete, ITurnCompletePayload, ITurnsCompletePayload, IHasId, IAction, IMeta
} from './scored'

import { PLAY_ORDER } from './scored-enums'


// ----------------------------------------------
// START: generic typeguards

export const isObjectWithID__TG = (item: IHasName) : boolean => {
  return (
    typeof (item as IIdPayload).id === 'number'
    && (item as IIdPayload).id > 0
  )
}

//  END:  generic typeguards
// ----------------------------------------------
// START: Payload typeguards

export const isIdPayload__TG = (payload: IPayload | IIdPayload) : boolean => {
  console.log(payload)
  return (
    typeof (payload as IIdPayload).id === 'number'
    && (payload as IIdPayload).id > 0
  )
}

export const isNamePayload__TG = (payload: IPayload | INamePayload) : boolean => {
  return (
    typeof (payload as INamePayload).name === 'string'
    && (payload as INamePayload).name.length > 1
  )
}

export const isIdNamePayload__TG = (payload: IPayload | IIdNamePayload) : boolean => {
  return (
    isIdPayload__TG(payload)
    && typeof (payload as IIdNamePayload).name === 'string'
    && (payload as IIdNamePayload).name.length > 1
  )
}

export const isMessagePayload__TG = (payload: IPayload | IMessagePayload) : boolean => {
  return (
    typeof (payload as IMessagePayload).message === 'string'
    && (payload as IMessagePayload).message.length > 1
  )
}

export const isResumePayload__TG = (payload: IPayload | IResumePayload) : boolean => {
  return (
    typeof (payload as IResumePayload).pauseDuration === 'number'
    && (payload as IResumePayload).pauseDuration > 0
  )
}


export const isPlayerPayload__TG = (payload: IPayload | IPlayerPayload) : boolean => {
  console.log('payload:', payload)
  console.log('typeof (payload as IPlayerPayload).player:', typeof (payload as IPlayerPayload).player)
  return (
    typeof (payload as IPlayerPayload).player !== 'undefined'
    && isPlayerSimple__TG((payload as IPlayerPayload).player)
  )
}


export const isPlayersPayload__TG = (payload: IPayload | IPlayersPayload) : boolean => {
  return (
    typeof (payload as IPlayersPayload).players !== 'undefined'
    && Array.isArray((payload as IPlayersPayload).players)
  )
}


export const isPlayOrderPayload__TG = (payload: IPayload | IPlayOrderPayload) : boolean => {
  // The enum testing was pulled directly from stackoverflow
  // https://stackoverflow.com/questions/43804805
  // I can see what it's trying to do but I'm not sure if
  // it's the right way to go in this instance
  return (
    typeof (payload as IPlayOrderPayload).playOrder !== 'undefined'
    && ((payload as IPlayOrderPayload).playOrder in PLAY_ORDER)
  )
}


export const isPositionPayload__TG = (payload: IPayload | IPositionPayload) : boolean => {
  return (
    isIdPayload__TG(payload)
    && typeof (payload as IPositionPayload).position === 'number'
    && (payload as IPositionPayload).position > 0
  )
}


export const isScorePayload__TG = (payload: IPayload | IScorePayload) : boolean => {
  return (
    isIdPayload__TG(payload)
    && typeof (payload as IScorePayload).score === 'number'
  )
}


export const isTotalScorePayload__TG = (payload: IPayload | ITotalScorePayload) : boolean => {
  return (
    isScorePayload__TG(payload)
    && typeof (payload as ITotalScorePayload).totalScore === 'number'
  )
}


export const isTurnCompletePayload__TG = (payload: IPayload | ITurnCompletePayload) : boolean => {
  return (
    typeof (payload as ITurnCompletePayload).turn !== 'undefined'
    && isTurnComplete__TG((payload as ITurnCompletePayload).turn)
  )
}


export const isTurnsCompletePayload__TG = (payload: IPayload | ITurnsCompletePayload) : boolean => {
  return (
    typeof (payload as ITurnsCompletePayload).turns !== 'undefined'
    && Array.isArray((payload as ITurnsCompletePayload).turns)
  )
}

//  END:  Payload typeguards
// ----------------------------------------------
// START: Player typeguards

export const isPlayerSimple__TG = (player: IPlayerSimple | IHasId | IHasName, isActive : boolean = false) : boolean => {
  return (
    typeof player.id === 'number' && (player).id > 0
    && typeof (player as IHasName).name === 'string' && (player as IHasName).name.length > 1
    && typeof (player as IPlayerSimple).active === 'boolean'
    && (
      // If isActive is false don't bother checking player's
      // active state
      isActive === false || (player as IPlayerSimple).active === true
    )
  )
}

//  END:  Player typeguards
// ----------------------------------------------
// START: turnComplete typeguards

export const isTurn__TG = (turn: ITurn) : boolean => {
  return (
    typeof turn.id === 'number' && turn.id > 0
    && typeof turn.end === 'number' && (turn.end > 0 || turn.end === -1)
    && typeof turn.pauseDuration === 'number' && turn.pauseDuration >= 0
    && typeof turn.playerID === 'number' && turn.playerID > 0
    && typeof turn.playOrder === 'number' && turn.playOrder > 0
    && typeof turn.score !== 'undefined'
    && typeof turn.start === 'number' && (turn.start > 0 || turn.start === -1)
  )
}

export const isTurnComplete__TG = (turn: ITurnComplete) : boolean => {
  return (
    isTurn__TG(turn)
    && typeof turn.rank  !== 'undefined'
    && typeof turn.roundIndex === 'number' && turn.playOrder > 0
  )
}

//  END:  turnComplete typeguards
// ----------------------------------------------
// START: action typeguards

export const isDispatchedAction_TG = (action: IAction) : boolean => {
  return (
    typeof (action.meta as IMeta).dispatched !== 'undefined' && (action.meta as IMeta).dispatched === true
  )
}
