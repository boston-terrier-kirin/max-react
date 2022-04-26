import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './auth-slice';
import counterSliceReducer from './couter-slice';

const store = configureStore({
  reducer: { counter: counterSliceReducer, auth: authSliceReducer },
});

export default store;
