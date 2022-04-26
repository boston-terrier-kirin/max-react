import { createStore } from 'redux';

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterReduer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type === 'INCREASE_BY') {
    return {
      ...state,
      counter: state.counter + action.payload.value,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }

  if (action.type === 'TOGGLE') {
    return {
      ...state,
      showCounter: !state.showCounter,
    };
  }

  return state;
};

const store = createStore(counterReduer);

export default store;
