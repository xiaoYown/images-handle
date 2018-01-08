import * as types from '../actions/types';

const reducer = (state = { value:0 }, action) => {

  switch (action.type) {
    case types.INCREMENT:
      return {
        value: state.value + 1
      }
    case types.DECREAMENT:
      return {
        value: state.value - 1
      }
    default:
      return state;
  }
}

export default reducer;
