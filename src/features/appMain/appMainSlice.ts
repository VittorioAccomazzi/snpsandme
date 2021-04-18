import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'
import {PopulationType} from '../../genomeLib/frequencyEvaluator'



interface PopulationTypeState {
    population : PopulationType
  }
  
  const initialPoplationTypeState: PopulationTypeState = {
    population : 'European'
  };

  export const populationTypeSlice = createSlice({
    name: 'PopulationType',
    initialState: initialPoplationTypeState,
    reducers: {
        setPopulation : ( state, action : PayloadAction<PopulationType> ) => {
            state.population = action.payload
        }
      }
    })
  
  export const {setPopulation} = populationTypeSlice.actions;
  export const selecPopulation= (state: RootState) => state.population.population
  export default populationTypeSlice.reducer;