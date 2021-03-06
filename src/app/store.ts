import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import populationReducer, {snpsReducer, filenameReducer, loadingReducer, pagingReducer} from '../features/appMain/appMainSlice';

export const store = configureStore({
  reducer: {
    population: populationReducer,
    snps: snpsReducer,
    filename: filenameReducer,
    loading : loadingReducer,
    paging : pagingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
