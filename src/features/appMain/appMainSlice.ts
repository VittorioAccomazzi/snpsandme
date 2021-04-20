import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'
import {PopulationType} from '../../genomeLib/frequencyEvaluator'
import { SnpVal } from './appWorker/bWorker';

/*
 *
 * Population Type Slide
 *  
*/

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

  /*
 *
 * Filename
 *  
*/

interface FilenameTypeState {
  filename : string
}

const initialFilenameState: FilenameTypeState = {
  filename : ''
};

export const filenameSlice = createSlice({
  name: 'Filename',
  initialState: initialFilenameState,
  reducers: {
      setFilename : ( state, action : PayloadAction<string> ) => {
          state.filename = action.payload
      }
    }
  })

export const {setFilename} = filenameSlice.actions;
export const selecFilename= (state: RootState) => state.filename.filename
export const filenameReducer= filenameSlice.reducer;

/*
 *
 * Snps Slide
 *  
 */
  export interface SnpEl {
    val  : SnpVal,
    done : boolean
}

  interface SnpsState {
    list : SnpEl[]
  }
  
  const initialState: SnpsState = {
    list : []
  };

  export const snpsSlice = createSlice({
    name: 'Snps',
    initialState,
    reducers: {
        setSnps : ( state, action : PayloadAction<SnpEl[]> ) => {
            state.list  = action.payload
        }
      }
    })
  
  export const { setSnps } = snpsSlice.actions;
  export const selectSnps= (state: RootState) => state.snps
  export const snpsReducer= snpsSlice.reducer;

/*
 *
 * Thresholds for freqency
 *  
 */
export const midThreshold = 0.5
export const lowThreshold = 0.25
export const midColor = "#FFFFAA"
export const lowColor = "#FFAAAA"

