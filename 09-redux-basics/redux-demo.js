const redux = require('redux');

const defaultState = {
  counter: 0,
};

const counterReducer = (state = defaultState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + action.payload.counter,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - action.payload.counter,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer);

const subscriber1 = () => {
  console.log('subscriber1', store.getState());
};

const subscriber2 = () => {
  console.log('subscriber2', store.getState());
};

store.subscribe(subscriber1);
store.subscribe(subscriber2);

store.dispatch({ type: 'INCREMENT', payload: { counter: 2 } });
store.dispatch({ type: 'INCREMENT', payload: { counter: 2 } });
store.dispatch({ type: 'DECREMENT', payload: { counter: 3 } });
