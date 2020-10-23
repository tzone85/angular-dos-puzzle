import { ActionReducer, Action } from '@ngrx/store';

import { GameState } from '../state/state.class';

const INITIAL_STATE = {
  tiles: [],
  goal: false,
  image: '',
  tileSize: 105,
  state: 1
};

export const stateReducer: ActionReducer<GameState> = (state: GameState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    default:
      const payload = JSON.parse(action.type);
       return payload || state;
      return state;
  }
};
