import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'


export type PopulationType = 'European' | 'African' | 'EAsian' |  'SAsian'  

interface PopulationTypeState {
    population : PopulationType
  }
  
  const initialState: PopulationTypeState = {
    population : 'European'
  };

  export const slice = createSlice({
    name: 'PopulationType',
    initialState,
    reducers: {
        setPopulation : ( state, action : PayloadAction<PopulationType> ) => {
            state.population = action.payload
        }
      }
    })
  
  export const { setPopulation} = slice.actions;
  export const selecPopulation= (state: RootState) => state.population.population
  export default slice.reducer;