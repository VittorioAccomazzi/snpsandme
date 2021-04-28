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
 * is Loading
 *  
 */

interface LoadingState {
  loading : boolean
}

const loadingInitialState: LoadingState = {
  loading : false
};

export const loadingSlice = createSlice({
  name: 'Loading',
  initialState: loadingInitialState,
  reducers: {
      setLoading : ( state, action : PayloadAction<boolean> ) => {
          state.loading  = action.payload
      }
    }
  })

export const { setLoading } = loadingSlice.actions;
export const selectLoading= (state: RootState) => state.loading.loading
export const loadingReducer= loadingSlice.reducer;

/*
 *
 *  Paging
 *  
 */

interface PagingState {
  page : number,
  rowPerPage : number
}

const pagingInitialState: PagingState = {
  page : 0,
  rowPerPage : 50
};

export const pagingSlice = createSlice({
  name: 'Paging',
  initialState: pagingInitialState,
  reducers: {
      setPage : ( state, action : PayloadAction<number> ) => {
          state.page  = action.payload
      },
      setRowPerPage : (state, action : PayloadAction<number>) =>{
          state.rowPerPage = action.payload
      }
    }
  })

export const { setPage, setRowPerPage } = pagingSlice.actions;
export const selectPaging= (state: RootState) => state.paging
export const pagingReducer= pagingSlice.reducer;

/*
 *
 * Snps List
 *  
 */

  interface SnpsState {
    list : SnpVal[]
  }
  
  const snpsInitialState: SnpsState = {
    list : []
  };

  export const snpsSlice = createSlice({
    name: 'Snps',
    initialState: snpsInitialState,
    reducers: {
        setSnps : ( state, action : PayloadAction<SnpVal[]> ) => {
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
export const midColor = "#FFFAAA"
export const lowColor = "#FFAAAA"
export const higColor = "#A0A0FF"
export const noColor  = "#FFFFFF"
export const unkColor = "#AAAAAA"

/*
 *
 * Default Sorting
 *  
 */
export type TableHeaderSortType = 'ID' | 'Chromosome' | 'Base' | 'Frequency' | 'Publications' 
export type SortDirection = 'asc' | 'desc'
export const defaultSortField = 'Frequency'
export const defaultSortOrder = 'asc' 


