import { createStore } from 'redux';

const defaultState = {
  counter: 0,
};

const counterReduer = (state = defaultState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'INCREASE_BY') {
    return {
      counter: state.counter + action.payload.value,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = createStore(counterReduer);

export default store;
