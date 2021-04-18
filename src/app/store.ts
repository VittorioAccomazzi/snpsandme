import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import populationReducer from '../features/appMain/appMainSlice';

export const store = configureStore({
  reducer: {
    population: populationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
